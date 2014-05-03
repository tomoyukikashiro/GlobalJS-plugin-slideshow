(function(){
    'use strict';

    /**
     * @class Global.event.Event
     * event object
     * @extends Global.core.BaseClass
     */
    Global.define('Global.event.Event',{

        /**
         * @method init
         * @constructor
         */
        init: function(config) {
            this._super(config);
            this.target = config.target;
            this.type = config.type;
            this.data = config.data;
        }
    });
})();
