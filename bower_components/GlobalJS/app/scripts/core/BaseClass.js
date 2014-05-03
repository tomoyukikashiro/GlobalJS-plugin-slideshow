(function(){
    'use strict';

    /**
     * @class Global.core.BaseClass
     * Base class of this library
     * @alternateClassName Global.BaseClass
     * @extends Class
     */
    Global.define('Global.core.BaseClass',{

        alias: 'Global.BaseClass',

        extend: Class,

        /**
         * @method init
         * This method apply config to own properites.
         * @constructor
         */
        init: function(config){
            this.config = config;
            this._applyConfig(config);
        },

        /**
         * @method _applyConfig
         * @private
         */
        _applyConfig: function(config){
            // define instance properties
            for(var key in config) {
                this[key] = config[key];
            }
        }
    });
})();
