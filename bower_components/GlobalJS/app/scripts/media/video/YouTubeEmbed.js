(function(){
    'use strict';

    /**
     * @class Global.media.video.YouTubeEmbed
     */
    Global.define('Global.media.video.YouTubeEmbed',{

        extend: Global.ObservableClass,

        eventName: {
            loadSdk   : 'loadsdk',
            loadPlayer: 'loadplayer'
        },

        $elm: null,

        id: '',

        sdkId: 'g-youtube-embed',

        sdkSrc: 'https://www.youtube.com/iframe_api',

        inst: null,

        param: null,

        init: function(config){
            this.listeners = {};
            this._super(config);
        },

        initSdk: function(){
            if(this._hasSdk()){
                this.embed();
                return;
            }
            this._appendSdk();
        },

        _appendSdk: function(){
            window.onYouTubeIframeAPIReady = Global.Functions.bind(this._onLoadSdk, this);
            var $script = this._getSdkCode();
            $(document.body).append($script);
        },

        _onLoadSdk: function(){
            this.dispatchEvent(this.getEventName().loadSdk, {currentTarget: this});
            this.embed();
        },

        _hasSdk: function(){
            var $sdk = $('#' + this.getSdkId());
            return ($sdk.length > 0) && window.YT;
        },

        _getSdkCode: function(){
            var $script = $('<script>'),
                id = this.getSdkId(),
                src = this.getSdkSrc();
            $script.prop('id', id);
            $script.prop('src', src);
            return $script;
        },

        embed: function(){
            var param = this._getParam(),
                inst = this._createEmbedInstance(param);
            this.inst = inst;
        },

        _createEmbedInstance: function(param){
            return new window.YT.Player(this.getId(), param);
        },

        _getParam: function(){
            var param = this.getParam(),
                add = {
                    events: {
                        'onReady': Global.Functions.bind(this._onReadyVideo, this)
                    }
                };
            return $.extend(true, {}, param, add);
        },

        _onReadyVideo: function(/*e*/){
            this.dispatchEvent(this.getEventName().loadPlayer, {currentTarget: this});
            // override as you like
            // event.target.playVideo();
        }

    });
})();
