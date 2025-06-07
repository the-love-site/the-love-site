export class ParticleJS {

    /**
     * Init
     */
    static init(config) {
        particlesJS('particles-js', config);
    }

    /**
     * 
     * @returns Config JSON
     */
    static load() {
        const url = `assets/json/particles.json`;
        return fetch(url).then(res => res.json());
    }

    /**
     * Update the primary color of Particles.js configuration
     * @returns {object} Updated config
    */
    static updatePrimaryColor(originalConfig, color) {
        originalConfig.particles.color.value = color;
        originalConfig.particles.shape.stroke.color = color;

        return originalConfig;
    }
}