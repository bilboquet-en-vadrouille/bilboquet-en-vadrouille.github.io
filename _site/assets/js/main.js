(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
   /* $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    }); */
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
})(jQuery);


$(document).ready(function () {
    /*var lastScrollTop = 0;
    var lastTime = 0;
    var scrollSpeedThreshold = 1.5; // Ajustez ce seuil selon vos besoins (en pixels/ms)

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var currentTime = new Date().getTime();
        var timeDiff = currentTime - lastTime;

        if (timeDiff > 0) {
            var scrollSpeed = Math.abs(scrollTop - lastScrollTop) / timeDiff;

            if (scrollTop > lastScrollTop && scrollSpeed > scrollSpeedThreshold) {
                // Scrolling down fast
                $('.sticky-top').removeClass('shadow-sm').css('top', '-105px');
            } else if (scrollTop < lastScrollTop) {
                // Scrolling up
                $('.sticky-top').addClass('shadow-sm').css('top', '0px');
            }
        }

        lastScrollTop = scrollTop;
        lastTime = currentTime;
    });*/

/*    var lastScrollTop = 0;
var scrollSpeedThreshold = 1.5; // Ajustez ce seuil selon vos besoins (en pixels/ms)
var menuHeight = $('.sticky-top').outerHeight(); // Hauteur initiale du menu

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        if (scrollTop > menuHeight) {
            $('.sticky-top').addClass('slim-menu');
        }
    } else {
        // Scrolling up
        $('.sticky-top').removeClass('slim-menu');
    }

    lastScrollTop = scrollTop;
}); */


    // Function to track scroll direction and update scroll-padding-top
  let lastWindowScrollTop = 0;
  const htmlElement = document.querySelector('#le-stage');

  window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      if (scrollTop > lastWindowScrollTop) {
          // Scrolling down
          htmlElement.classList.remove('scrolling-up');
      } else {
          // Scrolling up
          htmlElement.classList.add('scrolling-up');
      }
  

    lastWindowScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });

  $(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();
    var target = $(this).attr('href');

    // Scroll vers l'élément cible avec un offset de -80px
    $('html, body').animate({
        scrollTop: $(target).offset().top - 80
    }, 1000);
});
});


document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.hover-image');
    var hoverText = document.getElementById('hover-text');
    var currentImage = null;
    var scrollTimeout = null;

    function updateHoverTextPosition(event) {
        if (currentImage) {
            hoverText.style.top = (event.clientY + window.scrollY) + 'px';
            hoverText.style.left = (event.clientX + window.scrollX) + 'px';
        }
    }

    images.forEach(function(image) {
        image.addEventListener('mouseover', function(event) {
            currentImage = image;
            hoverText.textContent = image.getAttribute('alt');
            hoverText.style.display = 'block';
            updateHoverTextPosition(event);
        });

        image.addEventListener('mousemove', updateHoverTextPosition);

        image.addEventListener('mouseout', function() {
            hoverText.style.display = 'none';
            currentImage = null;
        });
    });

    window.addEventListener('scroll', function(event) {
        if (currentImage) {
            hoverText.style.display = 'none';
        }
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            if (currentImage) {
                var rect = currentImage.getBoundingClientRect();
                hoverText.style.top = (rect.top + window.scrollY) + 'px';
                hoverText.style.left = (rect.left + window.scrollX) + 'px';
                hoverText.style.display = 'block';
            }
        }, 100); // Temps d'attente après le défilement (100 ms)
    });
});
