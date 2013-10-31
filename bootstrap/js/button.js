/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(t){"use strict";var e=function(o,n){this.$element=t(o),this.options=t.extend({},e.DEFAULTS,n)};e.DEFAULTS={loadingText:"loading..."},e.prototype.setState=function(t){var e="disabled",o=this.$element,n=o.is("input")?"val":"html",i=o.data();t+="Text",i.resetText||o.data("resetText",o[n]()),o[n](i[t]||this.options[t]),setTimeout(function(){"loadingText"==t?o.addClass(e).attr(e,e):o.removeClass(e).removeAttr(e)},0)},e.prototype.toggle=function(){var t=this.$element.closest('[data-toggle="buttons"]');if(t.length){var e=this.$element.find("input").prop("checked",!this.$element.hasClass("active")).trigger("change");"radio"===e.prop("type")&&t.find(".active").removeClass("active")}this.$element.toggleClass("active")};var o=t.fn.button;t.fn.button=function(o){return this.each(function(){var n=t(this),i=n.data("bs.button"),s="object"==typeof o&&o;i||n.data("bs.button",i=new e(this,s)),"toggle"==o?i.toggle():o&&i.setState(o)})},t.fn.button.Constructor=e,t.fn.button.noConflict=function(){return t.fn.button=o,this},t(document).on("click.bs.button.data-api","[data-toggle^=button]",function(e){var o=t(e.target);o.hasClass("btn")||(o=o.closest(".btn")),o.button("toggle"),e.preventDefault()})}(window.jQuery);