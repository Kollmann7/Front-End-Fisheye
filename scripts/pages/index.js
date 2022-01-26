    async function getPhotographers() {
        try {
            let response = await fetch('../../data/photographers.json')
            let result = await response.json()
            console.log(result['photographers'])
            return result['photographers']
        } catch (error) {
            console.error('mon fetch a pété', e)
        }
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    