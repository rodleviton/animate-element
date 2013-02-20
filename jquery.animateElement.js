/*!
 * jQuery animation helper plugin
 * Original author: Rod Leviton
 * Licensed under the MIT license
 */
;(function ($, window, document, undefined) {
    "use strict";
    var animateElement = 'animateElement',
        defaults = {
            hidden: false,
            validation: false,
            speed: 300
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = animateElement;
        this.init();
    }

    Plugin.prototype = {

        init: function () {

            this.update(); // Initialise data attributes

            if ((this.options.hidden) && (this.options.hidden === true)) {
                $(this.element).css({
                    'height': 0,
                    'overflow': 'hidden',
                    'opacity': 0,
                    'paddingTop': 0,
                    'paddingBottom': 0,
                    'marginTop': 0,
                    'marginBottom': 0
                });
            }

            if ((this.options.validation) && (this.options.validation === true)) {
                this.disableInputs();
            }

        },

        update: function () {
            $(this.element).data('paddingTop', $(this.element).css('paddingTop'));
            $(this.element).data('paddingBottom', $(this.element).css('paddingBottom'));
            $(this.element).data('marginTop', $(this.element).css('marginTop'));
            $(this.element).data('marginBottom', $(this.element).css('marginBottom'));
            $(this.element).data('height', $(this.element).height());
            $(this.element).data('validation', this.options.validation);
        },

        show: function () {
            $(this.element).stop().delay(this._defaults.speed).animate({
                'height': $(this.element).data('height'),
                'paddingTop': $(this.element).data('paddingTop'),
                'paddingBottom': $(this.element).data('paddingTop'),
                'marginTop': $(this.element).data('marginTop'),
                'marginBottom': $(this.element).data('marginBottom')
            }, 300, function () {
                $(this.element).stop().animate({
                    'opacity': 1
                }, this._defaults.speed);
                $(this.element).css({
                    'height': 'auto'
                });
            });

            if ((this.options.validation) && (this.options.validation === true)) {
                this.enableInputs();
            }
        },

        hide: function () {
            $(this.element).stop().animate({
                'opacity': 0
            }, this._defaults.speed, function () {
                $(this.element).stop().animate({
                    'height': 0
                }, this._defaults.speed, function () {
                    $(this.element).css({
                        'opacity': 0,
                        'paddingTop': 0,
                        'paddingBottom': 0,
                        'marginTop': 0,
                        'marginBottom': 0,
                        'overflow': 'hidden'
                    });
                });

            });

            if ($(this.element).data('validation') === true) {
                this.disableInputs();
            }
        },

        disableInputs: function () {
            $('input', this.element).each(function () {
                $(this).attr('disabled', true);
            });

            $('select', this.element).each(function () {
                $(this).attr('disabled', true);
            });
        },

        enableInputs: function () {
            $('input', this.element).each(function () {
                $(this).attr('disabled', false);
            });

            $('select', this.element).each(function () {
                $(this).attr('disabled', false);
            });
        }
    };

    $.fn[animateElement] = function (options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + animateElement)) {
                    $.data(this, 'plugin_' + animateElement, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + animateElement);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }
    };

})(jQuery, window, document);