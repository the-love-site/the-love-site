export class Animation {

    static animateLoadingImage() {
        const duration = 3500;
        const delay = 500;

        const container = document.getElementById('loading-image-container');

        const disc = document.getElementById('loading-image-disc').firstElementChild;
        
        disc.style.animationDuration = `${duration}ms`;
        disc.style.animationDelay = `${delay}ms`;

        disc.classList.add('slide-in-bottom');

        // container.style.height = `210px`;

        return new Promise((resolve) => {
            setTimeout(() => resolve(), duration + delay);
        });
    }

    static animateEntranceOfStartButton() {
        const duration = 2000;
        const delay = 250;

        const btn = document.getElementById('loading-continue-btn');
        
        btn.style.animationDuration = `${duration}ms`;
        btn.style.animationDelay = `${delay}ms`;

        btn.classList.add('slide-in-bottom');

        return new Promise((resolve) => {
            setTimeout(() => resolve(), duration + delay);
        });
    }

    static animateExitOfStartButton() {
        const duration = 5000;

        const btn = document.getElementById('loading-continue-btn');
        
        btn.style.animationDuration = `${duration}ms`;

        btn.classList.add('slide-out-bottom');

        return new Promise((resolve) => {
            setTimeout(() => resolve(), duration);
        });
    }

    static animateLoadingLabel() {
        const duration = 2000;
        const delay = 250;

        const label = document.getElementById('loading-label');

        label.style.animationDuration = `${duration}ms`;
        label.style.animationDelay = `${delay}ms`;
        label.style.display = 'block';

        label.classList.add('slide-in-bottom');

        return new Promise((resolve) => {
            setTimeout(() => resolve(), duration + delay);
        });
    }
}