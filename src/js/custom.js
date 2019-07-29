$(document).ready(function(){

    $(window).load(function () {

        //preloader
        var preloader = $('.preloader');
        preloader.fadeOut(1000, function () {
            $(this).remove();
        });
        var $grid = $('.gallery-container'),
        $sizer = $grid.find('.grid-sizer');

        $grid.shuffle({
            itemSelector: '.gallery-item',
            speed: 500,
            sizer: $sizer
        });

        //scrolling to the specific class
        var hash = window.location.hash;
        if (hash) {
            hash = hash.replace('#','');
            if ($('.' + hash).length > 0) {
                $('html, body').animate({
                    scrollTop: $('.' + hash).offset().top
                }, 500);
            }
        }

        //scrolling to add comment form
        $("[data-scroll-to='button']").click(function(){
            $('html, body').animate({
                scrollTop: $("[data-scroll-to='target']").offset().top
            }, 500);
            return false;
        });

        //scrolling to top
        $("#toTop").click(function(){
            $("html, body").animate({
                scrollTop:0
            },500);
            return false;
        });

        //sorting
        $(".sort-type").on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var isActive = $this.hasClass( 'active' );
            var group = isActive ? 'all' : $this.data('group');
            // Hide current label, show current label in title
            if ( !isActive ) {
                $('.btn-group .active').removeClass('active');
            }
            $this.toggleClass('active');
            // Filter elements
            $grid.shuffle( 'shuffle', group );
        });

        //side menu
        $(".side-menu-tab .expand").click(function(e){
            e.preventDefault();
            if($(this).parent().hasClass('open')) {
                $(this).parent().removeClass('open');
            } else {
                $(this).parent().addClass('open');
            }
        });

        //change opacity
        $(".change-opacity").click(function(e){
            e.preventDefault();
            $(".change-opacity").removeClass('active');
            $(this).addClass('active');
            if($(this).data('opacity') === 'low') {
                $("body").addClass("low-opacity");
                $.cookie('equalizer-box-opacity', 'low', { expires: 365 });
            } else {
                $("body").removeClass("low-opacity");
                $.cookie('equalizer-box-opacity', 'high', { expires: 365 });
            }
        });

        //tooltip init - only for notouch
        if (!Modernizr.touch) {
            $("[data-toggle='tooltip']").tooltip();
        }

        //set box opacity from cookie
        if($.cookie('equalizer-box-opacity')) {
            if($.cookie('equalizer-box-opacity') === 'low') {
                $("body").addClass("low-opacity");
                $(".change-opacity").removeClass('active');
                $("[data-opacity='low']").addClass("active");
            }
        }

    });

})