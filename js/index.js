$(document).ready(function () {

    $('#cep').focus();
    $('#cep').mask('99999-999');


    /**
     * Quando sair do campo cep, busca os dados do endereço na api da ViaCep
     */
    $('#cep').on('blur', async function() {

        setErroCampoCep(false);

        let cep = $('#cep').val().replace('-', '');

        if (cep.length == 0) return;

        if (cep.length < 8) {
            setErroCampoCep();
            return;
        }

        let dados = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (dados.hasOwnProperty('data') && dados.data.hasOwnProperty('erro')) {
            setErroCampoCep();
            return;
        }

        $('#logradouro').val(dados.data.logradouro);
        $('#bairro').val(dados.data.bairro);
        $('#localidade').val(dados.data.localidade);
        $('#uf').val(dados.data.uf);
        $('#ibge').val(dados.data.ibge);
    });


    /**
     * Define se deve mostrar ou esconder a informação de "CEP inválido"
     * @param {*} mostrar 
     */
    function setErroCampoCep(mostrar = true) {
        if (mostrar) {
            $('.error').css('display', 'block');
            return;
        }

        $('.error').css('display', 'none');
    }

    /**
     * Limpa todos os campos da tela
     */
    $('#limpar').on('click', function() {
        $('#cep').val("");
        $('#logradouro').val("");
        $('#bairro').val("");
        $('#localidade').val("");
        $('#uf').val("");
        $('#ibge').val("");
        setErroCampoCep(false);
    });
});