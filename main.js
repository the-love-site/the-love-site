import { Auth } from "./scripts/auth.js";
import { Utils } from "./scripts/utils.js";
import { Theme } from "./scripts/theme.js";
import { Loading } from "./scripts/loading.js";
import { PageContent } from "./scripts/page-content.js";
import { PageLayout } from "./scripts/page-layout.js";
import { SongControl } from "./scripts/song-control.js";
import { Animation } from "./scripts/animation.js";

import { ParticleJS } from "./scripts/libs/particle.js";

Theme.initThemeSchemaControl();

const paramsMap = Utils.getParamsMapFromUrl(window.location);
const token = paramsMap.get('token');

if (!token) {
    Auth.handleInvalidToken();
}

const configBasePath = `/configs/${token}`;
const configUrl = `${configBasePath}/config.json`;

Loading.start();

fetch(configUrl)
// .then(res => Utils.delayHttpResponse(res, 500))
.then(res => Utils.parseRawConfigToObject(res))
.then(config => {
    Loading.setLoadingDiscImage(`${configBasePath}/assets/images/${config.metadata.fotoPrincipal}`);

    Loading.getContinueButton().onclick = () => {

        const songControl = new SongControl(`${configBasePath}/assets/songs/${config.metadata.musica}`);
        songControl.start();

        Animation.animateDisapearContinueButton()
            .then(() => {
                Animation.animateLoadingLabel();
                Animation.animateLoadingImage()
                    .then(() => {
                        setTimeout(() => {
                            Loading.end();
                        }, 5000);
                    });
            });
    };

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

    PageContent.updateMainImage(`${configBasePath}/assets/images/${config.metadata.fotoPrincipal}`);
    PageContent.updateNames(config.casal.pessoa1, config.casal.pessoa2);
    PageContent.updateText(config.metadata.texto);

    const date = Utils.createDateObject(
        config.data.ano,
        config.data.mes,
        config.data.dia,
        config.data.hora,
        config.data.minuto,
        config.data.segundo
    );

    PageContent.updateStartDate(date);
})
.catch(err => Auth.handleInvalidToken(err));
