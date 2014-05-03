
'use strict';

describe('#Test for core/Functions.js', function () {

    var Func = Global.core.Functions;

    it('core/Functions has public methods', function () {
        expect(Func.createDebounce).to.be.a('function');
    });

    it('core/Functions is registed alias name space', function () {
        expect(Global.Functions).to.eql(Func);
    });

    describe('#createDebounce', function () {
        it('return instance of Global.util.functions.Debounce.', function () {
            var config = {
                    callback: sinon.spy(),
                    immediate: true
                },
                instance = Func.createDebounce(config);

            expect(instance).to.be.a('function');
            instance(1,2,3);
            expect(config.callback.calledWith(1,2,3)).to.be.ok();
        });
    });

    describe('#bind', function () {

        var obj, spy, bindFnc;

        beforeEach(function () {
            obj = {
                num : 0,
                execute : function(){
                    this.num++;
                }
            };
            spy = sinon.spy(obj, 'execute');
            bindFnc = Func.bind(obj.execute, obj);
        });

        it('return function and you can pass that context', function () {
            bindFnc();
            expect(spy.called).to.be.ok();
            expect(obj.num).to.eql(1);
        });

        it('you can pass some arguments', function () {
            bindFnc(1,2,3);
            expect(spy.called).to.be.ok();
            expect(obj.num).to.eql(1);
            expect(spy.calledWith(1,2,3)).to.be.ok();
        });

        it('you can addtinal some arguments', function () {
            bindFnc = Func.bind(obj.execute, obj, [4,5,6]);
            bindFnc(1,2,3);
            expect(spy.called).to.be.ok();
            expect(obj.num).to.eql(1);
            expect(spy.calledWith(1,2,3,4,5,6)).to.be.ok();
        });
    });

});
