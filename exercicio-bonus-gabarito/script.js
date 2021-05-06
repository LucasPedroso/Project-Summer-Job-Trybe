const getImageRandom = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const getCat = async () => {
  try {
    document.querySelector('#error').textContent = '';
    const { file } = await getImageRandom('https://aws.random.cat/meow');
    addImage(file);
  } catch (error) {
    console.error(error);
    document.querySelector('#error')
      .textContent = 'Ocorreu um erro, tente novamente.';
  }
};

const getDog = async () => {
  try {
    document.querySelector('#error').textContent = '';
    const { url } = await getImageRandom('https://random.dog/woof.json');
    if (!url.endsWith('.jpg')) {
      throw new Error('O arquivo não é .jpg');
    }
    addImage(url);
  } catch (error) {
    console.error(error);
    document.querySelector('#error')
      .textContent = 'Ocorreu um erro, tente novamente.';
  }
};

const getFox = async () => {
  try {
    document.querySelector('#error').textContent = '';
    const { image } = await getImageRandom('https://randomfox.ca/floof/');
    addImage(image);
  } catch (error) {
    console.error(error);
    document.querySelector('#error')
      .textContent = 'Ocorreu um erro, tente novamente.';
  }
};

const addImage = (imageURL) => {
  const image = document.querySelector('#animal-image');
  image.setAttribute('src', imageURL);
};

window.onload = () => {
  document.querySelector('#btn-cat').addEventListener('click', getCat);
  document.querySelector('#btn-dog').addEventListener('click', getDog);
  document.querySelector('#btn-fox').addEventListener('click', getFox);
  getFox();
};
