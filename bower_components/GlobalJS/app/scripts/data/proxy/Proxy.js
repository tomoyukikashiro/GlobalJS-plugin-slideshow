(function(){
    'use strict';
    /**
     * @class Global.data.proxy.Proxy
     */
    Global.define('Global.data.proxy.Proxy',{

        extend: Global.core.ObservableClass,

        singleRequest: true,

        isRequesting: false,

        init: function(config) {
            this.listeners = {};
            this._super(config);
        },

        get: function(param){
            var me = this,
                dfd = $.Deferred();

            if(me.getSingleRequest() &&  me.getIsRequesting()){
                return;
            }

            me.setIsRequesting(true);
            $.ajax(param)
                .done(function(e){
                    me.setIsRequesting(false);
                    dfd.resolve(e);
                })
                .fail(function(e){
                    me.setIsRequesting(false);
                    dfd.reject(e);
                });

            return dfd.promise();
        }
    });
})();
