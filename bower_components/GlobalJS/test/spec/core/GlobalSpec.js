'use strict';

describe('Test for core/Global.js', function () {

    it('core/Global has public methods', function () {
        expect(Global.define).to.be.a('function');
        expect(Global.regist).to.be.a('function');
    });

    describe('#define', function () {

        describe('#_getRegistedClass', function () {

            it('regist class to namespace of alias string', function () {
                Global.define('hoge.fuga', {});
                /* jshint ignore:start */
                expect(hoge.fuga).to.be.a('function');
                expect(hoge.fuga).to.eql(Global._getRegistedClass('hoge.fuga'));
                /* jshint ignore:end */
            });

        });

        describe('#_getModule', function () {
            it('if you set extend property is not undefined or function it would be returned undefined', function () {
                expect(Global._getModule({extend: 1})).to.be(undefined);
            });
            it('if you set extend property is undefined it would be returned function', function () {
                var spy = sinon.spy(Global.core.BaseClass, 'extend'),
                    definition = {extend: undefined},
                    module = Global._getModule(definition);
                expect(module).to.be.a('function');
                expect(spy.calledWith(definition)).to.be.ok();
                spy.restore();
            });
            it('if you set extend property is function it would be returned sub class', function () {
                var parent = Class.extend({ test: 'test' }),
                    definition = {extend: parent},
                    module = Global._getModule(definition);
                expect(module).to.be.a('function');
                expect(module.prototype.test).to.eql('test');
            });
        });

        describe('#_generateClass', function () {
            it('if you set true in singleton protperty it would be returned instance of Module', function () {
                var module = Class.extend({singleton: true}),
                    klass = Global._generateClass(module, 'test');
                expect(klass instanceof module).to.be.ok();
                expect(klass).to.be.an('object');
            });
            it('if you set false or undefined in singleton property it would be returned sub class', function () {
                var module = Class.extend({}),
                    klass = Global._generateClass(module, 'test');
                expect(klass).to.eql(module);
                expect(klass).to.be.a('function');
            });
            it('Returned class has $parentClass and $className properties', function () {
                var module = Class.extend({}),
                    klass = Global._generateClass(module, 'test');
                expect(klass).to.eql(module);
                expect(klass.$className).to.eql('test');
            });
        });

        describe('#_conbineUpperStr', function () {
            it('should return get / set name', function () {
                var getName = Global._conbineUpperStr('get', 'name'),
                    setName = Global._conbineUpperStr('set', 'name');
                expect(getName).to.eql('getName');
                expect(setName).to.eql('setName');
            });
        });

        // TODO
        describe('#_getGetSetFunc', function () {
            xit('should add get function', function () {
                var config = {
                        test : 'test'
                    },
                    getFunc = Global._getGetSetFunc('get', config, 'test');
                expect(getFunc).to.be.a('function');
                expect(getFunc()).to.eql('test');
            });
            xit('should add set function', function () {
                var config = {
                        test : 'test'
                    },
                    setFunc = Global._getGetSetFunc('set', config, 'test');
                expect(setFunc).to.be.a('function');
                setFunc('hoge');
                expect(config.test).to.eql('hoge');
            });
        });

        describe('#_addGetSetter', function () {
            it('should add get / set property which first charactor is uppercase', function () {
                var config = {
                    testNumber : 1,
                    testString : '1',
                    testFunc   : function(){},
                    testBoolean: true
                },
                res = Global._addGetSetter(config);

                expect(res).to.have.key('getTestNumber');
                expect(res).to.have.key('getTestString');
                expect(res).to.not.have.key('getTestFunc');
                expect(res).to.have.key('testBoolean');
            });
            it('should not add get / set property which dose not own property', function () {
                var config = {
                        test: 1
                    },
                    res = Global._addGetSetter(config);
                expect(config).to.have.property('toString');
                expect(res).to.not.have.property('getToString');
            });
        });

        it('set class in name space', function () {
            Global.define('Test.app.Class', { test: 'test', get: function(){} });
            Global.define('Test.app.Object', { singleton: true, test: 'test', get: function(){} });
            expect(window.Test.app.Class).to.be.a('function');
            expect(window.Test.app.Object).to.be.an('object');
        });

    });

    describe('#regist ... ', function () {

        it('add name space under the window object', function () {
            expect(Global.Test).not.to.be.an('object');
            Global.regist('Global.Test', {});
            expect(Global.Test).to.be.an('object');
        });

        it('add nested name space under the window object', function () {
            expect(Global.Test.Test).not.to.be.an('object');
            Global.regist('Global.Test.Test', {});
            expect(Global.Test.Test).to.be.an('object');
        });

    });

});
