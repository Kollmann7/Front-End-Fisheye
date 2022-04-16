import ProfilFactory from '../factories/photographerProfils.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const profilSection = document.querySelector('.photograph_header');
const mediaSection = document.querySelector('.photographers_media');

async function getProfilMedia() {
  const response = await fetch('../../data/photographers.json');
  const result = await response.json();
  return result;
}

function displayProfil(profil) {
  const profilModel = new ProfilFactory(profil);
  profilModel.buildProfilCardDOM(profilSection, mediaSection);
}
async function init() {
  const { media: medias, photographers } = await getProfilMedia();
  const photographer = photographers.find((profil) => profil.id === parseInt(id, 10));
  const mediasFromPhotographer = medias
    .filter((media) => media.photographerId === parseInt(id, 10));
  photographer.medias = mediasFromPhotographer;

  displayProfil(photographer);
}
init();
