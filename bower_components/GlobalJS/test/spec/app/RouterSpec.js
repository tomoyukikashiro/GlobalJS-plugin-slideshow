
'use strict';

describe('Test for app/Router.js', function () {

    var Router = Global.app.Router,
        instance;

    beforeEach(function(){
        instance = new Router();
    });

    afterEach(function(){
        instance = null;
    });

    it('class has those public method', function(){
        expect(instance.start).to.be.a('function');
    });

    //describe('', function () {

    //});
});
