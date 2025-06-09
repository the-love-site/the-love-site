export class Loading {

    static start() {
        document.body.style.overflow = 'hidden';
    }

    static end() {
        const loading = document.getElementById('loading');

        document.body.style.overflow = 'auto';

        const duration = 2500;
        loading.style.animationDuration = `${duration}ms`;

        loading.classList.add('slide-out-bottom');
        
        return new Promise((resolve) => {
            setTimeout(() => {
                loading.style.display = 'none';
                resolve();
            }, duration);
        })
    }

    /**
     * 
     * @returns {HTMLButtonElement}
     */
    static getContinueButton() {
        return document.getElementById('loading-continue-btn');
    }

    static setLoadingDiscImage(imageUrl) {
        const discEl = document.getElementById('loading-image-disc').firstElementChild;
        const discChild = discEl.firstElementChild;

        const imgEl = document.createElement('img');
        imgEl.src = imageUrl;
        imgEl.style.objectFit = 'cover';
        imgEl.classList.add('rotate-in-center');

        discEl.parentElement.style.scale = '100%';

        setTimeout(() => discEl.insertBefore(imgEl, discChild), 500);

        // const imageEl = document.getElementById('loading-image-disc-el');
        // imageEl.src = imageUrl;
    }
}
