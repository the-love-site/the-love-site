export class Animation {

    static animateLoadingImage() {

        const container = document.getElementById('loading-image-container');
        const disc = document.getElementById('loading-image-disc');
        disc.style.top = '0px';

        const limit = 225;
        let current = 0;

        return new Promise((resolve) => {
            setTimeout(() => {
                const interval = setInterval(() => {
                    if (current < limit) {
                        current++;
                        container.style.height = `${current}px`;
                    } else {
                        clearInterval(interval);
                        resolve();
                    }
                }, 12.5);
            }, 1500);
        })
    }

    static animateLoadingLabel() {

        const label = document.getElementById('loading-label');

        const limit = 80;
        let current = 0;

        const interval = setInterval(() => {
            if (current < limit) {
                current++;
                label.style.height = `${current}px`;
            } else {
                clearInterval(interval);
            }
        }, 12.5);
    }

    static animateDisapearContinueButton() {

        const btn = document.getElementById('loading-continue-btn');

        const limit = 0;
        let current = btn.clientHeight;

        return new Promise((resolve) => {
            setTimeout(() => {
                const interval = setInterval(() => {
                    if (current > limit) {
                        current--;
                        btn.style.height = `${current}px`;
                    } else {
                        clearInterval(interval);
                        resolve();
                    }
                }, 12.5);
            }, 150);
        });
    }
}