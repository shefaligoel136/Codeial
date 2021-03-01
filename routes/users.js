const express = require('express');
//const { route } = require('.');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);



router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);

router.post('/create',userController.create);

// use passport as middle ware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession);

router.get('/sign-out',userController.destroySession);


router.get('/auth/google', passport.authenticate('google', {
    scope:['profile','email'] // scope is the info we are looking to fetch 
}));

// url at which I will be receiving the data
router.get('/auth/google/callback',passport.authenticate('google', { // middle-ware of authentication
        failureRedirect : '/users/sign-in'
    }
),
    userController.createSession // which is then redirecting to the home page
);

module.exports = router;