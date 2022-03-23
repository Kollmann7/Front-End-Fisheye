async function getPhotographers() {
  try {
    const response = await fetch('../../data/photographers.json');
    const result = await response.json();
    return result.photographers;
  } catch (error) {
    console.error('mon fetch a pété', error);
  }
}

function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
