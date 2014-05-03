(function(){
    'use strict';
    /**
     * @class Global.util.functions.Debounce
     * debounce instance it is usefull to reduce functions call.
     * @extends Global.core.BaseClass
     *
     *
     *     var config = {
     *             callback: console.log,
     *             scope   : console,
     *             interval: 1000
     *         },
     *         instance = Global.util.functions.Debounce(config);
     *
     *     window.addEventListener('resize', instance.execute);
     */
    Global.define('Global.util.functions.Debounce',{

        /**
         * @method init
         * @constructor
         * @param {Object} config config of this class.
         * @param {Function} config.callback callback.
         * @param {Object} config.scope scope of callback
         * @param {Number} config.interval interval time. (ms) default is 1000ms.
         * @param {Boolean} config.immediate wheter callback is execute immediate or not.
         */
        init: function(config) {
            this.timer = null;
            this._super(config);
        },

        /**
         * @method execute
         * Execute function you passed.
         */
        execute: function() {
            var config = {
                callback: this.callback,
                args    : Global.core.Array.args2Array(arguments),
                scope   : this.scope || this,
                interval: this.interval || 1000,
                immediate: this.immediate
            };

            if (this.timer) {
                return false;
            }
            this._switchExecute(config);
        },
        /**
         * @method _switchExecute
         * @private
         */
        _switchExecute: function(config) {
            if (config.immediate) {
                this._executeBefore(config.callback, config.args, config.scope, config.interval);
            } else {
                this._executeAfter(config.callback, config.args, config.scope, config.interval);
            }
        },
        /**
         * @method _executeBefore
         * @private
         */
        _executeBefore: function(callback, args, scope, interval) {
            var me = this;
            callback.apply(scope, args);
            me.timer = setTimeout(function() {
                me.timer = null;
            }, interval);
        },
        /**
         * @method _executeAfter
         * @private
         */
        _executeAfter: function(callback, args, scope, interval) {
            var me = this;
            me.timer = setTimeout(function() {
                callback.apply(scope, args);
                me.timer = null;
            }, interval);
        }
    });
})();
