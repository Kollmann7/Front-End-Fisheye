const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const profilSection = document.querySelector(".photograph_header");

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
  

async function displayProfilMedia( profils, media ) {
  
  const profil = profils.find(profil => profil.id === parseInt(id));
  console.log(profil)
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);

}
async function init() {
    const {media} = await getProfilMedia();
    const {photographers} = await getProfilMedia();
    displayProfilMedia(photographers, media);
  }
init();