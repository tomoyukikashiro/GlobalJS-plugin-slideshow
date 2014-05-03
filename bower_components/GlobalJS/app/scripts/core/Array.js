(function(){
    'use strict';

    /**
     * @class Global.core.Array
     * Wrapper class for Array
     * @extends Global.core.BaseClass
     * @alternateClassName Global.Arra
     * @singleton
     *
     */
    Global.define('Global.core.Array',{

        alias: 'Global.Array',

        singleton: true,

        /**
         * @method isArray
         * Returns true if an object is an array, false if it is not.
         * @param {Object} object The object to be checked.
         * @return {Boolean} true if an object is an array.
         *
         *     // return true.
         *     Global.core.Array.isArray([]);
         */
        isArray: function(target){
            return target instanceof Array;
        },

        /**
         * @method args2Array
         * Returns array which arguments is convert to.
         * @param {Object} arguments arguments.
         * @return {Array} converted array object.
         *
         *     // return Array object.
         *     function awesomeFunc(){
         *         var ary = Global.core.Array.args2Array(arguments);
         *     }
         *
         */
        args2Array: function(args){
            if(args instanceof Array){
                return args;
            }else{
                return Array.prototype.slice.call(args);
            }
        },

        /**
         * @method map2Array
         * Returns array which map{key:value} is convert to.
         * @param {Object} map The map to be converted.
         * @return {Array} converted array object.
         *
         *     var map = {
         *         hoge: 'hoge',
         *         fuga: 'fuga',
         *         piyo: 'piyo'
         *     },
         *     list = Global.core.Array.map2Array(map);
         *
         *     console.log(list); // ['hoge', 'fuga', 'piyo'];
         *
         */
        map2Array: function(map) {
            var list = [],
                key;
            for(key in map){
                list.push(map[key]);
            }
            return list;
        },

        /**
         * @method each
         * Iterates an array.
         * @param {Object} map The map to be converted.
         *
         *     var list = ['hoge', 'fuga', 'piyo'];
         *
         *     Global.core.Array.each(list, function(index, value){
         *         console.log(index); // 0, 1, 2
         *         console.log(value); // 'hoge', 'fuga', 'piyo'
         *     });
         *
         */
        each: function(list, callback){
            var l = list.length,
                i = 0;
            for(; i < l; i++){
                callback(i, list[i]);
            }
        },

        /**
         * @method contains
         * Checks whether or not the given array contains the specified item.
         * @param {Boolean} return true when the given array contains the specified item.
         *
         *     var list = ['hoge', 'fuga', 'piyo'];
         *
         *     // return true.
         *     console.log(Global.core.Array.contains(list, 'fuga'));
         */
        contains: function(list, target) {
            var i = 0,
                l = list.length;
            for(; i < l; i++){
                if(list[i] === target){
                    return true;
                }
            }
            return false;
        },

        /**
         * @method remove
         */
        remove: function(target, index, count){
            var _count = count || 1;
            target.splice(index, _count);
        }

    });
})();
