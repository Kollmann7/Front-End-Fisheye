const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const profilSection = document.querySelector('.photograph_header');
const mediaSection = document.querySelector('.photographers_media');

async function getProfilMedia() {
  try {
    const response = await fetch('../../data/photographers.json');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('mon fetch a pété', error);
  }
}

function displayProfil(profil) {
  const profilModel = new ProfilFactory(profil);
  profilModel.buildProfilCardDOM(profilSection, mediaSection);
}
async function init() {
  const { media: medias, photographers } = await getProfilMedia();
  const profil = photographers.find((profil) => profil.id === parseInt(id, 10));
  const mediasFromPhotographer = medias.filter((media) => media.photographerId === parseInt(id, 10));
  profil.medias = mediasFromPhotographer;

  displayProfil(profil);
}
init();
