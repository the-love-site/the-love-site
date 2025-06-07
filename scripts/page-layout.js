export class PageLayout {

    static updateCasalNameColor(color) {
        const casalName = document.getElementById('casal-name');
        casalName.style.color = color;
    }

    static updateDatesBgColor(color) {
        const elements = document.querySelectorAll('.date-box');
        elements.forEach(e => {
            e.style.backgroundColor = color;
        });
    }

    static updateLoadingContinueButtonColor(color) {
        const btn = document.getElementById('loading-continue-btn').querySelector('button');
        btn.style.backgroundColor = color;
    }
}
