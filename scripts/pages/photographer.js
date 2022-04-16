const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
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

function displayProfilMedia( profils, medias ) {
  
  const profil = profils.find(profil => profil.id === parseInt(id));
  const mediasFromPhotographer = medias.filter(media => media.photographerId === parseInt(id));
  profil.medias = mediasFromPhotographer;
  const lightbox = new Lightbox(mediasFromPhotographer);
  document.body.appendChild(lightbox.buildDOM());

  likesArray = [...mediasFromPhotographer].sort(function(a, b){
    return b.likes - a.likes});
  dateArray = [...mediasFromPhotographer].sort(function(a, b){
    b = new Date(b.date).getTime(); 
    a = new Date(a.date).getTime();
    return a - b;});
  titleArray = [...mediasFromPhotographer].sort(function(a, b){
    b = (b.title);
    a = (a.title);
    return a.localeCompare(b) ;});

  const dropdown = document.getElementById("select_images");
  let sortValue = dropdown.value;
  displayMedias(likesArray);

  dropdown.addEventListener('change', (event) => {
    
    sortValue = event.target.value;
    if (sortValue === "popularity"){
    displayMedias(likesArray);
  } else if (sortValue === "date"){
    displayMedias(dateArray);
  } else {
    displayMedias(titleArray);
  }
  });
  likeMedia(medias);
  displayProfil(profil);
  openLightbox(lightbox);
}

function openLightbox(lightbox){
  const openImage = document.querySelectorAll(".gallery");
  openImage.forEach((image) => {
    image.addEventListener("click", (event) => {
    const articleId = event.target.parentNode.id;
    lightbox.open(parseInt(articleId));
  })
  })
}

function displayMedias(mediasFromPhotographer){
  const mediaSection = document.querySelector(".photographers_media");

  // mediaSection.innerHTML ="";
  while (mediaSection.firstChild){
    mediaSection.removeChild(mediaSection.firstChild);
  }

  mediasFromPhotographer.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
  });
}

function displayProfil (profil) {
  const profilSection = document.querySelector(".photograph_header");
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);
  
  // const likeSection = document.querySelector(".total_like_price");
  // const totalLikeDOM = profilModel.totalLikesAndPriceDOM();
  // console.log(totalLikeDOM)
  // likeSection.appendChild(totalLikeDOM);
}
function displayTotalLikes(){
  const likeSection = document.querySelector(".total_like_price");
  const totalLikeDOM = totalLikesAndPriceDOM();
  console.log(totalLikeDOM)
  likeSection.appendChild(totalLikeDOM);

}

function displaySortMedias() {
  const sortButtonSection = document.querySelector(".select_dropdown");
  const buttonSort = sortMediasDOM();
  sortButtonSection.appendChild(buttonSort);
}

function likeMedia(medias){
  const addLike = document.querySelectorAll(".heart_icon");
  addLike.forEach((like) => {
    const likescounter = like.previousSibling;
    like.addEventListener('click', (event) => {
      const mediaId = event.target.parentNode.parentNode.parentNode.id;
      const oldLike = medias.filter(media => media.id === parseInt(mediaId))[0].likes;
      if (likescounter.textContent == oldLike) {
        likescounter.textContent = parseInt(likescounter.textContent) +1;
      }else if(likescounter.textContent == oldLike +1){
        likescounter.textContent = parseInt(likescounter.textContent) -1;
      }
      changeTotalLike();
    }) 
  })
    
}

function changeTotalLike(){
  const addLike = document.querySelectorAll(".heart_icon");
  let totalLikes = 0;
  addLike.forEach((like) => {
    const likescounter = like.previousSibling;
    totalLikes = totalLikes + parseInt(likescounter.textContent);
    console.log(totalLikes)
  })
}

async function init() {
  const {media, photographers} = await getProfilMedia();
  displayProfilMedia(photographers, media);
}
init();
