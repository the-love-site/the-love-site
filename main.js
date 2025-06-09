import { Auth } from "./scripts/auth.js";
import { Utils } from "./scripts/utils.js";
import { Theme } from "./scripts/theme.js";
import { Loading } from "./scripts/loading.js";
import { PageContent } from "./scripts/page-content.js";
import { PageLayout } from "./scripts/page-layout.js";
import { SongControl } from "./scripts/song-control.js";
import { Animation } from "./scripts/animation.js";

import { ParticleJS } from "./scripts/libs/particle.js";

const startTimer = 5000;

Theme.initThemeSchemaControl();

Loading.start();

const paramsMap = Utils.getParamsMapFromUrl(window.location);
const token = paramsMap.get('token');

if (!token) {
    Auth.handleInvalidToken();
}

const configBasePath = `configs/${token}`;
const configUrl = `${configBasePath}/config.json`;

/**
 * @param {{
 *  token: string;
 *  casal: {
 *      pessoa1: string;
 *      pessoa2: string;
 *  };
 *  data: {
 *      dia: number;
 *      mes: number;
 *      ano: number;
 *      hora: number;
 *      minuto: number;
 *      segundo: number;
 *  };
 *  theme: {
 *      scheme: 'light'|'dark';
 *      color: {
 *          primary: string;
 *      };
 *  };
 *  metadata: {
 *      musica: boolean;
 *      videoUrl: boolean;
 *      fotoLoading: string;
 *      fotoPrincipal: string;
 *      fotosUrls: string[];
 *      texto: string;
 *  };
 * }} config
 */
function startApp(config, { skipLoading }) {
    Animation.animateEntranceOfStartButton();

    if (skipLoading) {
        Loading.end();
    } else {
        const continueBtn = Loading.getContinueButton();

        function continueFn() {
            continueBtn.disabled = true;
    
            const songControl = new SongControl(`${configBasePath}/songs/${config.metadata.musica}`);
            songControl.start();
    
            Loading.setLoadingDiscImage(`${configBasePath}/images/${config.metadata.fotoLoading}`);
    
            Promise
                .all([
                    Animation.animateExitOfStartButton(),
                    Animation.animateLoadingLabel(),
                ])
                .then(() => {
                    setTimeout(() => {
                        Loading
                            .end()
                            .then(() => {
                                window.scroll({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            });
                    }, startTimer);
                });
        }
    
        continueBtn.onclick = () => continueFn();
    }

    ParticleJS
        .load()
        .then(particles => {
            const updatedParticlesConfig = ParticleJS.updatePrimaryColor(particles, config.theme.color.primary);
            ParticleJS.init(updatedParticlesConfig);
        });

    Theme.updateThemeSchema(config.theme.scheme);

    PageLayout.updateLoadingContinueButtonColor(config.theme.color.primary);
    PageLayout.updateCasalNameColor(config.theme.color.primary);
    PageLayout.updateDatesBgColor(config.theme.color.primary);

    PageContent.updateMainImage(`${configBasePath}/images/${config.metadata.fotoPrincipal}`);
    PageContent.updateNames(config.casal.pessoa1, config.casal.pessoa2);
    PageContent.updateText(config.metadata.texto);

    const imagesUrls = [
        `${configBasePath}/images/${config.metadata.fotoPrincipal}`,
        ...config.metadata.fotosUrls.map(url => `${configBasePath}/images/carousel/${url}`),
        `${configBasePath}/images/${config.metadata.fotoPrincipal}`,
    ];

    PageContent.updateCarousel(...imagesUrls);

    const date = Utils.createDateObject(
        config.data.ano,
        config.data.mes,
        config.data.dia,
        config.data.hora,
        config.data.minuto,
        config.data.segundo
    );

    PageContent.updateStartDate(date);
}

fetch(configUrl)
.then(res => res.json())
.then(config => startApp(config, { skipLoading: false }))
.catch(err => Auth.handleInvalidToken(err));
