$('li').mouseover( function() { 
    $('.active').removeClass('active');
    $(this).addClass('active');
    var top = $(this).offset().top + $(this).height() + 5;
    var left = $(this).offset().left + ($(this).width() / 2);
    $('#marker').stop().animate( { top: top, left: left  }, 2000 );
});

$(document).ready(function () {
    
});

