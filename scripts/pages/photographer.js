const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const profilSection = document.querySelector(".photograph_header");
const mediaSection = document.querySelector(".photographers_media");

async function getProfilMedia() {
  try {
    let response = await fetch('../../data/photographers.json')
    let result = await response.json()
    return result
  }  
  catch (error) {
    console.error('mon fetch a pété', e)
  }
}
  

async function displayProfilMedia( profils, medias ) {
  
  const profil = profils.find(profil => profil.id === parseInt(id));
  console.log(profil)
  const mediasFromPhotographer = medias.filter(media => media.photographerId === parseInt(id));
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);
  mediasFromPhotographer.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
});
  
}
async function init() {
  const {media} = await getProfilMedia();
  const {photographers} = await getProfilMedia();
  displayProfilMedia(photographers, media);
}
init();