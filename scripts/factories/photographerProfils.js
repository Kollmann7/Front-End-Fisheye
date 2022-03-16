class ProfilFactory {
  constructor(profil){
    this.name = profil.name;
    this.portrait = profil.portrait;
    this.city = profil.city;
    this.country = profil.country;
    this.tagline = profil.tagline;
    this.picture = `assets/photographers/${this.portrait}`;
    this.medias = profil.medias.map(media => new MediaFactory(media));
    this.lightbox = new Lightbox(this.medias);

  }
    
  buildProfilCardDOM(profilSection, mediaSection) {
    this.lightboxDOM();
    this.profilArticle = this.profilDOM();
    profilSection.appendChild(this.profilArticle);
    this.mediaSection = mediaSection;
    this.displayMedias(this.medias);
  }

  profilDOM(){
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const location = document.createElement("div");
    const taglines = document.createElement("div");
    const intro = document.createElement("div");
    const contactBtn = document.querySelector(".contact_button");
    h2.textContent = this.name;
    img.setAttribute("src", this.picture);
    
    location.className = "location";
    location.textContent = this.city + ", " + this.country;
    
    taglines.className = "taglines";
    taglines.textContent = this.tagline;
    
    intro.className = "desc";
    intro.appendChild(h2);
    intro.appendChild(location);
    intro.appendChild(taglines);
    
    article.appendChild(intro);
    article.appendChild(contactBtn);
    article.appendChild(img);
    
    return article;
  }

  lightboxDOM(){
    document.body.appendChild(this.lightbox.buildDOM());

  }
  displayProfilMedia() {
    
    // profil.medias = mediasFromPhotographer;
    
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
          this.displayMedias(likesArray);
          
          dropdown.addEventListener('change', (event) => {
            
            sortValue = event.target.value;
            if (sortValue === "popularity"){
              this.displayMedias(likesArray);
            } else if (sortValue === "date"){
              this.displayMedias(dateArray);
            } else {
              this.displayMedias(titleArray);
            }
          });
          this.likeMedia(medias);
          this.displayProfil(profil);
          this.openLightbox(lightbox);
        }
        
  displayMedias(mediasFromPhotographer){
    // mediaSection.innerHTML ="";
    while (this.mediaSection.firstChild){
      this.mediaSection.removeChild(this.mediaSection.firstChild);
    }
    
    mediasFromPhotographer.forEach((media) => {
      const mediaDOM = media.getMediaCardDOM();
      this.mediaSection.appendChild(mediaDOM);
    });
  }
             
  displaySortMedias() {
    const SortButtonSection = document.querySelector(".select_dropdown");
    const buttonSort = sortMediasDOM();
    SortButtonSection.appendChild(buttonSort);
  }
  
  // displayPhotographerName(name);
  
  likeMedia(medias){
    const addLike = document.querySelectorAll(".heart_icon");
    addLike.forEach((like) => {
      const likescounter = like.previousSibling;
      like.addEventListener('click', (event) => {
        const mediaId = event.target.parentNode.parentNode.parentNode.id;
        const oldLike = medias.filter(media => media.id === parseInt(mediaId))[0].likes;
        if (likescounter.textContent == oldLike) {
          likescounter.textContent = parseInt(likescounter.textContent) +1;
        }
        this.changeTotalLike();
      }) 
    })
  }
  
  changeTotalLike(){
    const addLike = document.querySelectorAll(".heart_icon");
    let totalLikes = 0;
    addLike.forEach((like) => {
      const likescounter = like.previousSibling;
      totalLikes = totalLikes + parseInt(likescounter.textContent);
    })
  }
  
  openLightbox(lightbox){
    const openImage = document.querySelectorAll(".gallery");
    console.log(openImage);
    openImage.forEach((image) => {
      image.addEventListener("click", (event) => {
      const articleId = event.target.parentNode.id;
      lightbox.open(parseInt(articleId));
    })
    })
  }
}