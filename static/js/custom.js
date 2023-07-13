/*--------------------- Copyright (c) 2021 -----------------------
[Master Javascript]
Project: Barber Services - Responsive HTML Template 
Version: 1.0.0
Assigned to: Theme Forest
-------------------------------------------------------------------*/
(function($) {
    "use strict";
    /*-----------------------------------------------------
    	Function  Start
    -----------------------------------------------------*/
    var Barber = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-----------------------------------------------------
            	Function Calling
            -----------------------------------------------------*/
            this.preLoader();
            this.searchBox();
            this.navMenu();
            this.focusText();
            this.partner();
            this.topButton();
            this.salBanner();
            this.popupGallery();
            this.aboutImg();
            this.saloonTestimonial();
            this.saloonBlog();
            this.workFilter();
            this.countDown();
            this.calenderDate();
            this.selectType();
        },

        /*-----------------------------------------------------
        	Fix Preloader
        -----------------------------------------------------*/
        preLoader: function() {
            $(window).on('load', function() {
                $(".preloader-wrapper").removeClass('preloader-active');
            });
            jQuery(window).on('load', function() {
                setTimeout(function() {
                    jQuery('.preloader-open').addClass('loaded');
                }, 100);
            });
        },

        /*-----------------------------------------------------
        	Fix Search Bar & Cart
        -----------------------------------------------------*/
        searchBox: function() {
            $('.searchBtn').on("click", function() {
                $('.searchBox').addClass('show');
            });
            $('.closeBtn').on("click", function() {
                $('.searchBox').removeClass('show');
            });
            $('.searchBox').on("click", function() {
                $('.searchBox').removeClass('show');
            });
            $(".search-bar-inner").on('click', function() {
                event.stopPropagation();
            });
        },

        /*-----------------------------------------------------
        	Fix Mobile Menu 
        -----------------------------------------------------*/
        navMenu: function() {
            var w = window.innerWidth;
            if (w <= 991) {
                $(".main-menu-wrapper>ul li").on('click', function() {
                    $(this).find('ul.sub-menu').slideToggle();
                    $(this).toggleClass("open");
                });
                $(".main-menu-wrapper>ul").on('click', function() {
                    event.stopPropagation();
                });
                $(".menu-btn").on('click', function(e) {
                    event.stopPropagation();
                    $(".main-menu-wrapper, .menu-btn-wrap").toggleClass("open");
                });
                $("body").on('click', function() {
                    $(".main-menu-wrapper, .menu-btn-wrap").removeClass("open");
                });
            }
        },

        /*-----------------------------------------------------
				Fix Caleder
		-----------------------------------------------------*/
        calenderDate: function() {
            if ($('.date-calender').length > 0) {
                $('.date-calender').datepicker({
                    format: 'dd-mm-yyyy',
                    multidate: false,
                    todayHighlight: false
                });
            }

            $(".calender-form").hide();
            $(".sal-nxt-btn").on('click', function() {
                $(".calender-wrapper").hide();
                $(".calender-form").animate({
                    width: "toggle"
                });
                $(this).text("Submit");
                if ($(".sal-nxt-btn").text("Submit")) {
                    $(".sal-nxt-btn").on('click', function() {
                        $(".sal-nxt-btn").attr("data-dismiss", "modal");
                        alert("Your Booking Done successfully!");
                        location.reload();
                    });
                }
            });
        },

        /*-----------------------------------------------------
           Fix Nice Select
        -----------------------------------------------------*/

        selectType: function() {

            if ($('.nice-selection').length > 0) {
                $('.nice-selection').niceSelect();
            }

        },

        /*-----------------------------------------------------
        	Fix  On focus Placeholder
        -----------------------------------------------------*/
        focusText: function() {
            var place = '';
            $('input,textarea').focus(function() {
                place = $(this).attr('placeholder');
                $(this).attr('placeholder', '');
            }).blur(function() {
                $(this).attr('placeholder', place);
            });
        },

        /*-----------------------------------------------------
        	Fix Partner Slider 
        -----------------------------------------------------*/
        partner: function() {
            var PartnerSwiper = new Swiper('.partner-slider.swiper-container', {
                autoHeight: false,
                autoplay: true,
                spaceBetween: 30,
                slidesPerView: 8,
                loop: true,
                speed: 2000,
                autoplay: {
                    delay: 1000,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    575: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    767: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 30,
                    },
                },
            });
        },

        /*-----------------------------------------------------
        	Fix GoToTopButton
        -----------------------------------------------------*/
        topButton: function() {
            var scrollTop = $("#scroll");
            $(window).on('scroll', function() {
                if ($(this).scrollTop() < 500) {
                    scrollTop.removeClass("active");
                } else {
                    scrollTop.addClass("active");
                }
            });
            $('#scroll').click(function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 2000);
                return false;
            });

            $(function() {
                $('.go-to-demo').click(function() {
                    $('html, body').animate({ scrollTop: $('#go-to-demo').offset().top }, 'slow');
                    return false;
                });
            });
        },

        /*-----------------------------------------------------
        	Fix Testimonial Slider 
        -----------------------------------------------------*/
        saloonTestimonial: function() {
            var saloonTestimonialSwiper = new Swiper('.swiper-container.saloonTestimonial', {
                autoHeight: false,
                autoplay: true,
                loop: true,
                spaceBetween: 30,
                centeredSlides: false,
                speed: 1500,
                autoplay: {
                    delay: 1000,
                },
                pagination: {
                    el: '.testimonialBullets',
                    clickable: true,
                },
            });
        },

        /*-----------------------------------------------------
        	Fix Banner Slider 
        -----------------------------------------------------*/
        salBanner: function() {
            var bannerSwiper = new Swiper('.swiper-container.sal-banner-slider', {
                autoHeight: false,
                autoplay: true,
                loop: true,
                spaceBetween: 0,
                centeredSlides: false,
                speed: 1000,
                autoplay: {
                    delay: 5000,
                },
                keyboard: {
                    enabled: true,
                },
                pagination: {
                    el: '.pagination',
                    clickable: true,
                },
            });
        },

        /*-----------------------------------------------------
        	Fix Gallery Magnific Popup
        -----------------------------------------------------*/
        popupGallery: function() {
            jQuery(document).ready(function() {
                $('.popup-gallery1, .popup-gallery2, .popup-gallery3').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function(item) {
                            return item.el.attr('title') + '<small></small>';
                        }
                    }
                });
            });
        },

        /*-----------------------------------------------------
        	Fix Saloon About Slider 
        -----------------------------------------------------*/
        aboutImg: function() {
            var aboutImg = new Swiper('.swiper-container.aboutImg', {
                autoHeight: false,
                // autoplay: true,
                slidesPerView: 1,
                loop: true,
                spaceBetween: 0,
                centeredSlides: false,
                speed: 1000,
                autoplay: {
                    delay: 3000,
                },
                navigation: {
                    nextEl: '.NextImg',
                    prevEl: '.PrevImg',
                },
            });
        },

        /*-----------------------------------------------------
        	Fix Saloon Blog Slider 
        -----------------------------------------------------*/
        saloonBlog: function() {
            var saloonBlogSwiper = new Swiper('.saloonBlog.swiper-container', {
                autoHeight: false,
                autoplay: true,
                spaceBetween: 30,
                slidesPerView: 3,
                loop: true,
                speed: 2000,
                autoplay: {
                    delay: 1000,
                },
                navigation: {
                    nextEl: '.blogNextButton',
                    prevEl: '.blogPrevButton',
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    575: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    767: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1920: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });
        },

        /*-----------------------------------------------------
        	Fix Work
        -----------------------------------------------------*/
        workFilter: function() {
            $(function() {
                $('.work-filter').mixItUp();
            });
            $('.popup-gallery').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        },


        /*-----------------------------------------------------
        	Fix Couuntdown
        -----------------------------------------------------*/
        countDown: function() {
            if ($('.seconds').length > 0) {

                function getTimeRemaining(endtime) {
                    var t = Date.parse(endtime) - Date.parse(new Date());
                    var seconds = Math.floor((t / 1000) % 60);
                    var minutes = Math.floor((t / 1000 / 60) % 60);
                    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                    var days = Math.floor(t / (1000 * 60 * 60 * 24));
                    return {
                        'total': t,
                        'days': days,
                        'hours': hours,
                        'minutes': minutes,
                        'seconds': seconds
                    };
                }

                function initializeClock(id, endtime) {
                    var clock = document.getElementById(id);
                    var daysSpan = clock.querySelector('.days');
                    var hoursSpan = clock.querySelector('.hours');
                    var minutesSpan = clock.querySelector('.minutes');
                    var secondsSpan = clock.querySelector('.seconds');

                    function updateClock() {
                        var t = getTimeRemaining(endtime);

                        daysSpan.innerHTML = t.days;
                        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                        if (t.total <= 0) {
                            clearInterval(timeinterval);
                        }
                    }

                    updateClock();
                    var timeinterval = setInterval(updateClock, 1000);
                }

                var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
                initializeClock('clockdiv', deadline);

            }

        },



    };

    Barber.init();





    $(document).ready(function() {

        //color picker start
        $(window).on("load", function() {

            var colorcode = document.cookie;
            if (colorcode != "") {
                var cname = "colorcssfile";
                var name = cname + "=";
                var cssname = '';
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) {
                        cssname = c.substring(name.length, c.length);
                    }
                }

                if (cssname != '') {
                    var new_style = 'css/' + cssname + '.css';
                    $('#theme-change').attr('href', new_style);
                }
            }
        });
        //Color Change Script
        $('.colorchange').on("click", function() {
            var name = $(this).attr('id');
            var new_style = 'css/' + name + '.css';
            $('#theme-change').attr('href', new_style);
        });

        $("#style-switcher .bottom a.settings").on("click", function(e) {
            e.preventDefault();
            var div = $("#style-switcher");
            if (div.css("left") === "-160px") {
                $("#style-switcher").animate({
                    left: "0px"
                });
            } else {
                $("#style-switcher").animate({
                    left: "-160px"
                });
            }
        });
        //color picker end



    });




















})(jQuery);