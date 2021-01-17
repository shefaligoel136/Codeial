// method to submit the form data for new post using ajax

let createPost = function(){
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                let newPost = newPostDom(data.data.post);
                $('#post-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button', newPost)); // newPost has delete-post-button inside it

                new Noty({
                    theme: 'relax',
                    text: "Post published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();

            },
            error: function(error){
                console.log(error.responseText);
            }
        })
    })
}



// method to create post in DOM 

let newPostDom = function(post){
    
    return $(`<li id="post-${post._id}">
    <p>     
            
    <samll>
               
        <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
           
    </samll>
        
        ${ post.content }
        <br>
        <small>
           ${ post.user.name }
        </small>
        
    </p>

    <div class="post-comments">
        
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Comment here.." required>
                <input type="hidden" name="post" value ="${ post._id }">
                <input type="submit" value="Comment">
            </form>
       

        <div class="post-comments-list">
            <ul id="post-comments-${ post._id}">
            </ul>

        </div>
    </div>

</li>`)
}

// method to delete a post from dom

let deletePost = function(deleteLink){ // deleteLink came from the function deletePost in createPost
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                //console.log(data);
                
                $(`#post-${data.data.post_id}`).remove();
                //$(`#post-comments-${data.data.post_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Post deleted!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();

            },
            error: function(error){
                console.log(error.responseText);
            }
        });
    });
}

createPost();