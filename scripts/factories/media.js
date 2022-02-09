// gallery factory

function mediaFactory(media){
    const {image, video, title, likes, heart, id} = media;
    const photo = `assets/media/${image}`;
    const clip = `assets/media/${video}`;
    const heartIcon = `assets/icons/heart.svg`;
    console.log(media)

    function getMediaCardDOM(){
    const article = document.createElement("article");
    article.setAttribute("id", id);
    const imageElement = document.createElement("img");
    const videoElement = document.createElement("video");
    const titles = document.createElement("span");
    const like = document.createElement("span");
    const heart = document.createElement("img");
    const likeContainer = document.createElement("div");
    const ImgTitle = document.createElement("div");
    if (media.image){
        article.appendChild(imageElement);
        console.log(image)
        article.appendChild(ImgTitle);
        imageElement.setAttribute("src", photo);
        imageElement.setAttribute("class", "gallery");

    }    
    else if (media.video){
       article.appendChild(videoElement);
        article.appendChild(ImgTitle);
        videoElement.setAttribute("src", clip);
        videoElement.setAttribute("class", "gallery");
        videoElement.setAttribute("type", "video/mp4"); 
    }
    else{
        console.log(error)
    }
    
    titles.className = "title";
    titles.textContent = title;

    like.className = "likes";
    like.textContent = likes;

    heart.className = "heart_icon";
    heart.setAttribute("src",heartIcon)

    likeContainer.className = "like_container";
    likeContainer.appendChild(like);
    likeContainer.appendChild(heart);

    ImgTitle.className = "ImgTitle";
    ImgTitle.appendChild(titles);
    ImgTitle.appendChild(likeContainer);

    return article;
}
    return {image, video, title, likes,  id, getMediaCardDOM }
}