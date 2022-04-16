import MediaFactory from './media.js';
import ContactForm from '../utils/contactForm.js';
import Lightbox from '../utils/lightbox.js';

export default class ProfilFactory {
  constructor(profil) {
    this.name = profil.name;
    this.portrait = profil.portrait;
    this.city = profil.city;
    this.country = profil.country;
    this.tagline = profil.tagline;
    this.price = profil.price;
    this.picture = `assets/photographers/${this.portrait}`;
    this.heartIcon = 'assets/icons/heart.svg';
    this.likeIcon = 'assets/icons/heartB.svg';
    this.medias = profil.medias.map((media) => new MediaFactory(media));
    this.lightbox = new Lightbox(this.medias);
    this.contactForm = new ContactForm(this.name);
    this.likesArray = [];
    this.dateArray = [];
    this.titleArray = [];
  }

  buildProfilCardDOM(profilSection, mediaSection) {
    this.lightboxDOM();
    this.profilArticle = this.profilDOM();
    profilSection.appendChild(this.profilArticle);
    this.mediaSection = mediaSection;
    this.sortMedia(this.medias);
    this.likeMedia(this.medias);
    this.totalLikesAndPriceDOM();
    this.changeTotalLike();
  }

  profilDOM() {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const location = document.createElement('div');
    const taglines = document.createElement('div');
    const intro = document.createElement('div');
    const contactBtn = document.querySelector('.contact_button');
    h2.textContent = this.name;
    img.setAttribute('src', this.picture);

    location.className = 'location';
    location.textContent = `${this.city}, ${this.country}`;

    taglines.className = 'taglines';
    taglines.textContent = this.tagline;

    intro.className = 'desc';
    intro.appendChild(h2);
    intro.appendChild(location);
    intro.appendChild(taglines);

    article.appendChild(intro);
    article.appendChild(contactBtn);
    article.appendChild(img);

    return article;
  }

  lightboxDOM() {
    document.body.appendChild(this.lightbox.buildDOM());
  }

  sortMedia(mediasFromPhotographer) {
    this.likesArray = [...mediasFromPhotographer].sort((a, b) => b.likes - a.likes);
    this.dateArray = [...mediasFromPhotographer].sort((a, b) => {
      new Date(b.date).getTime();
      new Date(a.date).getTime();
      return a - b;
    });
    this.titleArray = [...mediasFromPhotographer].sort((a, b) => (a.title).localeCompare(b.title));

    const dropdown = document.getElementById('select_images');
    let sortValue = dropdown.value;
    this.displayMedias(this.likesArray);

    dropdown.addEventListener('change', (event) => {
      sortValue = event.target.value;
      if (sortValue === 'popularity') {
        this.displayMedias(this.likesArray);
      } else if (sortValue === 'date') {
        this.displayMedias(this.dateArray);
      } else {
        this.displayMedias(this.titleArray);
      }
    });
  }

  displayMedias(mediasFromPhotographer) {
    // mediaSection.innerHTML ="";
    while (this.mediaSection.firstChild) {
      this.mediaSection.removeChild(this.mediaSection.firstChild);
    }

    mediasFromPhotographer.forEach((media) => {
      const mediaDOM = media.getMediaCardDOM();
      this.mediaSection.appendChild(mediaDOM);
    });
    this.openLightbox();
  }

  likeMedia(medias) {
    const addLike = document.querySelectorAll('.heart_icon');
    addLike.forEach((like) => {
      const likescounter = like.previousSibling;
      like.addEventListener('click', (event) => {
        const mediaId = event.target.parentNode.parentNode.parentNode.id;
        const oldLike = medias.filter((media) => media.id === parseInt(mediaId, 10))[0].likes;
        if (parseInt(likescounter.textContent, 10) === oldLike) {
          likescounter.textContent = parseInt(likescounter.textContent, 10) + 1;
        } else if (likescounter.textContent > oldLike) {
          likescounter.textContent = parseInt(likescounter.textContent, 10) - 1;
        }
        this.changeTotalLike();
      });
    });
  }

  changeTotalLike() {
    this.totalLikes = 0;
    const addLike = document.querySelectorAll('.heart_icon');
    addLike.forEach((like) => {
      const likescounter = like.previousSibling;
      this.totalLikes += parseInt(likescounter.textContent, 10);
    });
    this.totalLikesAndPriceDOM();
  }

  openLightbox() {
    const openImage = document.querySelectorAll('.gallery');
    openImage.forEach((image) => {
      image.addEventListener('click', (event) => {
        const articleId = event.target.parentNode.id;
        this.lightbox.open(parseInt(articleId, 10));
      });
    });
  }

  totalLikesAndPriceDOM() {
    const container = document.querySelector('.total_like_price');
    container.innerHTML = '';
    const likesContainer = document.createElement('div');
    const likes = document.createElement('span');
    const prices = document.createElement('span');
    const heart = document.createElement('img');

    likes.className = 'like';
    likes.textContent = this.totalLikes;
    heart.className = 'heart_like';
    likesContainer.appendChild(heart);
    heart.setAttribute('src', this.likeIcon);
    prices.className = 'price';
    prices.textContent = `${this.price} €/jour`;
    likesContainer.className = 'likes_container';
    likesContainer.appendChild(likes);

    container.appendChild(likesContainer);
    container.appendChild(prices);
    return container;
  }
}
