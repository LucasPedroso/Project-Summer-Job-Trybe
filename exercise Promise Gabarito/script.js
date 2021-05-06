const fetchPokeApi = (nameOrId) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
    .then((response) => response.json());
};

const getInputValue = (query) => document.querySelector(query).value;
const setPokemonInfo = (query, value) => {
  const node = document.querySelector(query);
  if (node.tagName === 'IMG') {
    node.setAttribute('src', value);
  } else {
    document.querySelector(query).textContent = value;
  }
};

const setPokemonInfos = ({ sprites : { front_default }, name, weight, height, moves }) => {
  setPokemonInfo('#pokemon-image', front_default);
  setPokemonInfo('#pokemon-name .container-span-data', name);
  setPokemonInfo('#pokemon-weight .container-span-data', `${weight} Kg`);
  setPokemonInfo('#pokemon-height .container-span-data', height);
  setPokemonInfo('#pokemon-moves .container-span-data', moves.length);
};

const addPokemon = () => {
  document.querySelector('#error').textContent = '';
  const pokemon = getInputValue('#pokemon-search');

  fetchPokeApi(pokemon)
    .then((pokemon) => setPokemonInfos(pokemon))
    .catch((error) => {
      console.error(error);
      document.querySelector('#error')
        .textContent = 'Digite o nome de um Pokémon ou um número válido e tente novamente.';
    });
};

window.onload = () => {
  document.querySelector('#btn-pokemon-search').addEventListener('click', addPokemon);
};
