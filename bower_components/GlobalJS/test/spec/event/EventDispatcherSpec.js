
'use strict';

describe('Test for event/EventDispatcher.js', function () {

    var EventDispatcher = Global.event.EventDispatcher,
        instance,
        eventType = 'click';

    beforeEach(function () {
        instance = new EventDispatcher();
    });

    it('instance has those public method', function () {
        expect(instance.addEventListener).to.be.a('function');
        expect(instance.hasEventListener).to.be.a('function');
        expect(instance.removeEventListener).to.be.a('function');
        expect(instance.onesEventListener).to.be.a('function');
        expect(instance.dispatchEvent).to.be.a('function');
    });

    describe('#addEventListener', function () {
        it('set function to listeners if the key you passed dose not exist.', function () {
            var spy = sinon.spy();
            expect(instance.listeners).to.not.have.key(eventType);
            instance.addEventListener(eventType, spy);

            expect(instance.listeners).to.have.key(eventType);
            expect(instance.listeners[eventType][0]).to.eql(spy);
        });

        it('set function to listeners if the key you passed already exist', function () {
            var spy1 = sinon.spy(),
                spy2 = sinon.spy();

            instance.addEventListener(eventType, spy1);

            expect(instance.listeners).to.have.key(eventType);
            expect(instance.listeners[eventType][0]).to.eql(spy1);

            instance.addEventListener(eventType, spy2);
            expect(instance.listeners[eventType][1]).to.eql(spy2);

        });
    });

    describe('#hasEventListener', function () {
        it('should return false if listeners does not have type', function () {
            expect(instance.hasEventListener(eventType)).to.not.be.ok();
        });
        it('should return true if listeners does not have type', function () {
            instance.addEventListener(eventType, function(){});
            expect(instance.hasEventListener(eventType)).to.be.ok();
        });
    });

    describe('#removeEventListener', function () {
        it('remove function from listeners', function () {
            var spy = sinon.spy();

            instance.addEventListener(eventType, spy);
            expect(instance.listeners[eventType][0]).to.be.a('function');
            instance.removeEventListener(eventType, spy);
            expect(instance.listeners[eventType][0]).to.be.a('undefined');
        });
    });

    describe('#onesEventListener', function () {
        it('function is called only once', function () {
            var spy = sinon.spy();
            instance.onesEventListener(eventType, spy);
            instance.dispatchEvent(eventType);
            instance.dispatchEvent(eventType);
            expect(spy.calledOnce).to.be.ok();
        });
    });

    describe('#dispatchEvent', function () {
        it('functions are called if this method is called', function () {
            var spy1 = sinon.spy(),
                spy2 = sinon.spy(),
                data = {test: 1};

            instance.addEventListener(eventType, spy1);
            instance.addEventListener(eventType, spy2);

            instance.dispatchEvent(eventType, data);

            expect(spy1.called).to.be.ok();
            expect(spy2.called).to.be.ok();
        });
        it('it pass Global.event.Event instance to function', function () {
            var spy = sinon.spy(),
                data = {test: 1};

            instance.addEventListener(eventType, spy);
            instance.dispatchEvent(eventType, data);
            expect(spy.args[0][0]).to.be.a(Global.event.Event);
        });
        it('it pass Global.event.Event instance to function adn instance has data property', function () {
            var spy = sinon.spy(),
                data = {test: 1};

            instance.addEventListener(eventType, spy);
            instance.dispatchEvent(eventType, data);
            expect(spy.args[0][0].data).to.equal(data);
        });
    });

});
