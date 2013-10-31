/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://getbootstrap.com/javascript/#dropdowns
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
+function(t){"use strict";function e(){t(n).remove(),t(s).each(function(e){var n=i(t(this));n.hasClass("open")&&(n.trigger(e=t.Event("hide.bs.dropdown")),e.isDefaultPrevented()||n.removeClass("open").trigger("hidden.bs.dropdown"))})}function i(e){var i=e.attr("data-target");i||(i=e.attr("href"),i=i&&/#/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var n=i&&t(i);return n&&n.length?n:e.parent()}var n=".dropdown-backdrop",s="[data-toggle=dropdown]",o=function(e){t(e).on("click.bs.dropdown",this.toggle)};o.prototype.toggle=function(n){var s=t(this);if(!s.is(".disabled, :disabled")){var o=i(s),a=o.hasClass("open");if(e(),!a){if("ontouchstart"in document.documentElement&&!o.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click",e),o.trigger(n=t.Event("show.bs.dropdown")),n.isDefaultPrevented())return;o.toggleClass("open").trigger("shown.bs.dropdown"),s.focus()}return!1}},o.prototype.keydown=function(e){if(/(38|40|27)/.test(e.keyCode)){var n=t(this);if(e.preventDefault(),e.stopPropagation(),!n.is(".disabled, :disabled")){var o=i(n),a=o.hasClass("open");if(!a||a&&27==e.keyCode)return 27==e.which&&o.find(s).focus(),n.click();var r=t("[role=menu] li:not(.divider):visible a",o);if(r.length){var l=r.index(r.filter(":focus"));38==e.keyCode&&l>0&&l--,40==e.keyCode&&r.length-1>l&&l++,~l||(l=0),r.eq(l).focus()}}}};var a=t.fn.dropdown;t.fn.dropdown=function(e){return this.each(function(){var i=t(this),n=i.data("dropdown");n||i.data("dropdown",n=new o(this)),"string"==typeof e&&n[e].call(i)})},t.fn.dropdown.Constructor=o,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=a,this},t(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",s,o.prototype.toggle).on("keydown.bs.dropdown.data-api",s+", [role=menu]",o.prototype.keydown)}(window.jQuery);