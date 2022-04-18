export default class MediaFactory {
  constructor(media) {
    this.image = media.image;
    this.video = media.video;
    this.title = media.title;
    this.likes = media.likes;
    this.id = media.id;
    this.photo = `assets/media/${this.image}`;
    this.clip = `assets/media/${this.video}`;
    this.heartIcon = 'assets/icons/heart.svg';
  }

  getMediaCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('id', this.id);
    const imageElement = document.createElement('img');
    const videoElement = document.createElement('video');
    const titles = document.createElement('span');
    const like = document.createElement('span');
    const heart = document.createElement('img');
    const likeContainer = document.createElement('div');
    const ImgTitle = document.createElement('div');
    if (this.image) {
      article.appendChild(imageElement);
      article.appendChild(ImgTitle);
      imageElement.setAttribute('class', 'gallery');
      imageElement.setAttribute('tabindex', 0);
      imageElement.setAttribute('src', this.photo);
      imageElement.setAttribute('alt', this.title);
    } else if (this.video) {
      article.appendChild(videoElement);
      article.appendChild(ImgTitle);
      videoElement.setAttribute('class', 'gallery');
      videoElement.setAttribute('src', this.clip);
      videoElement.setAttribute('tabindex', 0);
      videoElement.setAttribute('type', 'video/mp4');
      videoElement.setAttribute('alt', this.title);
    }

    titles.className = 'title';
    titles.textContent = this.title;
    titles.setAttribute('tabindex', 0);

    like.className = 'likes';
    like.textContent = this.likes;
    like.setAttribute('tabindex', 0);

    heart.className = 'heart_icon';
    heart.setAttribute('src', this.heartIcon);
    heart.setAttribute('tabindex', 0);
    heart.setAttribute('aria-label', 'Like la photo');

    likeContainer.className = 'like_container';
    likeContainer.appendChild(like);
    likeContainer.appendChild(heart);

    ImgTitle.className = 'ImgTitle';
    ImgTitle.appendChild(titles);
    ImgTitle.appendChild(likeContainer);

    return article;
  }
}
