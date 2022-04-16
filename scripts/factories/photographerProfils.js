function profilFactory(profil) {
  const { name, portrait, city, country, tagline, price } = profil;
  const picture = `assets/photographers/${portrait}`;
  const heartIcon = `assets/icons/heart.svg`;
  // displayPhotographerName(name);

  function getProfilCardDOM() {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const location = document.createElement("div");
    const taglines = document.createElement("div");
    const intro = document.createElement("div");
    const contactBtn = document.querySelector(".contact_button");
    
    h2.textContent = name;
    img.setAttribute("src", picture);

    location.className = "location";
    location.textContent = city + ", " + country;

    taglines.className = "taglines";
    taglines.textContent = tagline;

    intro.className = "desc";
    intro.appendChild(h2);
    intro.appendChild(location);
    intro.appendChild(taglines);

    article.appendChild(intro);
    article.appendChild(contactBtn);
    article.appendChild(img);

    return article;
  }
  function totalLikesAndPriceDOM() {
    const likes = document.createElement("span");
    const prices = document.createElement("span");
    const heart = document.createElement("img");

    likes.className = "like";
    likes.textContent = "totallike";
    heart.setAttribute("src", heartIcon);

    heart.appendChild(likes)
    prices.className = "price"
    prices.textContent = price;
    console.log(likes)
  }
  

  return { name, picture, location, tagline, price, getProfilCardDOM, totalLikesAndPriceDOM };
}
// createPhotographerLikesCounter() {
//   const counter = document.createElement("div");
//   counter.classList.add("photographer-likes-counter");

//   const counterContent = `
//       <p>
//         <span id="total_likes_number">${this.likes}</span>
//         <span><img src="assets/icons/heart-black.svg" alt="heart" /></span>
//       </p>
//       <p>${this.price}€ / jour</p>
//   `;

//   counter.innerHTML = counterContent;
//   return counter;
// }