(function(){
    'use strict';
    /**
     * @class Global.core.ManipulateDomClass
     * @extends Global.core.ObservableClass
     */
    Global.define('Global.core.ManipulateDomClass',{

        extend: Global.core.ObservableClass,

        /**
         * @cfg {Object} refs name and selector
         *
         *     refs: {
         *         main: '.main-panel'
         *     }
         *
         */
        refs: {},

        /**
         * @cfg {Object} event dispatch settings
         *
         * You can set refs names or selectors into each events key.
         *
         *     events: {
         *         main: {
         *             click: '_onClickMain'
         *         },
         *         '.sub': {
         *             click: '_onClickSub'
         *         }
         *     },
         *
         * You can also set more options into event settings.
         *
         *     events: {
         *         sub: {
         *             click: {
         *                 delegate: '.delegate-selector',
         *                 handler : '_onClickSub'
         *             }
         *         }
         *     }
         */
        events: {},

        $elm: null,

        init: function(config){
            this.listeners = {};
            this.elmCaches = {};
            this._super(config);

            this._setElmCaches(this.getRefs());

            this._applyEvents(this.getEvents());
        },

        /**
         * @method getCacheRef
         * Return jQuery Object if this class can find element by using key or selector you passed.
         * @param {String} key element cache key you can set in refs property.
         * @param {String} (optional) selector to find element.
         * @param {jQuery|undefined} if Class can get jQuery object return it.
         */
        getCacheRef: function(key, selector){
            if(!this.$elm){
                return;
            }
            var cached = this.elmCaches[key],
                $elm = !cached && selector ? this.$elm.find(selector): undefined;

            if($elm && $elm.length === 0){
                $elm = undefined;
            }

            if(!cached){
                this.elmCaches[key] = $elm;
            }

            return this.elmCaches[key];
        },

        /**
         * @method set jquery cache in this class
         * @private
         * @param {Object} refs refs object
         * See also {@link #refs}
         */
        _setElmCaches: function(refs){
            var me = this, key;
            for(key in refs){
                me.getCacheRef(key, refs[key]);
            }
        },

        /**
         * @method apply event you want suscribe.
         * @private
         * @param {Object} events refs object
         * See also {@link #events}
         */
        _applyEvents: function(events){
            var me = this,
                $ref,
                eName,
                param;

            $.each(events, function(refsKey, val){
                $ref = me.getCacheRef(refsKey);
                if(!$ref){
                    return false;
                }
                eName = Global.keys(val)[0];
                param = val[eName];

                if(Global.isObject(param) && param.delegate){
                    $ref.on(eName, param.delegate, $.proxy(me[param.handler], me));
                }else if(Global.isString(param)){
                    $ref.on(eName, $.proxy(me[param], me));
                }

            });
        }

    });
})();
