module.exports = (app) => {
    var fs =require ('fs');  
    const  path = require('path');
    var multer = require('multer');
    // const gcsSharp = require('multer-sharp');
    const user = require('../controllers/user.controller.js');

    // Retrieve all Notes
    app.get('/users', user.findAll);
    
    //get loggedIn user
    app.get('/user', user.findCurrent);
    // Retrieve a single Note with noteId
    app.get('/users/:userId', user.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', user.update);

    // Update current user
    app.put('/user', user.updateCurrent);

    // Delete a Note with noteId
    app.delete('/users/:userId', user.delete);
}