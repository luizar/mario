var loop;
var loopPontuacao;
var jumpTimeout;
var pontuacao = 0;

/**
 * Função para obter o nível de dificuldade do jogo
 * 
 * @returns int dificuldade
 */
function getNivel(){
    var nivel = $("input[name='dificuldade']:checked").val();
    var dificuldade = (nivel == 0) ? 1500 : 1300;
    return dificuldade;
}

/**
 * Função que executa o jogo
 */
function jogoLoop() {

    // Obtem o nível de dificuldade do jogo
    var dificuldade = getNivel();

    // Adiciona a animação ao pipe
    $('.pipe').css('animation', 'pipe-animation '+dificuldade+'ms infinite linear');

    // Loop para somar a pontuação
    loopPontuacao = setInterval(function(){
        pontuacao = pontuacao+1;
        $('.pontuacao').text(pontuacao);
    }, dificuldade);

    // Loop para verificar as posições dos elementos
    loop = setInterval(function(){
        const posicaoPipe = +$('.pipe').offset().left;
        const posicaoMario = + $('.mario').css('bottom').replace('px', '');

        // Caso o pipe esteja encostando no mario
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

            // Ajusta o botão de reinício
            $('.reiniciar').text('Reiniciar');
            $('.reiniciar').removeAttr('disabled');

        } 
    }, 10);
 }

$(document).ready(function(){

    // Evento de keydown para fazer o jump do mario
    $(document).keydown(function (event) {
        event.preventDefault();
        $('.mario').addClass('jump');
        jumpTimeout = setTimeout(function () {
            $('.mario').removeClass('jump');
        }, 500);
    });

    $('.reiniciar').click(function(event){
        pontuacao = 0;
        event.preventDefault();

        // Desativa o botão
        $('.reiniciar').attr('disabled', 'disabled');

        // Zera a pontuação
        $('.pontuacao').text('0');

        $('.mario').attr('src', 'img/mario.gif');        
        $('.mario').removeAttr('style');
        $('.pipe').removeAttr('style');

        clearInterval(loop); 
        clearInterval(loopPontuacao);
        
        jogoLoop();
    })
    
})