// eslint-disable-next-line no-unused-vars
class MediaFactory {
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
      imageElement.setAttribute('src', this.photo);
    } else if (this.video) {
      article.appendChild(videoElement);
      article.appendChild(ImgTitle);
      videoElement.setAttribute('class', 'gallery');
      videoElement.setAttribute('src', this.clip);
      videoElement.setAttribute('type', 'video/mp4');
    }

    titles.className = 'title';
    titles.textContent = this.title;

    like.className = 'likes';
    like.textContent = this.likes;

    heart.className = 'heart_icon';
    heart.setAttribute('src', this.heartIcon);

    likeContainer.className = 'like_container';
    likeContainer.appendChild(like);
    likeContainer.appendChild(heart);

    ImgTitle.className = 'ImgTitle';
    ImgTitle.appendChild(titles);
    ImgTitle.appendChild(likeContainer);

    return article;
  }
}
