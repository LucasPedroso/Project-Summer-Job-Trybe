# SummerJob

# JavaScript Promises


## O que vamos aprender?
  Você aprenderá a utilizar promises para fazer chamadas assíncronas em API's de terceiros, utilizando o fetch().
  
  Irá aprender quais são os estágios de uma promise e como retornar um resultado ou um erro.
  
  Entenderá o .then() e como encadeá-los, .catch() e .finally().


---
## Você será capaz de:
 Fazer chamadas assíncronas em API's de terceiros com fetch().
 
 Encadear vários .then() e entendê-los.
 
 Tratar erros caso aconteça.


---
## Por que isso é importante?
  As promises vieram para resolver problemas das callbacks e podem ser usadas para fazer requisições assíncronas a uma URL (endereço de um site) sem travar o seu código. Imagine que você tivesse que esperar seu código ir até algum site, esperar ele responder com algum dado e só depois continuasse a ler seu código javascript, lembrando que algumas requisições podem demorar alguns segundos ou mais, sua página ficaria um pouco mais lenta, não é verdade!?
  
  Outro cenário seria o acesso de alguma informação em um banco de dados e esse procedimento não pode travar sua aplicação enquanto busca informações em seu banco de dados, para isso você usará uma função assíncrona.
  
  Na sua carreira como pessoa desenvolvedora, você (realizara esse procedimento muitas vezes)precisará acessar API's de terceiros e banco de dados muitas vezes, o que torna a compreensão de códigos assíncronos (algo muito importante)uma necessidade.


# Conteúdos
---
## Promises
 Fazendo uma abstração de uma Promise, ela é como um acordo que você faz contigo.
 Ex: Quando você promete que vai começar a fazer exercícios físicos diaramente, a cada dia que você fizer você terá um return ('Fiz os exercícios diários') e o dia que você não fizer você terá um return ('Não fiz os exercícios diários'), sendo assim, quando você faz a promessa no começo do dia, nunca sabe se vai dar certo ou errado, pode surgir imprevistos e você não ter tempo para fazer seus exercícios diários.

 Em promises temos um método próprio para quando algo der certo ou quando der errado, sendo eles, resolve() e reject() respectivamente, pense neles como os return citados acima.
```javascript
 const minhaPromessa = Promise.resolve('Minha promessa');
 ```
        
 Promise.resolve() retorna uma promise, assim como .then() e .catch(), sendo assim você pode encadeá-los e fazer ações com os dados.

### Uma Promise tem 3 estados:

 pending (pendente): Estado inicial, que ainda não foi resolvida e nem rejeitada.
 
 fulfilled (resolvida): Quando ocorreu tudo bem e foi resolvida ( resolve(valor) )
 
 rejected (rejeitada):  Quando houve um erro e foi rejeitada ( reject(valor) )
```javascript
 const novaPromessa = new Promise((resolve, reject) => { /* Ex: buscar dados em uma API com fetch(), veremos isto daqui a pouco. */ });
 // retorna uma promise, no estado pendente, até que seja resolvida ou rejeitada.
 
 const promessaResolvida = Promise.resolve('Resolvida');
 // retorna uma promise resolvida, no estado fulfilled.
 
 const promessaRejeitada = Promise.reject('Rejeitada');
 // retorna uma promise rejeitada, no estado reject.
```
## Uma breve introdução ao mundo de Promises:

 `Promise.resolve(valor)` = Quando você quer transformar um valor qualquer em uma promise já resolvida.

 `Promise.reject(valor)` = Quando você quer transformar um valor qualquer em uma promise que foi rejeitada por algum motivo.

 `.then(funcaoDeCallback)` = Quando você tem uma promise resolvida e quer fazer algo com ela, modificar os dados, colocar na sua tela, etc.
 
 **Obs**: A função de callback de .then() tem que receber 1 parâmetro, sendo ele o retorno da última promise resolvida.

 `.catch(funcaoDeCallback)` = Quando ocorre algum erro em qualquer promise acima deste catch(Lembrando que resolve, reject e then retornam promises), o código irá para o .catch, é usado para tratar erros.
 
 **Obs**: A função de callback de .catch() tem que receber 1 parâmetro, sendo ele o erro que aconteceu no seu reject do new Promise ou caso aconteça algum erro nos .then acima dele.
 
 `.finally(funcaoDeCallback)` = Quando você precisa fazer algo independente se a promise for resolvida ou rejeitada. Ex: Fechar a conexão com um banco de dados.
 
 **Obs**: A função de callback de .finally() não recebe nenhum parâmetro, pois nunca se sabe se vai ser resolvida ou rejeitada. Ela apenas faz uma ação.(Retorno void)

 `new Promise(funcaoDeCallback)` = Quando você quer criar uma promise que ainda não foi resolvida nem rejeitada.
 
 **Obs**: A função de callback de new Promise(), tem que receber 2 parâmetros, sendo o primeiro para quando ela for resolvida(Tudo ocorreu bem) e o segundo para quando for rejeitada(Algo deu errado).


#### Vamos a outro exemplo usando uma abstração da vida real:

 Sua mãe te pede para ir ao banco para ela para pagar uma conta, mas isso precisa ser feito em 50 minutos, o banco está para fechar e caso não consiga chegar a tempo ela pagará juros. Você terá que chamar o Uber e ir ao banco no tempo pedido, mas o que pode dar de errado né? Humm, por acaso tem um engarrafamento, um pneu fura, etc. Você só sabe que irá, mas não sabe se vai conseguir chegar a tempo ou não, é aí que entra as Promises e seus callbacks "deuCerto, deuErrado", que por convenção é `(resolve, reject)`.
 O detalhe é que você começou a fazer o almoço e colocou o feijão e o arroz no fogo, e isso não pode parar enquanto você vai ao banco para sua mãe, você pede a ela que ela cuide das panelas enquanto tentará ir ao banco antes que feche.
 
```javascript
let almoco = { // O objeto almoco será modificado no decorrer da promise.
  feijao: 'Cozinhando',
  arroz: 'Cozinhando',
  almocoPronto: false,
};

const chegueiAntesDeFechar = (consegui) => { // Função para simular se houve ou não imprevisto.
  return consegui;
};

const favorParaMae = new Promise((deuCerto, deuErrado) => {  // por convenção usa-se o nome resolve e reject nos parâmetros.
  
  if (chegueiAntesDeFechar(true)){ // Troque o true para false para simular um erro e observe o resultado.

    setTimeout(() => { // Utilizaremos o setTimeout para simular alguma requisição demorada, neste caso serão 5 segundos.
    
      /* return */ deuCerto('Deu certo mãe'); // Note que você "retornou que deu certo", mas isso não interrompe o fluxo do código.
      
      minhaMaeContinuouFazendoOAlmocoETerminou(); // Essa linha e qualquer outra abaixo seria lida.
      
      // Para interromper o fluxo do código no momento que deu certo, descomente o return dele, isso se chama early-return.
    }, 5000);

  } else {

    setTimeout(() => {
      deuErrado('Deu Errado mãe, ocorreu um imprevisto e não vou chegar a tempo');
      minhaMaeContinuouFazendoOAlmocoETerminou();
    }, 5000);

  }

}).then((missaoDadaMissaoCumprida) => { // Esse .then só será executado caso "deuCerto()".

  return `${missaoDadaMissaoCumprida}, agora a senhora pode ficar tranquila que não pagará juros.`;

}).catch((aconteceuUmImprevisto) => {  // Esse catch só será executado caso "deuErrado()", ou se no .then() acima ocorrer algum erro.

  console.error(aconteceuUmImprevisto, ', sinto muito mãe, havia um engarrafamento e não pude chegar a tempo no banco, haverá um juros na conta.');

}).finally(() => { // finally sempre será executado, não importa se a promise foi resolvida ou rejeitada.
  console.table(almoco);
});

const minhaMaeContinuouFazendoOAlmocoETerminou = () => {
  almoco =  {
    feijao: 'Pronto',
    arroz: 'Pronto',
    almocoPronto: true,
  };
};

/* almoco = { // Descomente essa linha e veja que almoco foi modificado enquanto sua promise estava descobrindo se iria ser resolvida ou rejeitada.
 assincrono: true,
}; */
```
Observe que a função `minhaMaeContinuouFazendoOAlmocoETerminou()` estão declaradas após a chamada de `const favorParaMae`, ainda assim 
foram executadas dentro da promise.

Quando seu script chega em um código assíncrono, igual uma promise, ele coloca ela em uma thread diferente e continua lendo o resto do código síncrono. Ao final do código síncrono ele coloca o resultado das promises de volta a thread síncrona.

## Entendendo como usar o .then() um abaixo do outro.
### Vamos ao exemplo de uma Promise resolvida com um .then().

```javascript
        Promise.resolve('Promessa resolvida')
          .then((dados) => console.log(dados))  // Irá imprimir 'Promessa resolvida' no console do navegador.
```
 O `.then((dados) => {...})` recebe uma função de callback, tenha em mente que o parâmetro(dados) passado para essa callback vem do retorno de `resolve('Promessa resolvida')`
        
 Caso você tente encadear outro .then você não terá o `dados`, mas por que? Porquê no .then do exemplo acima você não retorna nada, apenas faz uma ação (console.log).
 Se você quer encadear outro `.then()` neste, você precisa retornar o `dados`, podendo modificá-lo ou não antes de retorná-lo.
```javascript
        Promise.resolve('Promessa resolvida')
          .then((dados) => {
            console.log(dados)
            return `${dados}, e modificada dentro do then`;
          }).then((dados) => console.log(dados))
```
 Sempre que você quiser usar outro .then(), o anterior precisa retornar algo.


 Observe o exemplo que será explicado abaixo com detalhes. Não se preocupe com o .catch() e .finally() por enquanto.
```javascript
        const promessaResolvida = Promise.resolve('Fiz os exercícios diários')
          .then((dados) => { // O parametro dados passado na callback do .then contém o que foi retornado no resolve().
            const dadosModificados = `${dados} e estou com disposição`;
            console.log(dadosModificados);
            return dadosModificados;
          })
          .then((dados) => { // O dados agora tem o valor retornado do then acima, dadosModificado
            const dadosModificados2 = `${dados} , minha saúde está melhorando.`;
            console.log(dadosModificados2);
            return dadosModificados2;
          })
          .catch((erro) => {
            // Aqui seria o código para tratamento de algum erro que aconteça nos dois then() anteriores.
            console.error(erro, 'e estou me sentido sem disposição. Algo deu errado.');
          })
          .then((dados) => { // O dados agora tem o valor retornado do then acima, dadosModificado2. Caso aconteça algum erro no dois then acima, dados terá o valor retornado pelo catch, neste caso é undefined, por quê não retornamos nada.
            const dadosModificados3 = `${dados} Depois do catch() posso continuar usando o then().`;
            console.log(dadosModificados3);
            return dadosModificados3;
          })
          .finally(() => { console.log('Resolve - Isso acontece de qualquer forma, dando erro ou não')});
```
 A constante promessaResolvida contém uma Promise que já está no estado fulfilled(resolvida), portanto, posso usar o .then() para fazer algo com os dados retornados pelo resolve().
 
 Note que temos 2 then(), 1 catch(), 1 then() e 1 finally(). Os três .then() serão executados e mostrados no console do seu navegador porquê não houve nenhum erro na execução deles.
 
 Caso houvesse um erro em algum dos dois primeiros .then(), o terceiro .then() seria uma continuação do .catch(). Ex: Aconteceu algum erro nos dois primeiros, você conhece os erros possíveis, você trata eles (faz alguma ação de acordo com o erro), e pode continuar sua promise retornando algum valor.
        
 Repare que todos .then() retornam algum valor, assim posso encadeá-los, fazendo em cada um alguma lógica necessária e repassando o novo valor pelo return.
 
--- 
## Fetch API
Você aprenderá utilizar o fecth() e o método .json(), da Fetch API dos navegadores, leia com calma o código abaixo, será explicado depois. Leia os comentários do código.
Por ser um assunto muito extenso, terá vários links nos Recursos Adicionais, foque apenas no fetch() e .json() por enquanto, será usado nos próximos projetos.

```javascript
const url = 'https://viacep.com.br/ws/01001000/json/';
const urlComErro = 'https://viacep.com.br/ws/01001000erro/json/';

const viaCep = () => {
  return fetch(url) // fetch() devolve uma promise.
    .then((response) => response.json()) // .json() devolve um promise, por isso podemos encadear outro .then() e fazer alguma operação com os dados.

    .then((data) => { // O parâmetro data tem valor retornado do primeiro .then() com o JSON extraído da reposta(response) do fetch.
      adicionarEndereco(data);
      // return data; // Experimente descomentar o return data do começo da linha, e veja que no then abaixo o valor é retornado corretamente no console do navegador.

    }) // Neste then, você não retornou nada, então no próximo, você não terá acesso a nenhuma informação.
    
    .then((data) => console.log('Verificando o valor de data:', data))  // data é undefined porquê não houve retorno no .then() acima.
    
    .catch((error) => console.error('Aconteceu um erro:', error)); // Experimente trocar para o urlComErro no fetch().
}

viaCep();

const adicionarEndereco = ({ logradouro, bairro, localidade, uf }) => {
  const cep = document.createElement('p');
  cep.innerText = `Rua: ${logradouro}, ${bairro}, ${localidade} - ${uf}`;
  const main = document.querySelector('#main-promises');
  main.appendChild(cep);
};
```

O fetch('https://viacep.com.br/ws/01001000/json/') vai até o endereço passado como parâmetro que neste caso devolve um arquivo no formato JSON.

Coloque https://viacep.com.br/ws/01001000/json/ no seu navegador e veja o formato de um arquivo JSON.

No primeiro `.then()` pegamos a resposta dessa requisição e usamos o `.json()` para extrair o JSON da resposta(response) e converter para um objeto, assim podemos manipulá-lo pelo javascript.

No segundo .then() usamos o objeto javascript e adicionamos o endereço no index.html usando a função `adicionarEndereco` que já faz a desestruturação de `data` pegando apenas `{ logradouro, bairro, localidade, uf }`.

No terceiro .then() estamos apenas imprimindo no console do navegador 'Verificando o valor de data: undefined para reforçar que caso você não retorne nada no .then() anterior o parâmetro da callback do próximo .then() será undefined.

No .catch(), caso aconteça algum erro no fetch() ou em algum dos três .then() acima, estaríamos imprimindo o erro no console do navegador.


Crie uma pasta "fetch-api" com os arquivos index.html e script.js, copie e cole os códigos abaixo.
```html5
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Aprendendo Promises, Fetch API e Async/Await</title>
</head>
<body>
  <header>
    <h1>Aprendendo Promises, Fetch API e Async/Await</h1>
  </header>
  <main id="main-promises">
  </main>
  <script src="script.js"></script>
</body>
</html>
```

```javascript
const url = 'https://viacep.com.br/ws/01001000/json/';
const urlComErro = 'https://viacep.com.br/ws/01001000erro/json/';

const viaCep = () => {
  return fetch(url) // fetch() devolve uma promise.
    .then((response) => response.json())
    .then((data) => {
      adicionarEndereco(data);
      // return data;
    })    
    .then((data) => console.log('Verificando o valor de data:', data))
    .catch((error) => console.error('Aconteceu um erro:', error));
};

viaCep();

const adicionarEndereco = ({ logradouro, bairro, localidade, uf }) => {
  const cep = document.createElement('p');
  cep.innerText = `Rua: ${logradouro}, ${bairro}, ${localidade} - ${uf}`;
  const main = document.querySelector('#main-promises');
  main.appendChild(cep);
};
```
Agora faça o teste com a url de erro e observer o console do navegador.

Observe o código abaixo refatorado para buscar um cep dinamicamente.

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Aprendendo Promises, Fetch API e Async/Await</title>
</head>
<body>
  <header>
    <h1>Aprendendo Promises, Fetch API e Async/Await</h1>
  </header>
  <main id="main-promises">

    <div class="input-line">
      <span id="error" class="error"></span>
    </div>
    <div class="input-line">
      <label for="input-viacep">CEP: </label>
      <input id="input-viacep" name="cep" type="text">
      <button id="btn-viacep">Buscar CEP</button>
    </div>

    <div class="input-line">
      <label for="input-logradouro">Logradouro: </label>
      <input id="input-logradouro" name="logradouro" type="text" />
    </div>

    <div class="input-line">
      <label for="input-bairro">Bairro: </label>
      <input id="input-bairro" name="bairro" type="text" />
    </div>

    <div class="input-line">
      <label for="input-localidade">Cidade: </label>
      <input id="input-localidade" name="localidade" type="text" />
    </div>

    <div class="input-line">
      <label for="input-uf">UF: </label>
      <input id="input-uf" name="uf" type="text" />
    </div>

  </main>
  <footer>
  </footer>
  <script src="script.js"></script>
</body>
</html>
```
```javascript
const viaCep = (cep) => {
  return fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then((response) => response.json());
};

const getInputValue = (query) => document.querySelector(query).value;
const setInputValue = (query, value) => document.querySelector(query).value = value;

const addAddress = () => {
  document.querySelector('#error').textContent = '';
  const cep = getInputValue('#input-viacep');
  viaCep(cep)
    .then(({ logradouro, bairro, localidade, uf }) => {
      setInputValue('#input-logradouro', logradouro);
      setInputValue('#input-bairro', bairro);
      setInputValue('#input-localidade', localidade);
      setInputValue('#input-uf', uf);
    })
    .catch((error) => {
      console.error('Ocorreu um erro:', error);
      document.querySelector('#error').textContent = 'Digite um CEP válido e tente novamente.';
    });
};

window.onload = () => {
  document.querySelector('#btn-viacep').addEventListener('click', addAddress);
};
```




---
## `async` e `await`
 
 O async/await veio para facilitar o trabalho com promises, vamos refatorar o código do ViaCep:
 ```javasript

```
Recapitulando

# Vamos fazer juntos!
  Leu os textos?! Respondeu e discutiu as perguntas? Vamos para a aula ao vivo, então! Ela será dividida em dois momentos: primeiro, vamos discutir os exercícios de fixação e tirar dúvidas. Chegue na aula com os exercícios respondidos, hein? Depois, teremos uma aula expositiva onde faremos um exemplo de uso de Promises em comunicação com uma API , tirando dúvidas ao final.
Vamos para o Slack, onde o link estará disponível.
  

  Exercícios
  Agora, a prática
  Bonus

  Recursos adicionais
  Links para recursos adicionais
