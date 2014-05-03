(function(){
    'use strict';
    /**
     * @class
     * class for manipulate Map(key, value) data
     */
    Global.define('Global.data.Map',{

        singleton: true,

        /**
         * @private list2Map
         * convert list to Map
         * @param  {Array} data to be converted
         * @param  {String} key object key
         * @return {Array}      converted object
         */
        list2Map: function(data, key) {
            var map = {};
            $.each(data, function(index, obj){
                map[obj[key]] = obj;
            });
            return map;
        },
    });
})();
