class Lightbox{
    
    constructor (mediasFromPhotographer){
        this.medias = mediasFromPhotographer;
        this.bindKeyUp = this.keyUp.bind(this);
    }

     
    open(mediaId){
        const container = document.querySelector(".lightbox");
        container.style.display ="block";
        this.currentIndex = this.medias.findIndex(media => media.id === mediaId );
        this.updateImageUrl();
        document.addEventListener("keyup",this.bindKeyUp );

    }
    
    updateImageUrl(){
        const imageName = this.medias[this.currentIndex].image;
        const videoName = this.medias[this.currentIndex].video;

        
        const container = document.querySelector(".lightbox_container ");
        container.innerHTML="";
        
        if( imageName){
            const imageElement = document.createElement("img");
            container.appendChild(imageElement);
            imageElement.setAttribute("class", "lightbox_container img");    
            imageElement.setAttribute("src", `assets/media/${imageName}`);

            
        }else if( videoName){
            const videoElement = document.createElement("video");
            const sourceElement = document.createElement("source");
            
            videoElement.setAttribute("class", "lightbox_container video");
            videoElement.setAttribute("controls", "");    
            
            videoElement.appendChild(sourceElement);
            sourceElement.setAttribute("src", `assets/media/${videoName}`);
            sourceElement.setAttribute("type","video/mp4");
            
            container.appendChild(videoElement);
        }
        const titleElement = document.createElement("div");
        container.appendChild(titleElement);
        titleElement.setAttribute("class", "lightbox_title");    
        titleElement.textContent = this.medias[this.currentIndex].title;

    }
    
    next(){
        if(this.currentIndex == this.medias.length - 1){
            this.currentIndex = 0;
        }else{
            this.currentIndex++;
        }
        this.updateImageUrl();
    }
    previous(){
        if(this.currentIndex == 0){
            this.currentIndex = this.medias.length -1;
        }else{
            this.currentIndex--;
        }
        this.updateImageUrl();
    }

    close(){
        const container = document.querySelector(".lightbox");
        container.style.display = "none";
        document.removeEventListener("keyup", this.bindKeyUp );
    }

    manageEvent(dom){
        dom.querySelector(".lightbox_next").addEventListener("click", () => {
            this.next();
        })
        dom.querySelector(".lightbox_previous").addEventListener("click", () => {
            this.previous();
        })
        dom.querySelector(".lightbox_close").addEventListener("click", () => {
            this.close();
        })
        

    }
    keyUp(e){
        console.log(e.key)
            switch(e.key){
                case "ArrowRight":
                    this.next();
                    break;
                case "ArrowLeft":
                    this.previous();
                    break;
                case "Escape":
                    this.close();
                    break;
            }
    }

    buildDOM (){
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `
        <button class="lightbox_close">Close</button>

        <button class="lightbox_previous">Previous</button>

        <button class="lightbox_next">Next</button>

        <div class="lightbox_container"></div>`

        this.manageEvent(dom);
        return dom;
    }
}


