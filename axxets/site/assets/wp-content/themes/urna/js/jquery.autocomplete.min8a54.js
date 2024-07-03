"use strict";!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports&&"function"==typeof require?require("jquery"):jQuery)}(function(e){function t(n,o){var i=this;i.element=n,i.el=e(n),i.suggestions=[],i.badQueries=[],i.selectedIndex=-1,i.currentValue=i.element.value,i.timeoutId=null,i.cachedResponse={},i.onChangeTimeout=null,i.onChange=null,i.isLocal=!1,i.suggestionsContainer=null,i.noSuggestionsContainer=null,i.options=e.extend(!0,{},t.defaults,o),i.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},i.hint=null,i.hintValue="",i.selection=null,i.initialize(),i.setOptions(o)}function n(e,t,n){return-1!==e.value.toLowerCase().indexOf(n)}function o(t){return"string"==typeof t?e.parseJSON(t):t}function i(e,t){if(!t)return e.value;var n="("+a.escapeRegExChars(t)+")";return e.value.replace(new RegExp(n,"gi"),"<strong>$1</strong>").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/&lt;(\/?strong)&gt;/g,"<$1>")}function s(e,t){return'<div class="autocomplete-group">'+t+"</div>"}var a=function(){return{escapeRegExChars:function(e){return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")},createNode:function(e){var t=document.createElement("div");return t.className=e,t.style.position="absolute",t.style.display="none",t}}}(),r={ESC:27,TAB:9,RETURN:13,LEFT:37,UP:38,RIGHT:39,DOWN:40},u=e.noop;t.utils=a,e.Autocomplete=t,t.defaults={ajaxSettings:{},autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:i,formatGroup:s,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:u,onSearchComplete:u,onSearchError:u,preserveInput:!1,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",currentRequest:null,triggerSelectOnValidInput:!0,preventBadQueries:!0,lookupFilter:n,paramName:"query",transformResult:o,showNoSuggestionNotice:!1,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:!1},t.prototype={initialize:function(){var n,o=this,i="."+o.classes.suggestion,s=o.classes.selected,a=o.options;o.element.setAttribute("autocomplete","off"),o.noSuggestionsContainer=e('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),o.suggestionsContainer=t.utils.createNode(a.containerClass),(n=e(o.suggestionsContainer)).appendTo(a.appendTo||"body"),"auto"!==a.width&&n.css("width",a.width),n.on("mouseover.autocomplete",i,function(){o.activate(e(this).data("index"))}),n.on("mouseout.autocomplete",function(){o.selectedIndex=-1,n.children("."+s).removeClass(s)}),n.on("click.autocomplete",i,function(){o.select(e(this).data("index"))}),n.on("click.autocomplete",function(){clearTimeout(o.blurTimeoutId)}),o.fixPositionCapture=function(){o.visible&&o.fixPosition()},e(window).on("resize.autocomplete",o.fixPositionCapture),o.el.on("keydown.autocomplete",function(e){o.onKeyPress(e)}),o.el.on("keyup.autocomplete",function(e){o.onKeyUp(e)}),o.el.on("blur.autocomplete",function(){o.onBlur()}),o.el.on("focus.autocomplete",function(){o.onFocus()}),o.el.on("change.autocomplete",function(e){o.onKeyUp(e)})},onFocus:function(){var e=this;e.fixPosition(),e.el.val().length>=e.options.minChars&&e.onValueChange()},onBlur:function(){var e=this;e.blurTimeoutId=setTimeout(function(){e.hide()},200)},abortAjax:function(){var e=this;e.currentRequest&&(e.currentRequest.abort(),e.currentRequest=null)},setOptions:function(t){var n=this,o=e.extend({},n.options,t);n.isLocal=Array.isArray(o.lookup),n.isLocal&&(o.lookup=n.verifySuggestionsFormat(o.lookup)),o.orientation=n.validateOrientation(o.orientation,"bottom"),e(n.suggestionsContainer).css({"max-height":o.maxHeight+"px",width:o.width+"px","z-index":o.zIndex}),this.options=o},clearCache:function(){this.cachedResponse={},this.badQueries=[]},clear:function(){this.clearCache(),this.currentValue="",this.suggestions=[]},disable:function(){var e=this;e.disabled=!0,clearTimeout(e.onChangeTimeout),e.abortAjax()},enable:function(){this.disabled=!1},fixPosition:function(){var t=this,n=e(t.suggestionsContainer),o=n.parent().get(0);if(o===document.body||t.options.forceFixPosition){var i=t.options.orientation,s=n.outerHeight(),a=t.el.outerHeight(),r=t.el.offset(),u={top:r.top,left:r.left};if("auto"===i){var l=e(window).height(),c=e(window).scrollTop(),g=-c+r.top-s,d=c+l-(r.top+a+s);i=Math.max(g,d)===g?"top":"bottom"}if(u.top+="top"===i?-s:a,o!==document.body){var p,h=n.css("opacity");t.visible||n.css("opacity",0).show(),p=n.offsetParent().offset(),u.top-=p.top,u.top+=o.scrollTop,u.left-=p.left,t.visible||n.css("opacity",h).hide()}"auto"===t.options.width&&(u.width=t.el.outerWidth()+"px"),n.css(u)}},isCursorAtEnd:function(){var e,t=this,n=t.el.val().length,o=t.element.selectionStart;return"number"==typeof o?o===n:!document.selection||((e=document.selection.createRange()).moveStart("character",-n),n===e.text.length)},onKeyPress:function(e){var t=this;if(!t.disabled&&!t.visible&&e.which===r.DOWN&&t.currentValue)return void t.suggest();if(!t.disabled&&t.visible){switch(e.which){case r.ESC:t.el.val(t.currentValue),t.hide();break;case r.RIGHT:if(t.hint&&t.options.onHint&&t.isCursorAtEnd()){t.selectHint();break}return;case r.TAB:if(t.hint&&t.options.onHint)return void t.selectHint();if(-1===t.selectedIndex)return void t.hide();if(t.select(t.selectedIndex),!1===t.options.tabDisabled)return;break;case r.RETURN:if(-1===t.selectedIndex)return void t.hide();t.select(t.selectedIndex);break;case r.UP:t.moveUp();break;case r.DOWN:t.moveDown();break;default:return}e.stopImmediatePropagation(),e.preventDefault()}},onKeyUp:function(e){var t=this;if(!t.disabled){switch(e.which){case r.UP:case r.DOWN:return}clearTimeout(t.onChangeTimeout),t.currentValue!==t.el.val()&&(t.findBestHint(),t.options.deferRequestBy>0?t.onChangeTimeout=setTimeout(function(){t.onValueChange()},t.options.deferRequestBy):t.onValueChange())}},onValueChange:function(){if(this.ignoreValueChange)return void(this.ignoreValueChange=!1);var t=this,n=t.options,o=t.el.val(),i=t.getQuery(o);if(t.selection&&t.currentValue!==i&&(t.selection=null,(n.onInvalidateSelection||e.noop).call(t.element)),clearTimeout(t.onChangeTimeout),t.currentValue=o,t.selectedIndex=-1,n.triggerSelectOnValidInput&&t.isExactMatch(i))return void t.select(0);i.length<n.minChars?t.hide():t.getSuggestions(i)},isExactMatch:function(e){var t=this.suggestions;return 1===t.length&&t[0].value.toLowerCase()===e.toLowerCase()},getQuery:function(t){var n,o=this.options.delimiter;return o?(n=t.split(o),e.trim(n[n.length-1])):t},getSuggestionsLocal:function(t){var n,o=this.options,i=t.toLowerCase(),s=o.lookupFilter,a=parseInt(o.lookupLimit,10);return n={suggestions:e.grep(o.lookup,function(e){return s(e,t,i)})},a&&n.suggestions.length>a&&(n.suggestions=n.suggestions.slice(0,a)),n},getSuggestions:function(t){var n,o,i,s,a=this,r=a.options,u=r.serviceUrl;if(r.params[r.paramName]=t,!1!==r.onSearchStart.call(a.element,r.params)){if(o=r.ignoreParams?null:r.params,e.isFunction(r.lookup))return void r.lookup(t,function(e){a.suggestions=e.suggestions,a.suggest(),r.onSearchComplete.call(a.element,t,e.suggestions)});a.isLocal?n=a.getSuggestionsLocal(t):(e.isFunction(u)&&(u=u.call(a.element,t)),i=u+"?"+e.param(o||{}),n=a.cachedResponse[i]),n&&Array.isArray(n.suggestions)?(a.suggestions=n.suggestions,a.suggest(),r.onSearchComplete.call(a.element,t,n.suggestions)):a.isBadQuery(t)?r.onSearchComplete.call(a.element,t,[]):(a.abortAjax(),s={url:u,data:o,type:r.type,dataType:r.dataType},e.extend(s,r.ajaxSettings),a.currentRequest=e.ajax(s).done(function(e){var n;a.currentRequest=null,n=r.transformResult(e,t),a.processResponse(n,t,i),r.onSearchComplete.call(a.element,t,n.suggestions)}).fail(function(e,n,o){r.onSearchError.call(a.element,t,e,n,o)}))}},isBadQuery:function(e){if(!this.options.preventBadQueries)return!1;for(var t=this.badQueries,n=t.length;n--;)if(0===e.indexOf(t[n]))return!0;return!1},hide:function(){var t=this,n=e(t.suggestionsContainer);e.isFunction(t.options.onHide)&&t.visible&&t.options.onHide.call(t.element,n),t.visible=!1,t.selectedIndex=-1,clearTimeout(t.onChangeTimeout),e(t.suggestionsContainer).hide(),t.signalHint(null)},suggest:function(){if(!this.suggestions.length)return void(this.options.showNoSuggestionNotice?this.noSuggestions():this.hide());var t,n=this,o=n.options,i=o.groupBy,s=o.formatResult,a=n.getQuery(n.currentValue),r=n.classes.suggestion,u=n.classes.selected,l=e(n.suggestionsContainer),c=e(n.noSuggestionsContainer),g=o.beforeRender,d="",p=function(e,n){var s=e.data[i];return t===s?"":(t=s,o.formatGroup(e,t))};if(o.triggerSelectOnValidInput&&n.isExactMatch(a))return void n.select(0);e.each(n.suggestions,function(e,t){i&&(d+=p(t,0)),d+='<div class="'+r+'" data-index="'+e+'">'+s(t,a,e)+"</div>"}),this.adjustContainerWidth(),c.detach(),l.html(d),e.isFunction(g)&&g.call(n.element,l,n.suggestions),n.fixPosition(),l.show(),o.autoSelectFirst&&(n.selectedIndex=0,l.scrollTop(0),l.children("."+r).first().addClass(u)),n.visible=!0,n.findBestHint()},noSuggestions:function(){var t=this,n=t.options.beforeRender,o=e(t.suggestionsContainer),i=e(t.noSuggestionsContainer);this.adjustContainerWidth(),i.detach(),o.empty(),o.append(i),e.isFunction(n)&&n.call(t.element,o,t.suggestions),t.fixPosition(),o.show(),t.visible=!0},adjustContainerWidth:function(){var t,n=this,o=n.options,i=e(n.suggestionsContainer);"auto"===o.width?(t=n.el.outerWidth(),i.css("width",t>0?t:300)):"flex"===o.width&&i.css("width","")},findBestHint:function(){var t=this,n=t.el.val().toLowerCase(),o=null;n&&(e.each(t.suggestions,function(e,t){var i=0===t.value.toLowerCase().indexOf(n);return i&&(o=t),!i}),t.signalHint(o))},signalHint:function(t){var n="",o=this;t&&(n=o.currentValue+t.value.substr(o.currentValue.length)),o.hintValue!==n&&(o.hintValue=n,o.hint=t,(this.options.onHint||e.noop)(n))},verifySuggestionsFormat:function(t){return t.length&&"string"==typeof t[0]?e.map(t,function(e){return{value:e,data:null}}):t},validateOrientation:function(t,n){return t=e.trim(t||"").toLowerCase(),-1===e.inArray(t,["auto","bottom","top"])&&(t=n),t},processResponse:function(e,t,n){var o=this,i=o.options;e.suggestions=o.verifySuggestionsFormat(e.suggestions),i.noCache||(o.cachedResponse[n]=e,i.preventBadQueries&&!e.suggestions.length&&o.badQueries.push(t)),t===o.getQuery(o.currentValue)&&(o.suggestions=e.suggestions,o.suggest())},activate:function(t){var n,o=this,i=o.classes.selected,s=e(o.suggestionsContainer),a=s.find("."+o.classes.suggestion);return s.find("."+i).removeClass(i),o.selectedIndex=t,-1!==o.selectedIndex&&a.length>o.selectedIndex?(n=a.get(o.selectedIndex),e(n).addClass(i),n):null},selectHint:function(){var t=this,n=e.inArray(t.hint,t.suggestions);t.select(n)},select:function(e){var t=this;t.hide(),t.onSelect(e)},moveUp:function(){var t=this;if(-1!==t.selectedIndex)return 0===t.selectedIndex?(e(t.suggestionsContainer).children("."+t.classes.suggestion).first().removeClass(t.classes.selected),t.selectedIndex=-1,t.ignoreValueChange=!1,t.el.val(t.currentValue),void t.findBestHint()):void t.adjustScroll(t.selectedIndex-1)},moveDown:function(){var e=this;e.selectedIndex!==e.suggestions.length-1&&e.adjustScroll(e.selectedIndex+1)},adjustScroll:function(t){var n=this,o=n.activate(t);if(o){var i,s,a,r=e(o).outerHeight();i=o.offsetTop,a=(s=e(n.suggestionsContainer).scrollTop())+n.options.maxHeight-r,i<s?e(n.suggestionsContainer).scrollTop(i):i>a&&e(n.suggestionsContainer).scrollTop(i-n.options.maxHeight+r),n.options.preserveInput||(n.ignoreValueChange=!0,n.el.val(n.getValue(n.suggestions[t].value))),n.signalHint(null)}},onSelect:function(t){var n=this,o=n.options.onSelect,i=n.suggestions[t];n.currentValue=n.getValue(i.value),n.currentValue===n.el.val()||n.options.preserveInput||n.el.val(n.currentValue),n.signalHint(null),n.suggestions=[],n.selection=i,e.isFunction(o)&&o.call(n.element,i)},getValue:function(e){var t,n,o=this,i=o.options.delimiter;return i?(t=o.currentValue,n=t.split(i),1===n.length?e:t.substr(0,t.length-n[n.length-1].length)+e):e},dispose:function(){var t=this;t.el.off(".autocomplete").removeData("autocomplete"),e(window).off("resize.autocomplete",t.fixPositionCapture),e(t.suggestionsContainer).remove()}},e.fn.devbridgeAutocomplete=function(n,o){return arguments.length?this.each(function(){var i=e(this),s=i.data("autocomplete");"string"==typeof n?s&&"function"==typeof s[n]&&s[n](o):(s&&s.dispose&&s.dispose(),s=new t(this,n),i.data("autocomplete",s))}):this.first().data("autocomplete")},e.fn.autocomplete||(e.fn.autocomplete=e.fn.devbridgeAutocomplete)});class AutoComplete{constructor(){"undefined"!=typeof urna_settings&&this._callAjaxSearch()}_callAjaxSearch(){var e=this,t=urna_settings.ajaxurl+"?action=urna_autocomplete_search&security="+urna_settings.search_nonce,n=$("form.searchform.urna-ajax-search"),o=function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")};n.each(function(){var i=$(this),s=i.find("input[name=s]"),a=parseInt(i.data("thumbnail")),r=parseInt(i.data("price"));s.devbridgeAutocomplete({serviceUrl:e._AutoServiceUrl(s,t),minChars:e._AutoMinChars(s),appendTo:e._AutoAppendTo(s),width:"100%",maxHeight:"initial",onSelect:function(e){e.link.length>0&&(window.location.href=e.link)},onSearchStart:function(e){s.parents("form").addClass("tbay-loading")},beforeRender:function(e,t){void 0!==t[0].result&&$(e).prepend('<div class="list-header"><span>'+t[0].result+"</span></div>"),t[0].view_all&&$(e).append('<div class="view-all-products"><span>'+urna_settings.show_all_text+'</span><i class="linear-icon-chevron-right"></i></div>')},onSearchComplete:function(e,t){n.removeClass("tbay-loading"),$(this).parents("form").addClass("open"),$(document.body).trigger("urna_searchcomplete")},formatResult:(t,n)=>{let i=e._initformatResult(t,n,o,a,r);return i},onHide:function(e){$(this).parents("form").hasClass("open")&&$(this).parents("form").removeClass("open")}}),$("body").click(function(){s.is(":focus")||s.each(function(){$(this).devbridgeAutocomplete().hide()})})});var i=n.find('[name="product_cat"], [name="category"]');i.length&&i.change(function(n){let o=$(n.target).parents("form").find("input[name=s]"),i=o.devbridgeAutocomplete();i.hide(),i.setOptions({serviceUrl:e._AutoServiceUrl(o,t)}),i.onValueChange()}),$(document.body).on("urna_searchcomplete",function(){$(".view-all-products").on("click",function(){$(this).parents("form").submit()})})}_AutoServiceUrl(e,t){let n=e.parents("form"),o=parseInt(n.data("count")),i=n.data("post-type"),s=n.data("search-in"),a=n.find('[name="product_cat"], [name="category"]').val();return o>0&&(t+="&number="+o),t+="&search_in="+s,t+="&post_type="+i,a&&(t+="&product_cat="+a),t}_AutoAppendTo(e){let t=e.parents("form");return void 0!==t.data("appendto")?t.data("appendto"):t.find(".urna-search-results")}_AutoMinChars(e){let t=e.parents("form");return parseInt(t.data("minchars"))}_initformatResult(e,t,n,o,i){"&"==t&&(t="&#038;");var s="("+n(t)+")",a="";return o&&e.image&&(a+=' <div class="suggestion-thumb">'+e.image+"</div>"),a+='<div class="suggestion-group">',a+='<div class="suggestion-title product-title">'+e.value.replace(new RegExp(s,"gi"),"<strong>$1</strong>").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/&lt;(\/?strong)&gt;/g,"<$1>")+"</div>",e.no_found&&(a='<div class="suggestion-title no-found-msg">'+e.value+"</div>"),i&&e.price&&(a+=' <div class="suggestion-price price">'+e.price+"</div>"),a+="</div>"}}$(document).ready(()=>{new AutoComplete});