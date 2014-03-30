$(function(){
    'use strict';
    var config = {
            /* jshint ignore:start */
            tpl: [
                 '<div id="<%= id %>" class="<%= cls %> swiper-container" style="width:<%= outerWidth  %>; height: <%= outerHeight  %>">',
                    '<ul class="swiper-wrapper">',
                        '<li class="swiper-slide" style="width:<%= itemWidth  %>; height: <%= itemHeight  %>"><img src="http://dummyimage.com/560x360/000000/fff" width="560" height="360" alt=""></li>',
                        '<li class="swiper-slide" style="width:<%= itemWidth  %>; height: <%= itemHeight  %>"><img src="http://dummyimage.com/560x360/000000/fff" width="560" height="360" alt=""></li>',
                        '<li class="swiper-slide" style="width:<%= itemWidth  %>; height: <%= itemHeight  %>"><img src="http://dummyimage.com/560x360/000000/fff" width="560" height="360" alt=""></li>',
                        '<li class="swiper-slide" style="width:<%= itemWidth  %>; height: <%= itemHeight  %>"><img src="http://dummyimage.com/560x360/000000/fff" width="560" height="360" alt=""></li>',
                    '</ul>',
                '</div>',
                '<div class="pagination"></div>'
           ].join(''),
            /* jshint ignore:end */
            id: 'sample',
            $elm: $('.slideshow'),
            outerWidth: '100%',
            outerHeight: '360px',
            itemWidth: '590px',
            itemHeight: '360px',
            swiperConfig: {
                centeredSlides: true,
                pagination: '.pagination',
                paginationClickable: true,
                slidesPerView: 'auto',
                autoplay: 8000,
                loop: true
            }
        },
        ss = new Global.view.SlideShow(config);
    ss.start();
});
