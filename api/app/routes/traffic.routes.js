module.exports = (app) => {
    var fs =require ('fs');  
    const  path = require('path');
    var multer = require('multer');
    // const gcsSharp = require('multer-sharp');
    const traffic = require('../controllers/traffic.controller.js');
    // const storage = gcsSharp({
   
    //     filename: function (req, file, cb) {
    //     if  (!file.originalname.match(/\.(jpeg|jpg|png)$/)){
    //         var err =new Error();
    //         err.code = 'filetype';
    //         return cb(err);
    //     } else{
    //         cb (null,  Date.now() + '_' + file.originalname);
    //     }
    //     },
    //     bucket: 'widgethub-cdabd.appspot.com', // Required : bucket name to upload
    //     projectId: 'widgethub-cdabd', // Required : Google project ID
    //     keyFilename: 'WidgetHub-f06b062130d2.json', // Optional : JSON credentials file for Google Cloud Storage
    //     destination: 'assessments', // Optional : destination folder to store your file on Google Cloud Storage, default: ''
    //     //acl: 'publicRead' // Optional : acl credentials file for Google Cloud Storage, 'publicrRead' or 'private', default: 'private'
    
    // });
    // var upload = multer({  storage: storage,limits:{fileSize:50000000}
    // }) 
    // Create a new Note
    app.post('/post-report', traffic.create);
    // app.post('/notes', function(req, res){
    //     console.log('posted ', req.body)
    // });
    // Retrieve all Notes
    app.get('/notes', traffic.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', traffic.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', traffic.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', traffic.delete);
}