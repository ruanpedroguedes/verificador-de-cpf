function ValidaCpf(cpf) {
    this.cpfInput = cpf; // Armazena a referência ao input do CPF
}

ValidaCpf.prototype.DeixaCpfLimpo = function () {
    this.cpf = this.cpfInput.value.toString().replace(/\D/g, ''); // Remove caracteres não numéricos
}

ValidaCpf.prototype.ListaCpfLimpo = function() {
    this.cpfArray = this.cpf.split('').map(Number); // Transforma a string em array de números
}

ValidaCpf.prototype.PrimeiraMultiplicacao = function() {
    this.multiplicadores = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    this.cpfArrayMultiplicado = this.cpfArray.slice(0, 9).map((num, index) => num * this.multiplicadores[index]);
}

ValidaCpf.prototype.PrimeiraSomaValores = function() {
    this.DeixaCpfLimpo();
    this.ListaCpfLimpo();
    this.PrimeiraMultiplicacao();
    const soma = this.cpfArrayMultiplicado.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return soma;
}

ValidaCpf.prototype.Teste01 = function() {
    const soma = this.PrimeiraSomaValores(); // Calcula a soma dos valores
    this.PrimeiraMultiplicacao();
    this.resulta01 = 11 - (soma % 11);
    if(this.resulta01 < 9){
       return this.resulta01; // Retorna o resultado sem alteração
    } else {
       return this.resulta01 = 0; // Retorna 0 se resulta01 for maior ou igual a 9
    }
}

ValidaCpf.prototype.Teste02 = function() {
    this.multiplicadores.unshift(11); // Adiciona 11 ao início do array
    let soma2 = this.cpfArray.slice(0, 10).reduce((accumulator, currentValue, index) => accumulator + (currentValue * this.multiplicadores[index]), 0);
    let resulta02 = 11 - (soma2 % 11);
    return (resulta02 > 9) ? 0 : resulta02;
}

ValidaCpf.prototype.TodosOsDigitosSaoIguais = function() {
    const primeiroDigito = this.cpf.charAt(0);
    return this.cpf.split('').every(digito => digito === primeiroDigito);
}

ValidaCpf.prototype.NullValor = function() {
    if(this.cpf === '') {
        document.getElementById('resultado').innerText = 'VOCÊ NÃO DIGITOU NADA';
    }
}

ValidaCpf.prototype.ValidaCPF = function() {
    this.DeixaCpfLimpo();
    this.NullValor()
    if (this.TodosOsDigitosSaoIguais()) {
        document.getElementById('resultado').innerText = "CPF inválido: todos os dígitos são iguais."; // Mensagem de CPF inválido caso todos os dígitos sejam iguais
        return false; // Retorna false indicando que o CPF é inválido
    }
    const digito01 = this.Teste01();
    const digito02 = this.Teste02();
    if (digito01 !== this.cpfArray[9] || digito02 !== this.cpfArray[10]) {
        document.getElementById('resultado').innerText = "CPF inválido: dígitos verificadores não correspondem."; // Mensagem de CPF inválido caso os dígitos verificadores não correspondam
        return false; // Retorna false indicando que o CPF é inválido
    }
    document.getElementById('resultado').innerText = "CPF válido."; // Mensagem de CPF válido
    return true; // Retorna true indicando que o CPF é válido
}

document.querySelector('button').addEventListener('click', function() {
    const cpfInput = document.querySelector('input[type="text"]');
    const novoCpf = new ValidaCpf(cpfInput);
    novoCpf.ValidaCPF();
});
