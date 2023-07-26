
$(document).keydown(function(event) {
    $('.mario').addClass('jump');
    setTimeout(function() {
        $('.mario').removeClass('jump');
    }, 500);
})

var loop = setInterval(function(){
    const posicaoPipe = +$('.pipe').offset().left;
    const posicaoMario = +$('.mario').css('bottom').replace('px', '');
    console.log(posicaoPipe);
    if(posicaoPipe <= 120 && posicaoMario < 80 && posicaoPipe > 0){
        $('.pipe').css('animation','none');
        $('.pipe').css('left', posicaoPipe);

        $('.mario').css('animation', 'none');
        $('.mario').css('bottom', posicaoMario);

        $('.mario').attr('src', 'img/game-over.png');
        $('.mario').css('width', '75px');
        $('.mario').css('margin-left', '50px');

    }
}, 10);