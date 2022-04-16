export default class PhotographerFactory {
  constructor(data) {
    this.name = data.name;
    this.portrait = data.portrait;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.picture = `assets/photographers/${this.portrait}`;
  }

  openProfil() {
    window.location.href = `photographer.html?id=${this.id}`;
  }

  getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const location = document.createElement('div');
    const taglines = document.createElement('div');
    const prices = document.createElement('div');

    img.setAttribute('src', this.picture);
    img.setAttribute('alt', `Photo portrait de ${this.name}`);
    img.setAttribute('tabindex', 0);
    h2.textContent = this.name;
    h2.setAttribute('tabindex', 0);

    location.className = 'location';
    location.textContent = `${this.city}, ${this.country}`;
    location.setAttribute('aria-label', 'Lieu de résidence du photographe');
    location.setAttribute('tabindex', 0);

    taglines.className = 'taglines';
    taglines.textContent = this.tagline;
    taglines.setAttribute('aria-label', 'Slogan du photographe');
    taglines.setAttribute('tabindex', 0);

    prices.className = 'prices';
    prices.textContent = `${this.price} €/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(taglines);
    article.appendChild(prices);
    article.addEventListener('click', this.openProfil.bind(this));

    return article;
  }
}
