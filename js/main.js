
    function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }


    function setheight(){
        navheight = $(window).innerHeight();
        $('.bgimage').css('height',navheight);
        $('#dummy').css('height', navheight);
    }
        
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
        
    $(document).ready(function(e) {
        $('a').on('click', function(e){
            if($(this).attr('href') == '#'){
                e.preventDefault();
            }
        });
        
        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top)
            }, 750, 'easeInOutExpo');
            event.preventDefault();
            console.log("click");
        });

        // Highlight the top nav as scrolling occurs
        $('body').scrollspy({
            target: '.navbar',
            offset: 50
        });
        setheight();
        
        
        $(window).resize(debounce(function(e){
            setheight();
        },200)).resize();
        
        
        $(window).load(function(){
            $('#preloader').fadeOut(800);
        });
                
    });
        
    $(document).ready(function(){

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

    });
        
    
    $(function(){
        var range = 800;
        var thisOffset = $('#sticky-nav nav').offset().top;
        var skillOffset = $('#skills').offset().top;
        skillOffset = skillOffset -range;
        $(window).on('scroll',function(){
            var scrollPos = $(window).scrollTop();
            
            if(scrollPos >= thisOffset){
                $('#sticky-nav').find('nav').addClass('navbar-fixed-top');
            }
            else{
                $('#sticky-nav').find('nav').removeClass('navbar-fixed-top');
            }
            
            if(scrollPos > skillOffset){
                $('.skillbar-bar').addClass('animate');
            }
            
        });
    });    
        
    
    $(window).resize(debounce(function(e){
            
            setheight();
            // $('.navbar.navbar-default').data('bs.affix').options.offset.top = window.innerHeight;
            
    },200)).resize();
        
    $(function(){
        
        $(document).on('click','a[data-toggle="modal"]',function(){
            var el = $(this);
            var thisTitle = el.find('.work-title').text();
            var bigImage = el.attr('data-prev-image');
            var prevUrl = el.attr('data-prev-url');
            var thisCat = el.attr('data-cat');
            var icons = {
                'webdesign' : '<i class="fa fa-desktop"></i>',
                'freelance' : '<i class="fa fa-laptop"></i>',
                'ecommerce' : '<i class="fa fa-shopping-cart"></i>'
            }
            
            var modalTitle = $('#workModal01 .modal-title');
            var modalBody = $('#workModal01 .modal-body');
            var bodyText = '';
            var modalFooter = $('#workModal01 .modal-footer');
            var prevBTN = modalFooter.find('a.prev');
            var footerData = '';
            
            if(prevUrl != ''){
               modalFooter.addClass("active");
            }else {
                modalFooter.removeClass("active");
            }

            prevBTN.attr('href', prevUrl);
            
            bodyText += '<img class="img-responsive" src="'+bigImage+'"/>';
            
            modalTitle.html(icons[thisCat]+' '+thisTitle);
            modalBody.html(bodyText);       
        
            
            $('#workModal01').modal();
            
        });
        
    });

    $(function(){
        
        $('.bgimage').backstretch([
            'img/header.jpg',
            'img/d2.jpg',
            'img/d3.jpg',
        ],{duration: 3000, fade: 750});

        var dob = new Date('1994-12-28');
        var today = new Date();
        var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
        $('#age').html(age);
        $('#year').html(today.getFullYear());
    });


    $(function(){
        
        $('#contactForm').on('submit', function(event){
            event.preventDefault();
            
            var name = $('input[name="name"]').val();
            var email = $('input[name="email"]').val();
            var message = $('textarea[name="message"]').val();
            
            var nameErrorHandler = $('.forName');
            var emailErrorHandler = $('.forEmail');
            var messageErrorHandler = $('.forMessage');
            var statusHandler = $('#status');
            
            var errorCount = 0;
            
            var dataString = $('#contactForm').serialize();
            
            var dialog = new BootstrapDialog({
                title: '',
                type: BootstrapDialog.TYPE_PRIMARY,
                size: BootstrapDialog.SIZE_SMALL,
                closable: false,
                closeByBackdrop: false,
                closeByKeyboard: false,
                message: function(dataRef){
                    
                    var data = '<div class="loadingMod"><img src="img/hourglass.gif" alt="Sending..."><p>Sending. Please wait...</p></div>';
                    
                    return data;
                    
                }
            });
            
            $('.errorTxt').html('');

            dialog.realize();
           // dialog.getModalHeader().css({ 'background':'#F87295','color':'#fff' });
            dialog.open();

            $.ajax({
                url: 'send.php',
                type: 'POST',
                cache: false,
                data: dataString,
                dataType: 'json',
                success: function(result){

                    if(result.status == 'success'){
                        
                        dialog.close();
                        
                        $('input, textarea').val('');
                                               
                        statusHandler.html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Well done</strong> Message has been sent.</div>');
                        
                    }
                    else if( result.status == 'error' ){
                        
                        dialog.close();

                        nameErrorHandler.html( result.errormessage.name );
                        emailErrorHandler.html( result.errormessage.email );
                        messageErrorHandler.html( result.errormessage.message );

                    }
                    else{
                        
                        dialog.close();
                        
                        statusHandler.html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Oppss!</strong> Something went wrong. Please try again later.</div>');
                        
                    }

                }
            });

            
        });
        
    });