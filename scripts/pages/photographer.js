const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const profilSection = document.querySelector(".photograph_header");
const mediaSection = document.querySelector(".photographers_media");
let likesArray = [];
let dateArray = [];
let titleArray = [];

async function getProfilMedia() {
  try {
    let response = await fetch('../../data/photographers.json');
    let result = await response.json();
    return result;
  }  
  catch (error) {
    console.error('mon fetch a pété', e);
  }
}

function displayProfil (profil) {
  const profilModel = new ProfilFactory(profil);
  profilModel.buildProfilCardDOM(profilSection, mediaSection);
}
async function init() {
  const {media: medias, photographers} = await getProfilMedia();
  // displayProfilMedia(photographers, media);
  const profil = photographers.find(profil => profil.id === parseInt(id));
  const mediasFromPhotographer = medias.filter(media => media.photographerId === parseInt(id));
  profil.medias = mediasFromPhotographer;

  displayProfil(profil);
}
init();
