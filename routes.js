'use strict';

let district = require('./controllers/district');
let user = require('./controllers/user');
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

    app.get('/api/district/listForSelect', district.listForSelect);
    app.get('/api/ward/listForSelect', ward.listForSelect);
    
};