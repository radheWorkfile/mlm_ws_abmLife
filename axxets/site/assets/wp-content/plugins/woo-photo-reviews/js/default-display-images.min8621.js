jQuery(document).ready(function(){let e,i,t;jQuery("body").on("click",".reviews-images-item",function(){let a,r;t=jQuery(this).parent().parent(),a=parseInt(t.find(".wcpr-rotate-value").val()),jQuery(this).hasClass("active-image")?(t.find(".big-review-images").hide(),jQuery(this).removeClass("active-image")):(e=jQuery(this).attr("data-index"),i=jQuery(this).parent().find(".reviews-images-item").length,jQuery(this).parent().find(".reviews-images-item").removeClass("active-image"),jQuery(this).addClass("active-image"),t.find(".big-review-images-content").html(""),t.find(".big-review-images").hide(),t.find(".big-review-images").find(".big-review-images-content").append('<img class="big-review-images-content-img" style="float:left;display: block;border-radius: 3px;" src="'+jQuery(this).attr("data-imagesrc")+'">'),t.find(".big-review-images").css({display:"flex"})),a&&(r=t.find(".big-review-images-content-img")).css({transform:"rotate("+a+"deg)"})}),jQuery("body").on("click",".wcpr-next",function(){let a,r;t=jQuery(this).parent().parent(),a=parseInt(t.find(".wcpr-rotate-value").val()),e=t.find(".active-image").attr("data-index"),i=t.find(".reviews-images-item").length,t.find(".reviews-images-item").removeClass("active-image"),e<i-1?e++:e=0,t.find(".reviews-images-item").eq(e).addClass("active-image"),t.find(".big-review-images-content").html(""),t.find(".big-review-images").hide(),t.find(".big-review-images").find(".big-review-images-content").append('<img class="big-review-images-content-img" style="float:left;display: block;border-radius: 3px;" src="'+t.find(".reviews-images-item").eq(e).attr("data-imagesrc")+'">'),t.find(".big-review-images").css({display:"flex"}),a&&(r=t.find(".big-review-images-content-img")).css({transform:"rotate("+a+"deg)"})}),jQuery("body").on("click",".wcpr-prev",function(){let a,r;t=jQuery(this).parent().parent(),a=parseInt(t.find(".wcpr-rotate-value").val()),e=t.find(".active-image").attr("data-index"),i=t.find(".reviews-images-item").length,t.find(".reviews-images-item").removeClass("active-image"),e>0?e--:e=i-1,t.find(".reviews-images-item").eq(e).addClass("active-image"),t.find(".big-review-images-content").html(""),t.find(".big-review-images").hide(),t.find(".big-review-images").find(".big-review-images-content").append('<img class="big-review-images-content-img" style="float:left;display: block;border-radius: 4px;" src="'+t.find(".reviews-images-item").eq(e).attr("data-imagesrc")+'">'),t.find(".big-review-images").css({display:"flex"}),a&&(r=t.find(".big-review-images-content-img")).css({transform:"rotate("+a+"deg)"})}),jQuery("body").on("click",".wcpr-close",function(){t=jQuery(this).parent().parent(),jQuery(this).parent().hide(),t.find(".kt-wc-reviews-images-wrap-wrap").find(".active-image").removeClass("active-image")}),jQuery("body").on("click",".wcpr-rotate-left",function(){let e,i;t=jQuery(this).parent().parent(),e=parseInt(t.find(".wcpr-rotate-value").val()),i=t.find(".big-review-images-content-img"),e+=-90,t.find(".wcpr-rotate-value").val(e),i.css({transform:"rotate("+e+"deg)"})}),jQuery("body").on("click",".wcpr-rotate-right",function(){let e,i;t=jQuery(this).parent().parent(),e=parseInt(t.find(".wcpr-rotate-value").val()),i=t.find(".big-review-images-content-img"),e+=90,t.find(".wcpr-rotate-value").val(e),i.css({transform:"rotate("+e+"deg)"})})});