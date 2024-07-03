"use strict";class Carousel{CarouselSlick(){var e=this;0!==jQuery(".owl-carousel[data-carousel=owl]:visible").length&&(jQuery(".owl-carousel[data-carousel=owl]:visible:not(.scroll-init)").each(function(){e._initCarouselSlick(jQuery(this))}),jQuery(".owl-carousel[data-carousel=owl]:visible.scroll-init").waypoint(function(){var t=$($(this)[0].element);e._initCarouselSlick(t)},{offset:"100%"}))}_initCarouselSlick(e){var t=this;e.hasClass("slick-initialized")||e.slick(t._getSlickConfigOption(e))}_getSlickConfigOption(e){var t=$(e).data("items"),s=$(e).data("rows")?parseInt($(e).data("rows")):1,i=$(e).data("desktopslick")?$(e).data("desktopslick"):t,l=$(e).data("desktopsmallslick")?$(e).data("desktopsmallslick"):t,a=$(e).data("tabletslick")?$(e).data("tabletslick"):t,r=$(e).data("landscapeslick")?$(e).data("landscapeslick"):2,o=$(e).data("mobileslick")?$(e).data("mobileslick"):2;let n=t<$(e).find(".item").length&&$(e).data("pagination"),c=t<$(e).find(".item").length&&$(e).data("nav"),d=t<$(e).find(".item").length&&$(e).data("loop"),u=t<$(e).find(".item").length&&$(e).data("auto");var y={};if(y.dots=n,y.arrows=c,y.infinite=d,y.speed=1e3,y.autoplay=u,y.autoplaySpeed=$(e).data("autospeed")?$(e).data("autospeed"):2e3,y.cssEase="ease",y.slidesToShow=t,y.slidesToScroll=t,y.mobileFirst=!0,y.vertical=!1,y.prevArrow='<button type="button" class="slick-prev"><i class="icon-arrow-left icons"></i></button>',y.nextArrow='<button type="button" class="slick-next"><i class="icon-arrow-right icons"></i></button>',y.rtl="rtl"==$("html").attr("dir"),s>1){y.slidesToShow=1,y.slidesToScroll=1,y.rows=s,y.slidesPerRow=t;var g={slidesPerRow:t},k={slidesPerRow:i},p={slidesPerRow:l},h={slidesPerRow:a},w=$(e).data("unslick")?"unslick":{slidesPerRow:r},f=$(e).data("unslick")?"unslick":{slidesPerRow:o}}else var g={slidesToShow:t,slidesToScroll:t},k={slidesToShow:i,slidesToScroll:i},p={slidesToShow:l,slidesToScroll:l},h={slidesToShow:a,slidesToScroll:a},w=$(e).data("unslick")?"unslick":{slidesToShow:r,slidesToScroll:r},f=$(e).data("unslick")?"unslick":{slidesToShow:o,slidesToScroll:o};var b=$(e).data("nav")?{arrows:!1,dots:!0}:"";return w=$(e).data("unslick")?w:$.extend(!0,w,b),f=$(e).data("unslick")?f:$.extend(!0,f,b),y.responsive=[{breakpoint:1600,settings:g},{breakpoint:1199,settings:k},{breakpoint:991,settings:p},{breakpoint:767,settings:h},{breakpoint:479,settings:w},{breakpoint:0,settings:f}],y}getSlickTabs(){var e=this;$("ul.nav-tabs li a").on("shown.bs.tab",t=>{let s=$($(t.target).attr("href")).find(".owl-carousel[data-carousel=owl]:visible");let i=$($(t.relatedTarget).attr("href")).find(".owl-carousel[data-carousel=owl]");i.hasClass("slick-initialized")&&i.slick("unslick");s.hasClass("slick-initialized")||s.slick(e._getSlickConfigOption(s))})}}class Slider{tbaySlickSlider(){jQuery(".single-product").find(".flex-control-thumbs").each(function(){if(0!=jQuery(this).children().length){var e={};e.vertical="vertical"===jQuery(this).parent(".woocommerce-product-gallery").data("layout"),e.slidesToShow=jQuery(this).parent(".woocommerce-product-gallery").data("columns"),e.infinite=!1,e.focusOnSelect=!0,e.settings="unslick",e.prevArrow='<span class="owl-prev"></span>',e.nextArrow='<span class="owl-next"></span>',e.rtl=jQuery("body").hasClass("rtl")&&"vertical"!==jQuery(this).parent(".woocommerce-product-gallery").data("layout"),e.responsive=[{breakpoint:1200,settings:{vertical:!1,slidesToShow:4}}],jQuery(this).slick(e)}})}}class Layout{tbaySlickLayoutSlide(){if($(".tbay-slider-for").length>0){var e={},t={};e.rtl=t.rtl=$("body").hasClass("rtl"),e.slidesToShow=1;var s=1;$(".tbay-slider-for").data("number")>0&&(e.slidesToShow=$(".tbay-slider-for").data("number"),s=$(".tbay-slider-for").data("number")-1),e.arrows=!0,e.infinite=!0,e.slidesToScroll=1,e.prevArrow='<span class="slick-prev"><i class="icon-arrow-left icons"></i></span>',e.nextArrow='<span class="slick-next"><i class="icon-arrow-right icons"></i></span>',e.responsive=[{breakpoint:1025,settings:{vertical:!1,slidesToShow:s}},{breakpoint:480,settings:{vertical:!1,slidesToShow:1}}],$(".tbay-slider-for").slick(e),$(".single-product .tbay-slider-for .slick-slide").length&&$(".single-product .tbay-slider-for .slick-track").addClass("woocommerce-product-gallery__image single-product-main-image")}}}class Slider_gallery{tbay_slider_gallery(){var e={};e.slidesToShow=1,e.slidesToScroll=1,e.prevArrow='<button type="button" class="slick-prev"><i class="linear-icon-chevron-left"></i></button>',e.nextArrow='<button type="button" class="slick-next"><i class="linear-icon-chevron-right"></i></button>',this.tbay_slider_gallery_hover(e),$(document.body).on("urna_lazyload_image",()=>{this.tbay_slider_gallery_hover(e)}),$(document.body).on("urna_gallery_resize",()=>{$(".tbay-product-slider-gallery").each(function(e,t){$(this).hasClass("slick-initialized")&&($(this).slick("unslick"),$(this).removeAttr("style"))})})}tbay_slider_gallery_hover(e){$(".has-slider-gallery").find(".product-image").hover(function(t){let s=$(t.currentTarget);s.next(".tbay-product-slider-gallery").hasClass("slick-initialized")||(s.next(".tbay-product-slider-gallery").css("height",s.parent().outerHeight()),s.next(".tbay-product-slider-gallery").slick(e))})}}!function(e,t){var s=function(e,t,s){var i;return function(){function l(){s||e.apply(a,r),i=null}var a=this,r=arguments;i?clearTimeout(i):s&&e.apply(a,r),i=setTimeout(l,t||100)}};jQuery.fn[t]=function(e){return e?this.bind("resize",s(e)):this.trigger(t)}}(jQuery,"smartresizefunc"),jQuery(document).ready(function(){var e=new Carousel,t=new Slider,s=new Layout;if(e.CarouselSlick(),e.getSlickTabs(),void 0!==urna_settings.single_product&&urna_settings.single_product&&("full-width-carousel"===urna_settings.single_layout?s.tbaySlickLayoutSlide():t.tbaySlickSlider()),"slider"===urna_settings.images_mode){var i=new Slider_gallery;i.tbay_slider_gallery()}$(window).smartresizefunc(function(){if($(window).width()>=767)try{e.CarouselSlick(),void 0!==urna_settings.single_product&&urna_settings.single_product&&("full-width-carousel"===urna_settings.single_layout?s.tbaySlickLayoutSlide():t.tbaySlickSlider()),"slider"===urna_settings.images_mode&&i.tbay_slider_gallery()}catch(e){}})}),setTimeout(function(){jQuery(document.body).on("tbay_carousel_slick",()=>{var e=new Carousel;e.CarouselSlick()})},2e3);var CustomSlickHandler=function(e,t){(new Carousel).CarouselSlick()};jQuery(window).on("elementor/frontend/init",function(){"undefined"!=typeof urna_settings&&jQuery.isArray(urna_settings.elements_ready.slick)&&$.each(urna_settings.elements_ready.slick,function(e,t){elementorFrontend.hooks.addAction("frontend/element_ready/tbay-"+t+".default",CustomSlickHandler)})});