
/**
 * @class  Global
 * This class is base of this framework.
 * It provide definition method and so on.
 * @singleton
 */
(function (win) {

    'use strict';

    var Global = {

        /**
         * @method define
         * define module in specific name space
         * @param  {String} namespace name space of module
         * @param  {Function} definition module definition
         */
        define: function (namespace, definition) {
            var modified = this._modifyDefinition(definition),
                module = this._getModule(modified),
                klass  = this._generateClass(module, namespace),
                alias = definition.alias;

            Global.regist(namespace, klass);

            if(definition.alias){
                Global.regist(alias, this._getRegistedClass(namespace));
            }
        },

        /**
         * @method regist
         * create name space and set passed object
         * @param  {String} nameSpace namespace to set passed object
         * @param  {Object} obj       object to set that namespace
         */
        regist: function (nameSpace, obj) {
            var nameList = nameSpace.split('.'),
                l = nameList.length,
                i = 0,
                name,
                currentObj = win;

            for(; i < l; i++) {
                name = nameList[i];
                if(typeof currentObj[name] === 'undefined') {
                    if(i === nameList.length - 1) {
                        currentObj[name] = obj;
                    } else {
                        currentObj[name] = {};
                    }
                }
                currentObj = currentObj[name];
            }
        },

        /**
         * @method keys
         * get object keys
         * @param {Object} obj targe object
         * @return {String[]} array of object keys
         */
        keys: function(obj){
            var isObject = Global.isObject(obj),
                hasObjectKeys = Object.keys,
                res = [],
                key;
            if(!isObject){
                res = [];
            }
            if(hasObjectKeys){
                res = Object.keys(obj);
            }else{
                for(key in obj){
                    if(obj.hasOwnProperty(key)){
                        res.push(key);
                    }
                }
            }
            return res;
        },
        /**
         * @method isObject
         * @param {Object} obj target object
         * @return {Boolean} whether target is Object or not
         */
        isObject: function(obj){
            return obj === Object(obj);
        },
        /**
         * @method isUndefined
         * @param {Object} obj target object
         * @return {Boolean} whether target is undefined or not
         */
        isUndefined: function(obj){
            return obj === void 0;
        },
        /**
         * @method isFunction
         * @param {Object} obj target object
         * @return {Boolean} whether target is Function or not
         */
        /**
         * @method isString
         * @param {Object} obj target object
         * @return {Boolean} whether target is String or not
         */
        /**
         * @method isNumber
         * @param {Object} obj target object
         * @return {Boolean} whether target is Number or not
         */
        /**
         * @method isDate
         * @param {Object} obj target object
         * @return {Boolean} whether target is Date or not
         */
        _makeWhetherFun: function(){
            var me = this,
                list = ['Function', 'String', 'Number', 'Date', 'Array'];
            $.each(list, function(index, name){
                me['is' + name] = function(obj){
                    return Object.prototype.toString.call(obj) === '[object ' + name + ']';
                };
            });
        },
        /**
         * @method _getRegistedClass
         * @private
         */
        _getRegistedClass: function(nameSpace) {
            var nameList = nameSpace.split('.'),
                l = nameList.length,
                i = 0,
                name,
                currentObj = win;

            for(; i < l; i++){
                name = nameList[i];
                currentObj = currentObj[name];
            }
            return currentObj;
        },

        /**
         * @method _getModule
         * @private
         */
        _getModule: function(definition){
            var module, parent;
            if(this.isUndefined(definition.extend)){
                parent = Global.core.BaseClass;
            }else if(this.isFunction(definition.extend)){
                parent = definition.extend;
            }else{
                console.error('you should set sub class of lib/Class.js');
                return;
            }
            module = parent.extend(definition);
            module.$parentClass = parent;
            return module;
        },
        /**
         * @method _generateClass
         * @private
         */
        _generateClass: function(Module, namespace){
            var klass;
            if(Module.prototype.singleton){
                klass = new Module();
            }else{
                klass = Module;
            }
            klass.$className = namespace;
            return klass;
        },
        /**
         * @method _modifyDefinition
         * @private
         */
        _modifyDefinition: function(definition) {
            var modified;
            modified = this._addGetSetter(definition);
            return modified;
        },
        /**
         * @method _addGetSetter
         * @private
         */
        _addGetSetter: function(definition) {
            var tmpProp,
                newPropName,
                key;
            for(key in definition){
                tmpProp = definition[key];
                if(!this.isFunction(tmpProp) && definition.hasOwnProperty(key)){
                    newPropName = this._conbineUpperStr('get', key);
                    definition[newPropName] = this._getGetSetFunc('get', definition, key);
                    newPropName = this._conbineUpperStr('set', key);
                    definition[newPropName] = this._getGetSetFunc('set', definition, key);
                }
            }
            return definition;
        },
        /**
         * @method _conbineUpperStr
         * @private
         */
        _conbineUpperStr: function(prefix, name){
            var firstUpper = name.charAt(0).toUpperCase(),
                theOthers = name.slice(1);
            return prefix + firstUpper + theOthers;
        },
        /**
         * @method _getGetSetFunc
         * @private
         */
        _getGetSetFunc: function(type, definition, propName){
            var func;
            if(type === 'get'){
                func = function(){
                    // return definition[propName];
                    return this[propName];
                };
            }else{
                func = function(value) {
                    // definition[propName] = value;
                    this[propName] = value;
                };
            }
            return func;
        }
    };

    /*--------------------------------
    * private
    --------------------------------*/
    Global.regist('Global', Global);
    Global._makeWhetherFun();
}(window));
