
'use strict';

describe('Test for core/ManipulateDomClass.js', function () {

    var ManipulateDomClass = Global.core.ManipulateDomClass,
        instance;

    beforeEach(function(){
        instance = new ManipulateDomClass({$elm: $('<div><div class="main"></div></div>')});
    });

    afterEach(function(){
        instance = null;
    });

    it('class has those public method', function(){
        expect(instance.getCacheRef).to.be.a('function');
    });

    describe('#getCacheRef', function () {

        it('Class dose not have ref cache but create new cache', function () {
            expect(instance.elmCaches.main).to.be(undefined);
            var $elm = instance.getCacheRef('main', '.main');

            expect($elm instanceof jQuery).to.be.ok();
            expect($elm.hasClass('main')).to.be.ok();
            expect($elm).to.eql(instance.elmCaches.main);
        });

        it('Class return undefined if jQuery object dose not get any elemants', function () {
            var $elm = instance.getCacheRef('hoge', '.hoge');
            expect($elm).to.be(undefined);
        });
        it('Class return undefined if Class dose not cache and you did not pass selector parameter', function () {
            var $elm = instance.getCacheRef('hoge');
            expect($elm).to.be(undefined);
        });
    });

    describe('#_applyEvents', function () {

        it('set event to element you set events properties', function () {
            var stub = sinon.stub(instance, 'getCacheRef'),
                spy = sinon.spy();

            stub.returns({on: spy});
            instance._applyEvents({hogehoge: {click: 'onClickMain'}});
            expect(spy.called).to.be.ok();
            expect(spy.args[0][0]).to.eql('click');

            stub.restore();
        });

        it('set event to element you set events properties (with delegate) ', function () {
            var stub = sinon.stub(instance, 'getCacheRef'),
                spy = sinon.spy();

            stub.returns({on: spy});
            instance._applyEvents({hogehoge: {click: { delegate: '.delegate', handler: 'onClickMain'}}});
            expect(spy.called).to.be.ok();
            expect(spy.args[0][0]).to.eql('click');
            expect(spy.args[0][1]).to.eql('.delegate');

            stub.restore();
        });

    });

});
