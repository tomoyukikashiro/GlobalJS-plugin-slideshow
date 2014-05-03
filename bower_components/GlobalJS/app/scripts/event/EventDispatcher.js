(function(){
    'use strict';

    /**
     * @class Global.event.EventDispatcher
     * manipulate publish / subscribe interface
     * @extends Global.core.BaseClass
     *
     *     var instance = new Global.event.EventDispatcher(),
     *         callback = Global.core.Functions.bind(console.log);
     *
     *     instance.addEventListener('hoge', callback);
     *     instance.dispatchEvent('hoge'); // log argumetns
     *
     */
    Global.define('Global.event.EventDispatcher',{

        /**
         * @method init
         * @constructor
         */
        init: function(config) {
            this.listeners = {};
            this._super(config);
        },

        /**
        * @method addEventListener
        * Add listener
        * @param {String} type Event type
        * @param {Function} listener Callback function
        *
        */
        addEventListener: function(type, listener){
            (this.listeners[type] || (this.listeners[type] = [])).push(listener);
        },

        /**
        * @method hasEventListener
        * Return true this class listens passed type of event.
        * @param {String} type Event type
        * @return {Boolean}
        */
        hasEventListener: function(type){
            return !!this.listeners[type];
        },

        /**
        * @method  removeEventListener
        * Remove listener
        * @param {String} type Event type
        * @param {Function} listener Callback function
        */
        removeEventListener: function(type, listener){
            var fncs = this.listeners[type];
            if(fncs){
                for (var i = fncs.length-1; i >= 0; i--){
                    if (fncs[i] === listener){
                        fncs.splice(i, 1);
                    }
                }
            }
        },

        /**
        * @method  onesEventListener
        * Event you passed is only called once.
        * @param {String} type Event type
        * @param {Function} listener Callback function
        */
        onesEventListener: function(type, listener){
            var self = this,
                callback = function (event){
                    self.removeEventListener(type, callback);
                    listener.apply(self, [event]);
                    callback = null;
                };
            this.addEventListener(type, callback);
        },

        /**
        * @method dispatchEvent
        * Dispatch event message.
        * @param {String} type Event type
        * @param {Object} data Attach data
        */
        dispatchEvent: function(type, data){
            var fncs = this.listeners[type],
                event = new Global.event.Event({target:this, type: type, data: data});

            if(fncs){
                fncs = fncs.concat();
                for (var i = 0, n = fncs.length; i < n; i++){
                    fncs[i].apply(this, [event]);
                }
            }
        }
    });
})();
