function debounce(b,d,a){
    var c;
    return function(){
        var h=this,g=arguments;
        var f=function(){
            c=null;
            if(!a){
                b.apply(h,g)
            }
        };
        var e=a&&!c;
        clearTimeout(c);

        c=setTimeout(f,d);

        if(e){
            b.apply(h,g)
        }
    }
};

// set element height
function setheight(){
    navheight = $(window).innerHeight();
    $('.bgimage, .header-overlay').css('height',navheight);
}

// move to target element
function movetolink(){
    !window.location.hash||$('html, body').scrollTop(0);
    var $offset = $(".one-page-nav-scrolling").outerHeight(false);
    if(window.location.hash){
      var hash = window.location.hash;
      $('html, body').animate({ scrollTop: $(hash).offset().top-$offset },1250,'easeInOutExpo');
    }
}

function movetolinkonClick(){

    $('.nav li a, .logo a').on('click', function(e){

        e.preventDefault();

        var target = $(this).attr('href');
        var targetPos = $(target).offset().top;

        $('html,body').animate({
            scrollTop:targetPos
        },'slow');

    });

}


function skrollrFunc(){

    skrollrCheck = debounce(function() {
      var winWidth = window.innerWidth;
      if(winWidth >= 767) {
        // Init Skrollr
        skrollr.init({
            forceHeight: false,//disable setting height on body
            mobileDeceleration:0.05,
            render: function(data) {
                //Debugging - Log the current scroll position.
                //console.log('data.curTop: ' + data.curTop);
            }
        });
        skrollr.get().refresh();
      } else {
        // Destroy skrollr for screens less than 600px
        skrollr.init().destroy();
      }
    }, 250);

        //Initialize skrollr, but only if it exists
    if(typeof skrollr !== typeof undefined){
      // INITIALIZE
      window.onload = skrollrCheck();
      window.addEventListener('resize', skrollrCheck);
    } else {
      console.log('skrollr is missing.');
    }

}

$(function(){  
    
    setheight();
    movetolinkonClick();
    skrollrFunc();

    
    $(window).resize(debounce(function(e){
        setheight();
    },200)).resize();
    
    $('a[href="#"]').on('click', function(e){
        e.preventDefault();
        e.stopPropagation(); 
    });
    
    $('.bgimage').backstretch([
        'assets/img/slider/header-bg.jpg',
        'assets/img/slider/header-bg2.jpg',
        'assets/img/slider/header-bg3.jpg',
    ],{duration: 3000, fade: 750, });

    $(window).on("backstretch.before", function (e, instance, index) {
        $('.header-content').removeClass('show animate');
         $('.header-content-0'+index).addClass('show');
    }).on("backstretch.after", function (e, instance, index) {
        $('.header-content-0'+index).addClass('animate');
    });
    
    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');

        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
    //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
    //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');

        }
    });
    
    $(".modal-trigger").on("click", function(){
        $("#setup-modal").modal();
    });

    $(".modal-close").on("click", function(){
        $("#setup-modal").modal("hide");
    });

    // var slider01 = new SimpleSlider( document.getElementById('slide01'), {
    //     autoPlay:true,
    //     transitionTime:5,
    //     transitionDelay:3.5,
    //     transitionProperty: 'opacity',
    //     startValue: 0,
    //     visibleValue: 1,
    //     endValue: 0
    // } );

    // var slider02 = new SimpleSlider( document.getElementById('slide02'), {
    //     autoPlay:true,
    //     transitionTime:3,
    //     transitionDelay:13,
    //     transitionProperty: 'opacity',
    //     startValue: 0,
    //     visibleValue: 1,
    //     endValue: 0
    // } );

    // var slider03 = new SimpleSlider( document.getElementById('slide03'), {
    //     autoPlay:true,
    //     transitionTime:3,
    //     transitionDelay:19,
    //     transitionProperty: 'opacity',
    //     startValue: 0,
    //     visibleValue: 1,
    //     endValue: 0
    // } );

    $("#slide01").responsiveSlides({
        timeout: 8000
    });
    $("#slide02").responsiveSlides({
        timeout: 13000
    });
    $("#slide03").responsiveSlides({
        timeout: 20000
    });

});


$(window).load(function(){

    $('#globalOverlay').delay(2000).fadeOut({
        duration: 800,
        start: function(){
            $('body').toggleClass('ready').removeClass('loading');
            movetolink();
        },
        complete: function(){
            $('body').toggleClass('loaded').removeClass('ready');
        }
    });

    $('#data').parallax("50%", 0.5);

    $(window).on('activate.bs.scrollspy', function (e) {
        var hash = $("a[href^='#']", e.target).attr("href");
        history.pushState(null,null,hash);
    });

});


