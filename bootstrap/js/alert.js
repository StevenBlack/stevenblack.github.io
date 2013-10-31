/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://getbootstrap.com/javascript/#alerts
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
+function(t){"use strict";var o='[data-dismiss="alert"]',i=function(i){t(i).on("click",o,this.close)};i.prototype.close=function(o){function i(){s.trigger("closed.bs.alert").remove()}var e=t(this),n=e.attr("data-target");n||(n=e.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,""));var s=t(n);o&&o.preventDefault(),s.length||(s=e.hasClass("alert")?e:e.parent()),s.trigger(o=t.Event("close.bs.alert")),o.isDefaultPrevented()||(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one(t.support.transition.end,i).emulateTransitionEnd(150):i())};var e=t.fn.alert;t.fn.alert=function(o){return this.each(function(){var e=t(this),n=e.data("bs.alert");n||e.data("bs.alert",n=new i(this)),"string"==typeof o&&n[o].call(e)})},t.fn.alert.Constructor=i,t.fn.alert.noConflict=function(){return t.fn.alert=e,this},t(document).on("click.bs.alert.data-api",o,i.prototype.close)}(window.jQuery);