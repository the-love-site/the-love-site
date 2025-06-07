export class Loading {

    static start() {
        const loading = document.getElementById('loading');
        const main = document.querySelector('main');

        loading.style.opacity = 100;
        loading.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';

        main.style.display = 'none';
    }

    static end() {
        const loading = document.getElementById('loading');
        const main = document.querySelector('main');

        loading.style.opacity = 0;
        loading.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';

        main.style.display = 'flex';
    }

    /**
     * 
     * @returns {HTMLButtonElement}
     */
    static getContinueButton() {
        return document.getElementById('loading-continue-btn');
    }

    static setLoadingDiscImage(imageUrl) {
        const imageEl = document.getElementById('loading-image-disc-el');
        imageEl.src = imageUrl;
    }
}
