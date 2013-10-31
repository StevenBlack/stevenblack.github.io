/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://getbootstrap.com/javascript/#collapse
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
+function(t){"use strict";var e=function(i,s){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,s),this.transitioning=null,this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};e.DEFAULTS={toggle:!0},e.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},e.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e=t.Event("show.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.$parent&&this.$parent.find("> .panel > .in");if(i&&i.length){var s=i.data("bs.collapse");if(s&&s.transitioning)return;i.collapse("hide"),s||i.data("bs.collapse",null)}var n=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[n](0),this.transitioning=1;var o=function(){this.$element.removeClass("collapsing").addClass("in")[n]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return o.call(this);var a=t.camelCase(["scroll",n].join("-"));this.$element.one(t.support.transition.end,t.proxy(o,this)).emulateTransitionEnd(350)[n](this.$element[0][a])}}},e.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var s=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return t.support.transition?(this.$element[i](0).one(t.support.transition.end,t.proxy(s,this)).emulateTransitionEnd(350),void 0):s.call(this)}}},e.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var i=t.fn.collapse;t.fn.collapse=function(i){return this.each(function(){var s=t(this),n=s.data("bs.collapse"),o=t.extend({},e.DEFAULTS,s.data(),"object"==typeof i&&i);n||s.data("bs.collapse",n=new e(this,o)),"string"==typeof i&&n[i]()})},t.fn.collapse.Constructor=e,t.fn.collapse.noConflict=function(){return t.fn.collapse=i,this},t(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(e){var i,s=t(this),n=s.attr("data-target")||e.preventDefault()||(i=s.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""),o=t(n),a=o.data("bs.collapse"),r=a?"toggle":s.data(),l=s.attr("data-parent"),h=l&&t(l);a&&a.transitioning||(h&&h.find('[data-toggle=collapse][data-parent="'+l+'"]').not(s).addClass("collapsed"),s[o.hasClass("in")?"addClass":"removeClass"]("collapsed")),o.collapse(r)})}(window.jQuery);