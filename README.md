@Author: Lucas Eduardo Pedroso
# Aula criada para ensinar novos alunos a entender Promises
# SummerJob

# JavaScript Promises


## O que vamos aprender?
  * Você vai aprender a utilizar promises para fazer chamadas assíncronas em API's de terceiros, utilizando o fetch().
  
  * Quais são os estágios de uma promise e como retornar um resultado ou um erro.
  
  * Entenderá o .then() e como encadeá-los, o .catch() e .finally().


---
## Você será capaz de:
 * Fazer chamadas assíncronas em API's de terceiros com o fetch().
 
 * Encadear vários .then() e como ele funciona.
 
 * Tratar possíveis erros no .catch() caso aconteçam.


---
## Por que isso é importante?
  As Promises vieram para resolver problemas das callbacks e podem ser usadas para fazer requisições assíncronas a uma URL (endereço de um site) sem travar o seu código. Imagine que você precisasse esperar seu código ir até algum site, aguardar ele responder com algum dado e só depois continuasse a ler seu código javascript. Vale lembrar que algumas requisições podem demorar alguns segundos ou mais, portanto, sua página ficaria um pouco mais lenta, não é verdade?!
  
  Outro cenário seria o acesso a alguma informação em um banco de dados e esse procedimento não deveria travar sua aplicação enquanto busca essas informações, para isso você vai usar uma função assíncrona.
  
  Na sua carreira como pessoa desenvolvedora, você realizará esse procedimento muitas vezes e vai precisar acessar API's de terceiros e banco de dados muitas vezes, o que torna a compreensão de códigos assíncronos algo muito importante.


# Conteúdos
---
## Promises
 Fazendo uma abstração de uma Promise, ela é como um acordo pessoal, igual ao exemplo abaixo.
 Ex: Quando você promete que vai começar a fazer exercícios físicos diaramente, a cada dia que você fizer você terá um return ('Fiz os exercícios diários') e o dia que você não fizer você terá um return ('Não fiz os exercícios diários'). Sendo assim, quando você faz a promessa no começo do dia, nunca vai saber se vai dar certo ou errado, pode surgir imprevistos e você não ter tempo para fazer seus exercícios diários.

 Em promises temos um método próprio para quando algo der certo ou quando der errado, sendo eles resolve() e reject() respectivamente. Pense neles como os returns citados acima.
```javascript
 const minhaPromessa = Promise.resolve('Minha promessa');
 ```
        
 Promise.resolve() retorna uma Promise, assim como o .then() e o .catch(), sendo assim você pode encadeá-los e fazer ações com os dados.

### Uma Promise tem 3 estados:

 pending (pendente): Estado inicial, ainda não foi resolvida e nem rejeitada.
 
 fulfilled (resolvida): Quando ocorreu tudo bem e foi resolvida ( resolve(valor) ).
 
 rejected (rejeitada):  Quando houve um erro e foi rejeitada ( reject(valor) ).
```javascript
 const novaPromessa = new Promise((resolve, reject) => { /* Ex: buscar dados em uma API com fetch(), veremos isto daqui a pouco. */ });
 // Retorna uma Promise, no estado pendente, até que seja resolvida ou rejeitada.
 
 const promessaResolvida = Promise.resolve('Resolvida');
 // Retorna uma Promise resolvida, no estado fulfilled.
 
 const promessaRejeitada = Promise.reject('Rejeitada');
 // Retorna uma Promise rejeitada, no estado reject.
```
## Uma breve introdução ao mundo de Promises:

 `Promise.resolve(valor)` = Quando você quer transformar um valor qualquer em uma Promise já resolvida.

 `Promise.reject(valor)` = Quando você quer transformar um valor qualquer em uma Promise que foi rejeitada por algum motivo.
 
 `Promise.all([promises])` = 
 
 `Promise.race([promises])` =

 `.then(funcaoDeCallback)` = Quando você tem uma Promise resolvida e quer fazer algo com ela, como: modificar os dados, colocar na sua tela, etc.
 
 **Obs**: A função de callback do .then() tem que receber 1 parâmetro, sendo ele o retorno da última Promise resolvida.

 `.catch(funcaoDeCallback)` = Quando ocorre algum erro em qualquer Promise acima deste .catch() (Lembrando que resolve, reject e then retornam Promises), o código irá para o .catch() e você pode usá-lo para tratar erros.
 
 **Obs**: A função de callback do .catch() tem que receber 1 parâmetro, sendo ele o erro que aconteceu no seu reject do new Promise ou caso aconteça algum erro nos .then() acima dele.
 
 `.finally(funcaoDeCallback)` = Quando você precisa fazer algo, independente se a Promise for resolvida ou rejeitada. Ex: Fechar a conexão com um banco de dados.
 
 **Obs**: A função de callback do .finally() não recebe nenhum parâmetro, pois nunca se sabe se vai ser resolvida ou rejeitada, ela apenas faz uma ação (Retorno void).

 `new Promise(funcaoDeCallback)` = Quando você quer criar uma promise que ainda não foi resolvida nem rejeitada.
 
 **Obs**: A função de callback do new Promise(), tem que receber 2 parâmetros, sendo o primeiro para quando ela for resolvida (Tudo ocorreu bem) e o segundo para quando for rejeitada (Algo deu errado).


#### Vamos a outro exemplo usando uma abstração da vida real:

 Sua mãe te pede para ir ao banco pagar uma conta, mas isso precisa ser feito em 50 minutos, pois o banco está para fechar e caso não consiga chegar a tempo ela pagará juros. Você terá que chamar o Uber e ir ao banco no tempo pedido, mas o que poderia dar de errado, né?! Humm, vai que aconteça um engarrafamento, um pneu fura, etc.
 Você só sabe que irá, mas não sabe se vai conseguir chegar a tempo ou não, é aí que entra a Promise e seus callbacks (deuCerto, deuErrado), que por convenção é `(resolve, reject)`.
 
 O detalhe é que você começou a fazer o almoço e colocou o feijão e o arroz no fogo, e isso não pode parar enquanto você vai ao banco para sua mãe. Você pede a ela que cuide das panelas enquanto tentará ir ao banco antes que feche.
 
 Para compreender melhor, se atente aos comentários.
```javascript
let almoco = { // O objeto almoco será modificado no decorrer da Promise.
  feijao: 'Cozinhando',
  arroz: 'Cozinhando',
  almocoPronto: false,
};

const chegueiAntesDeFechar = (consegui) => { // Função para simular se houve ou não imprevisto.
  return consegui;
};

const favorParaMae = new Promise((deuCerto, deuErrado) => {  // Por convenção usa-se o nome resolve e reject nos parâmetros.
  
  if (chegueiAntesDeFechar(true)){ // Troque o true para false para simular um erro e observe o resultado.

    setTimeout(() => { // Utilizaremos o setTimeout para simular alguma requisição demorada, neste caso serão 5 segundos.
    
      /* return */ deuCerto('Deu certo mãe'); // Note que você "retornou que deuCerto()", mas isso não interrompe o fluxo do código.
      
      minhaMaeContinuouFazendoOAlmocoETerminou(); // Essa linha e qualquer outra abaixo seria lida porque não houve um return na linha acima.
      
      // Para interromper o fluxo do código no momento que deu certo, descomente o return dele, isso se chama early-return.
    }, 5000);

  } else {

    setTimeout(() => {
      deuErrado('Deu errado mãe, ocorreu um imprevisto e não vou chegar a tempo');
      minhaMaeContinuouFazendoOAlmocoETerminou();
    }, 5000);

  }

}).then((missaoDadaMissaoCumprida) => { // Esse .then() só será executado caso "deuCerto()".

  return `${missaoDadaMissaoCumprida}, agora a senhora pode ficar tranquila que não pagará juros.`;

}).catch((aconteceuUmImprevisto) => {  // Esse .catch() só será executado caso "deuErrado()" ou se no .then() acima ocorrer algum erro.

  console.error(aconteceuUmImprevisto, ', sinto muito mãe, havia um engarrafamento e não pude chegar a tempo no banco, haverá um juros na conta.');

}).finally(() => { // .finally() sempre será executado, não importa se a Promise foi resolvida ou rejeitada.
  console.table(almoco);
});

const minhaMaeContinuouFazendoOAlmocoETerminou = () => {
  almoco =  {
    feijao: 'Pronto',
    arroz: 'Pronto',
    almocoPronto: true,
  };
};

/* almoco = { // Descomente essa linha e veja que almoco foi modificado enquanto sua Promise estava descobrindo se iria ser resolvida ou rejeitada.
 assincrono: true,
}; */
```
Observe que a função `minhaMaeContinuouFazendoOAlmocoETerminou()` está declarada após a chamada de `const favorParaMae`, ainda assim 
foram executadas dentro da Promise.

Quando seu script chega em um código assíncrono, igual uma Promise, ele a coloca em uma thread diferente e continua lendo o resto do código síncrono. Ao final do código síncrono ele coloca o resultado das Promises de volta a thread síncrona.

## Entendendo como usar o .then() um abaixo do outro.
### Vamos ao exemplo de uma Promise resolvida com um .then().

```javascript
        Promise.resolve('Promessa resolvida')
          .then((dados) => console.log(dados));  // Irá imprimir 'Promessa resolvida' no console do navegador.
```
 O `.then((dados) => {...})` recebe uma função de callback. Tenha em mente que o parâmetro (dados) passado para essa callback vem do retorno de `resolve('Promessa resolvida')`
        
 Caso você tente encadear outro .then() você não terá o `dados`, mas por quê? Porque no .then() do exemplo acima você não retorna nada, apenas faz uma ação (console.log).
 Se você quer encadear outro `.then()` neste, você precisa retornar o `dados`, podendo modificá-lo ou não antes de retorná-lo.
```javascript
        Promise.resolve('Promessa resolvida')
          .then((dados) => {
            console.log(dados);
            return `${dados}, e modificada dentro do then`;
          }).then((dados) => console.log(dados));
```
 Sempre que você quiser usar outro .then(), o anterior precisa retornar algo.


 Observe o exemplo que será explicado abaixo com detalhes. Não se preocupe com o .catch() e .finally() por enquanto.
 Para compreender, se atente aos comentários.
```javascript
        const promessaResolvida = Promise.resolve('Fiz os exercícios diários')
          .then((dados) => { // O parametro "dados" passado na callback do .then() contém o que foi retornado no resolve().
            const dadosModificados = `${dados} e estou com disposição`;
            console.log(dadosModificados);
            return dadosModificados;
          })
          .then((dados) => { // O "dados" agora tem o valor retornado do .then() acima, dadosModificado
            const dadosModificados2 = `${dados} , minha saúde está melhorando.`;
            console.log(dadosModificados2);
            return dadosModificados2;
          })
          .catch((erro) => {
            // Aqui seria o código para tratamento de algum erro que aconteça nos dois .then() anteriores.
            console.error(erro, 'e estou me sentido sem disposição. Algo deu errado.');
          })
          .then((dados) => { // O "dados" agora tem o valor retornado do .then() acima, dadosModificado2. Caso aconteça algum erro no dois .then() acima, "dados" terá o valor retornado pelo .catch(), neste caso é "undefined", porque você não retornou nada.
            const dadosModificados3 = `${dados} Depois do .catch() posso continuar usando o .then()!`;
            console.log(dadosModificados3);
            return dadosModificados3;
          })
          .finally(() => { console.log('Resolve - Isso acontece de qualquer forma, dando erro ou não'); });
```
 A constante promessaResolvida contém uma Promise que já está no estado fulfilled (resolvida), portanto posso usar o .then() para fazer algo com os dados retornados pelo resolve().
 
 Note que temos 2 .then(), 1 .catch(), 1 .then() e 1 .finally(). Os três .then() serão executados e mostrados no console do seu navegador porque não houve nenhum erro na execução deles.
 
 Caso houvesse um erro em algum dos dois primeiros .then(), o terceiro .then() seria uma continuação do .catch(). Ex: Aconteceu algum erro nos dois primeiros, você conhece os erros possíveis, você trata eles (faz alguma ação de acordo com o erro) e pode continuar sua Promise retornando algum valor.
        
 Repare que todos os .then() retornam algum valor, assim posso encadeá-los, fazendo em cada um alguma lógica necessária e repassando o novo valor pelo return.
 
--- 
## Fetch API
Você vai aprender a utilizar o fecth() e o método .json() da Fetch API dos navegadores. Leia com calma o código abaixo, ele será explicado depois. Para compreender, se atente aos comentários.
Por ser um assunto muito extenso, terá vários links nos Recursos Adicionais. Foque apenas no fetch() e .json() por enquanto, eles serão usados nos próximos projetos.

```javascript
const url = 'https://viacep.com.br/ws/01001000/json/';
const urlComErro = 'https://viacep.com.br/ws/01001000erro/json/';

const viaCep = () => {
  return fetch(url) // fetch() devolve uma Promise.
    .then((response) => response.json()) // .json() devolve um Promise, por isso podemos encadear outro .then() e fazer alguma operação com os dados.

    .then((data) => { // O parâmetro "data" tem valor retornado do primeiro .then() com o JSON extraído da reposta (response) do fetch().
      adicionarEndereco(data);
      // return data; // Experimente descomentar o "return data" do começo da linha e veja que no .then() abaixo o valor é retornado corretamente no console do navegador.

    }) // Neste .then() você não retornou nada, então no próximo você não terá acesso a nenhuma informação.
    
    .then((data) => console.log('Verificando o valor de data:', data))  // "data" é undefined porque não houve retorno no .then() acima.
    
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

Coloque "https://viacep.com.br/ws/01001000/json/" no seu navegador e veja o formato de um arquivo JSON.

No primeiro .then() pegamos a resposta dessa requisição e usamos o .json() para extrair o JSON da resposta (response) e converter para um objeto, assim podemos manipulá-lo pelo javascript.

No segundo .then() usamos o objeto javascript e adicionamos o endereço no index.html usando a função `adicionarEndereco` que já faz a desestruturação de `data` pegando apenas `{ logradouro, bairro, localidade, uf }`.

No terceiro .then() estamos apenas imprimindo no console do navegador "Verificando o valor de data: undefined" para reforçar que caso você não retorne nada no .then() anterior o parâmetro da callback do próximo .then() será undefined.

No .catch(), caso aconteça algum erro no fetch() ou em algum dos três .then() acima, estaríamos imprimindo o erro no console do navegador.


Crie uma pasta "fetch-api" com os arquivos index.html e script.js, copie e cole os códigos abaixo.

index.html
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
  </main>
  <script src="script.js"></script>
</body>
</html>
```
script.js
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
Agora faça o teste com a url de erro e observe o console do navegador.

Você agora aprenderá como pegar uma Promise e usá-la em outro lugar de seu código usando o .then() e .catch() posteriormente.

Você verá a explicação nos comentários do arquivo script.js

Copie e cole os códigos abaixo:

index.html
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

script.js ( Para compreender se atente aos comentários. )
```javascript
const viaCep = (cep) => { // Você pode retornar um Promise e continuar usando o .then() em outro local do seu script. Observe na função adicionarEndereco()
  return fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then((response) => response.json());
};

const pegarInputValue = (query) => document.querySelector(query).value;
const setarInputValue = (query, value) => document.querySelector(query).value = value;

const setarInputsValues = ({ logradouro, bairro, localidade, uf }) => { // A função que será passada de callback para o .then() de adicionarEndereco().
  setarInputValue('#input-logradouro', logradouro);
  setarInputValue('#input-bairro', bairro);
  setarInputValue('#input-localidade', localidade);
  setarInputValue('#input-uf', uf);
};

const adicionarEndereco = () => {
  document.querySelector('#error').textContent = '';
  const cep = pegarInputValue('#input-viacep');
  viaCep(cep) // Veja que aqui você chama a função viaCep e continuar usando o .then(), o .catch() e .finally().
    .then(setarInputsValues)
    .catch((erro) => {
      console.error('Ocorreu um erro:', erro);
      document.querySelector('#error').textContent = 'Digite um CEP válido e tente novamente.';
    });
};

window.onload = () => {
  document.querySelector('#btn-viacep').addEventListener('click', adicionarEndereco);
};
```
Digite um cep errado (Ex: 010010001) e observe que o .catch() chamado na função adicionarEndereco() é executado.


---
## async/await com try/catch/finally
 
 O async/await veio para facilitar o trabalho com Promises, tornando menos verboso e de fácil leitura.
 
 Se você coloca o `await` antes de um código assíncrono, ele para a execução do script síncrono até que seu código assíncrono seja executado. Para usar o `await` você precisa de uma função assíncrona, você faz isso colocando antes dela um `async`.
 
 Ex: `async function xablau() { ... }` ou `const xablau = async () => { ... }`
 

### Uma breve introdução a async/await usando try/catch/finally

Você observará que é o mesmo conceito da Promise, apenas com uma sintaxe diferente. Para compreender melhor, se atente aos comentários.

```javascript
const funcaoAssincrona = async () => { // Você colocará o async antes da função para transformá-la em uma função assíncrona.

  try { // Dentro do try é onde você chamará seu código assíncrono com o await.

    const forms = await fetch('urlForms'); // O await faz com que o código pare nessa linha até que fetch() retorne uma resposta.
    const xablau = await forms.json(); // Essa linha só será executada após a linha acima estar com a resposta do fetch().

    if (xablau.todosResponderamForms === true) {
      console.log('Uhullll #goTrybe');
    } else {
      throw new Error('Precisamos responder o forms tribo.'); // Isso será explicado na aula ao vivo.
    }

  } catch (error) { // Caso aconteça algum erro dentro do try, o código irá direto para o catch.

    console.error(error);

  } finally { // O que estiver aqui dentro será executado de qualquer forma.
  
    console.log('Hoje você responderá o forms. Combinado?!')
    
  }

}
```


 Agora você verá o código do ViaCep refatorado com async e await:
 ```javascript
 const viaCep = async (cep) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return response.json(); // Não é necessário colocar o await nesta linha porque o return já espera a resposta da Promise.
};

const pegarInputValue = (query) => document.querySelector(query).value;
const setarInputValue = (query, value) => document.querySelector(query).value = value;

const setarInputsValues = ({ logradouro, bairro, localidade, uf }) => {
  setarInputValue('#input-logradouro', logradouro);
  setarInputValue('#input-bairro', bairro);
  setarInputValue('#input-localidade', localidade);
  setarInputValue('#input-uf', uf);
};

const adicionarEndereco = async () => {
  document.querySelector('#error').textContent = '';
  const cep = pegarInputValue('#input-viacep');

  try {
    const dataViaCep = await viaCep(cep);
    setarInputsValues(dataViaCep);
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    document.querySelector('#error').textContent = 'Digite um CEP válido e tente novamente.';
  }
};

window.onload = () => {
  document.querySelector('#btn-viacep').addEventListener('click', adicionarEndereco);
};
 ```
### Agora faça um exercícios de fixação.
  Você tem o código viaCep no formato de Promise e async/await, para reforçar o aprendizado refatore o código de Promise para async/await e o de async/await para Promise. (Caso você fique com dúvida, releia os exemplos.)
 
---
# Vamos fazer juntos!
  Você leu os textos e os recursos adicionais?! Então vamos para a aula ao vivo! Ela será dividida em dois momentos: primeiro, vamos discutir os exemplos comentados e tirar dúvidas. Depois, teremos uma explicação geral sobre Promises e `throw new Error()` onde faremos um exemplo de uso de Promises em comunicação com uma API e também será explicado sobre a thread síncrona e assíncrona, tirando dúvidas ao final.
Vamos para o Slack onde o link estará disponível.
  
---
# Exercícios
## Agora, a prática!
  Você irá criar uma Pokébola Digital.
  Ela irá buscar tanto pelo nome, quanto pelo id do Pokémon.
  Você irá implementar as funções `fetchPokeApi` e `addPokemon`. É muito importante que faça primeiro no formato de Promise e só depois refatore para async/await para praticar o conhecimento adquirido.

  1. Na função fetchPokeApi, utilize o fetch() para buscar no endereço da API "https://pokeapi.co/api/v2/pokemon/pikachu".
  2. Faça um .then() e extraia o json da resposta do fetch().
  3. Coloque um parâmetro na função fetchPokeApi.
  4. Troque o parâmetro do fetch() para string literals e coloque o parâmetro que acabou de criar na fetchPokeApi no lugar de Pikachu.
  5. No addPokemon, chame a função fetchPokeApi passando a constante pokemon como argumento.
  6. Encadeie um .then() e use a função setPokemonInfos.
  7. Encadeie um .catch() e, caso aconteça um erro, faça ele imprimir um console.error() passando o erro como argumento.
  8. Ainda no .catch(), coloque na tag span com id="error" a mensangem "Digite o nome de um Pokémon ou um número válido e tente novamente."
  9. Faça uma cópia do seu arquivo .js e refatore para usar async/await.
  

## Bônus
  Você irá implementar todas as funções necessárias no arquivo script.js.
  
  1. Crie uma função assíncrona que faz a requisição a uma url passada por parâmetro.
  2. Na função criada anteriormente, retorne a resposta usando a função .json().
  3. Crie uma função que adiciona o endereço de uma imagem no src da tag com id="animal-image".
  4. Crie uma função para buscar a imagem de um gato na api "https://aws.random.cat/meow".
  5. Crie uma função para buscar a imagem de uma raposa na api "https://randomfox.ca/floof/".
  6. Crie uma função para buscar a imagem de um cachorro na api "https://random.dog/woof.json".
  7.  Na função que busca a imagem do cachorro, faça uma verificação se é um arquivo .jpg, caso não seja, retorna um erro com a mensagem "O arquivo não é .jpg"
  8.  Adiciona o EventListener em cada botão correspondente ao nome do animal para que exiba a sua respectiva foto.

---
# Recursos adicionais
https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data-pt
https://www.braziljs.org/p/fetch-api-e-o-javascript
