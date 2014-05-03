'use strict';
/* jshint unused: false */
describe('Test for core/BaseClass.js', function () {

    var BaseClass = Global.core.BaseClass;

    it('core/Global has public methods', function () {
        expect(BaseClass.prototype._applyConfig).to.be.a('function');
    });

    describe('#init', function () {
        it('call those function', function () {
            var spy = sinon.spy(BaseClass.prototype, 'init'),
                instance = new BaseClass();

            // call _applyConfig function
            expect(spy.called).to.be.ok();

            spy.restore();
        });
    });

    describe('#_applyConfig', function () {
        it('add instance properties', function () {
            var instance = new BaseClass();
            instance._applyConfig({hoge: 'hoge', piyo: 'piyo'});

            expect(instance.hoge).to.eql('hoge');
            expect(instance.piyo).to.eql('piyo');
        });
    });
});
