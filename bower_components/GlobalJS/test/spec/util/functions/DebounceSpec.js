
'use strict';

describe('Test for util/functions/Debounce.js', function () {

    var Debounce = Global.util.functions.Debounce,
        clock,
        instance,
        spy,
        args,
        scope,
        interval;


    it('core/functions/Debounce has public methods', function () {
        expect(Debounce.prototype.execute).to.be.a('function');
    });

    beforeEach(function () {
        clock = sinon.useFakeTimers();
        instance = new Debounce();
        spy = sinon.spy();
        args = [1,2,3];
        scope = this;
        interval = 1000;
    });

    afterEach(function () {
        clock.restore();
    });

    describe('#execute', function () {

        var config;

        beforeEach(function () {
            config = {
                callback  : function(){},
                args      : [1,2,3],
                scope     : this,
                interval  : 1000,
                immediate : true
            };

            instance.callback  = config.callback;
            instance.args      = config.args;
            instance.scope     = config.scope;
            instance.interval  = config.interval;
            instance.immediate = config.immediate;
        });


        it('do not caled #_switchExecute if timer property has value', function () {
            var stub = sinon.stub(instance, '_switchExecute');

            instance.timer = 1;
            instance.execute();

            expect(stub.called).to.not.be.ok();

        });
        it('do not caled #_switchExecute if timer property does not have value', function () {
            var stub = sinon.stub(instance, '_switchExecute');

            instance.execute(1,2,3);

            expect(stub.calledWith(config)).to.be.ok();

        });
    });

    describe('#_switchExecute', function () {

        var config = {
                callback : function(){},
                args     : [1, 2,3],
                scope    : this,
                interval : 2000,
                immediate: true
            };

        it('call #_executeBefore if you pass true in immediate property', function () {

            var stubBefore = sinon.stub(instance, '_executeBefore'),
                stubAfter  = sinon.stub(instance, '_executeAfter');

            instance._switchExecute(config);

            expect(stubBefore.calledWith(config.callback, config.args, config.scope, config.interval)).to.be.ok();
            expect(stubAfter.called).to.not.be.ok();
        });
    });

    describe('#_switchExecute', function () {

        var config = {
                callback : function(){},
                args     : [1, 2,3],
                scope    : this,
                interval : 2000,
                immediate: false
            };

        it('call #_switchExecute if you pass true in immediate property', function () {
            var stubBefore = sinon.stub(instance, '_executeBefore'),
                stubAfter  = sinon.stub(instance, '_executeAfter');

            instance._switchExecute(config);

            expect(stubBefore.called).to.not.be.ok();
            expect(stubAfter.called).to.be.ok();
        });
    });

    describe('#_executeAfter', function () {
        it('call callback after interval', function () {

            // do not call callback and set this.timer
            instance._executeAfter(spy, args, scope, interval);
            expect(spy.called).to.not.be.ok();
            expect(instance.timer).to.be.a('number');

            clock.tick(interval);

            // call callback and set null to this.timer
            expect(spy.calledWith(1,2,3)).to.be.ok();
            expect(instance.timer).to.equal(null);
        });
    });

    describe('#_executeBefore', function () {
        it('call callback before interval', function () {

            // call callback and set this.timer
            instance._executeBefore(spy, args, scope, interval);
            expect(spy.calledWith(1,2,3)).to.be.ok();
            expect(instance.timer).to.be.a('number');

            clock.tick(interval);

            expect(instance.timer).to.equal(null);
        });
    });

});
