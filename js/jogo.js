var jogadorAtual = null;
var matriz = ["a", "b", "c"];

matriz["a"] = ["", "", ""];
matriz["b"] = ["", "", ""];
matriz["c"] = ["", "", ""];

$(document).ready(function() {

    setarJogadorAtual();

    $("#iniciarJogo").click(function() {
        iniciarJogo();
    });

    $("#jogador1").keyup(function() {
        verificarNomeJogador1();
    });

    $("#jogador2").keyup(function() {
        verificarNomeJogador2();
    });


    function iniciarJogo() {
        if (verificarNomes()) {
            $("#pagina_inicial").hide();
            $("#palco_jogo").show();
            $("#nomeJ1").text($("#jogador1").val());
            $("#nomeJ2").text($("#jogador2").val());
            
            $(".jogada").click(function() {

                var id_campo = this.id;

                var vect = id_campo.split("-");

                var letra = vect[0];
                var numero = vect[1];
     
                $("#"+id_campo).html(retornarHtml());
                matriz[letra][numero] = jogadorAtual;
                $("#"+id_campo).off();
                verificarVencedor();
                setarJogadorAtual();
            });
        }
    }

    function verificarNomes() {

        if (verificarNomeJogador1() + verificarNomeJogador2() > 1){
            return true;
        }
        
        return false;
    }


    function verificarNomeJogador1() {

        if ($("#jogador1").val() == "") {
            $("#erro_jogador1").show();
            return 0;
        } 

            $("#erro_jogador1").hide();
            return 1;
    }

    function verificarNomeJogador2() {

        if ($("#jogador2").val() == "") {
            $("#erro_jogador2").show();
            return 0;
        } 
            $("#erro_jogador2").hide();
            return 1;
    }

    function setarJogadorAtual() {
        if (jogadorAtual == "" || jogadorAtual == null || jogadorAtual == -1) {
            jogadorAtual = 1;
        } else if (jogadorAtual != -1) {
            jogadorAtual = -1;
        }

    }

    function retornarHtml() {
        if (jogadorAtual == 1) {
            return "<img src='imagens/marcacao_1.png'>";
        }

        return "<img src='imagens/marcacao_2.png'>";
    }

    function verificarVencedor() {

        var soma = 0;

        // Linha a
        for (var i=0; i<=2; i++) {
            soma += matriz["a"][i];
        }

        (soma == 3 || soma == -3) ? ganhador() : soma = 0;

        // Linha b
        for (var i=0; i<=2; i++) {
            soma += matriz["b"][i];
        }

        (soma == 3 || soma == -3) ? ganhador() : soma = 0;

        // Linha c
        for (var i=0; i<=2; i++) {
            soma += matriz["c"][i];
        }

        (soma == 3 || soma == -3) ? ganhador() : soma = 0;

        // coluna 0
        soma = matriz["a"][0] + matriz["b"][0] + matriz["c"][0];

        (soma == 3 || soma == -3) ? ganhador() : soma = 0;

        // coluna 1
        soma = matriz["a"][1] + matriz["b"][1] + matriz["c"][1];

        (soma == 3 || soma == -3) ? ganhador() : soma = 0;

        // coluna 2
        soma = matriz["a"][2] + matriz["b"][2] + matriz["c"][2];

        (soma == 3 || soma == -3) ? ganhador() : soma = 0;

         // diagonal principal
         soma = matriz["a"][0] + matriz["b"][1] + matriz["c"][2];

         (soma == 3 || soma == -3) ? ganhador() : soma = 0;

         // diagonal secundária
         soma = matriz["a"][2] + matriz["b"][1] + matriz["c"][0];

         (soma == 3 || soma == -3) ? ganhador() : soma = 0;
    }

    function retornarNomeJogadorAtual() {
        if (jogadorAtual == 1) {
            return $("#nomeJ1").text();
        } 

        return $("#nomeJ2").text();
    }

    function ganhador() {
        alert("Parabéns, " + retornarNomeJogadorAtual() + "! Você venceu!");
        $(".jogada").off();
    }
});