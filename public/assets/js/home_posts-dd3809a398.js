let createPost=function(){let t=$("#new-post-form");t.submit((function(e){e.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){let e=newPostDom(t.data.post);$("#post-list-container>ul").prepend(e),deletePost($(" .delete-post-button",e)),new ToggleLike($(".toggle-like-button",e)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},newPostDom=function(t){return $(`<li id="post-${t._id}">\n    <p>     \n            \n    <samll>\n               \n        <a class="delete-post-button" href="/posts/destroy/${t._id}">X</a>\n           \n    </samll>\n        \n        ${t.content}\n        <br>\n        <small>\n           ${t.user.name}\n        </small>\n        <br>\n        \n        <small>\n        \n            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">\n                0 Likes\n            </a>\n            \n        </small>\n        \n    </p>\n\n    <div class="post-comments">\n        \n            <form id="post-${t._id}-comments-form" action="/comments/create" method="POST">\n                <input type="text" name="content" placeholder="Comment here.." required>\n                <input type="hidden" name="post" value ="${t._id}">\n                <input type="submit" value="Comment">\n            </form>\n       \n\n        <div class="post-comments-list">\n            <ul id="post-comments-${t._id}">\n            </ul>\n\n        </div>\n    </div>\n\n</li>`)},deletePost=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",text:"Post deleted!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))};createPost();