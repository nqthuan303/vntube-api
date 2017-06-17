'use strict';
let district = require('./controllers/district');
let user = require('./controllers/user');
let post = require('./controllers/post');
let ward = require('./controllers/ward');
let file = require('./controllers/file');
var auth = require('./services/auth');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images');
    },
    filename: function (req, file, cb) {
        var originalname = file.originalname;
        var index = 0;
        for (var i = 0; i < originalname.length; i++) {
            if (originalname[i] === ".") index = i;
        }
        let fileType = originalname.substr(index);
        cb(null, Date.now() + fileType);
    }
});

var upload = multer({
    storage: storage
});

module.exports = (app) => {

    app.post('/api/user/add', auth.isAuthenticated, user.add);
    app.delete('/api/user/delete/:id', auth.isAuthenticated, user.delete);
    app.get('/api/user/findOne', auth.isAuthenticated, user.findOne);
    app.get('/api/user/getCount', auth.isAuthenticated, user.getCount);
    app.get('/api/user/list', auth.isAuthenticated, user.list);
    app.get('/api/user/listForSelect', user.listForSelect);
    app.post('/api/user/login', user.login);
    app.put('/api/user/update/:id', auth.isAuthenticated, user.update);

    app.post('/api/post/add', auth.isAuthenticated, post.add);
    app.delete('/api/post/delete/:id', auth.isAuthenticated, post.delete);
    app.get('/api/post/findOne', auth.isAuthenticated, post.findOne);
    app.get('/api/post/getCount', auth.isAuthenticated, post.getCount);
    app.get('/api/post/list', auth.isAuthenticated, post.list);
    app.put('/api/post/update/:id', auth.isAuthenticated, post.update);

    app.get('/api/district/listForSelect', district.listForSelect);
    app.get('/api/ward/listForSelect', ward.listForSelect);


    app.post('/api/file/upload', upload.single('file'), file.upload);
    app.get('/api/file/list', auth.isAuthenticated, file.list);
};