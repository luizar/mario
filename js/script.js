var loop;
var loopPontuacao;
var jumpTimeout;
var pontuacao = 1;


function jogoLoop() {

    loopPontuacao = setInterval(function(){
        $('.pontuacao').text(pontuacao++);
    }, 1500);

    loop = setInterval(function(){
        const posicaoPipe = +$('.pipe').offset().left;
        const posicaoMario = + $('.mario').css('bottom').replace('px', '');

        if(posicaoPipe <= 120 && posicaoMario < 80 && posicaoPipe > 0){
            $('.pipe').css('animation','none');
            $('.pipe').css('left', posicaoPipe);

            $('.mario').css('animation', 'none');
            $('.mario').css('bottom', posicaoMario);

            $('.mario').attr('src', 'img/game-over.png');
            $('.mario').css('width', '75px');
            $('.mario').css('margin-left', '50px');

            clearInterval(loop);
            clearInterval(loopPontuacao);

        } 
    }, 10);
    }

$(document).ready(function(){

    $(document).keydown(function (event) {
        $('.mario').addClass('jump');
        jumpTimeout = setTimeout(function () {
            $('.mario').removeClass('jump');
        }, 500);
    });

    pontuacao = 1;
    jogoLoop();

    $('.reiniciar').click(function(e){
        pontuacao = 1;
        e.preventDefault();
        $('.pontuacao').text('0');
        $('.mario').attr('src', 'img/mario.gif');
        $('.mario').removeAttr('style');
        $('.pipe').removeAttr('style');

        clearInterval(loop); 
        clearInterval(loopPontuacao);
        
        jogoLoop();
    })
    
})
