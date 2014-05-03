(function(){
    'use strict';
    /**
     * @class Global.data.model.Model
     */
    Global.define('Global.data.model.Model',{

        extend: Global.core.ObservableClass,

        EVENT_NAME: {
            LOAD: 'load'
        },

        proxy : Global.data.proxy.Proxy,

        requestSetting: {
            GET: {
                type: 'GET',
                dataType: 'json'
            }
        },

        requestParam: {
            GET: {}
        },

        data: null,

        init: function(config){
            this.listeners = {};
            this._super(config);
            this.proxy = new this.proxy();
        },

        get: function(param){
            var _param = this._getRequestObj('GET', param);
            return this._request(_param);
        },

        _request: function(param) {
            var me = this,
                dfd = $.Deferred(),
                ajaxDfd = this.proxy.get(param);

            ajaxDfd.done(function(e){
                me._onSuccess(dfd, e);
            });

            ajaxDfd.fail(function(e){
                dfd.reject(e);
                me.dispatchEvent(me.EVENT_NAME.LOAD, e);
            });

            return dfd.promise();
        },

        _getRequestObj: function(type, param) {
            var requestSettings = this.getRequestSetting()[type],
                requestParam = this.getRequestParam()[type],
                _param = $.extend(true, {}, requestParam, param);

            requestSettings.data = _param;
            return requestSettings;
        },

        _onSuccess: function(dfd, data){
            var _data = this.modifyData(data);

            this.setData(_data);
            dfd.resolve(_data);
            this.dispatchEvent(this.EVENT_NAME.LOAD, _data);
        },

        modifyData: function(data){
            // override if you need.
            return data;
        }
    });
})();
