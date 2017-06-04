'use strict';

let district = require('./controllers/district');
let user = require('./controllers/user');
let post = require('./controllers/post');
let ward = require('./controllers/ward');

var auth = require('./services/auth');

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
    
};