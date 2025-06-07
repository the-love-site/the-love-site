export class Theme {

    /**
     * @param {'light'|'dark'} schema 
     * @returns {void}
     */
    static updateThemeSchema(schema) {
        localStorage.setItem('theme', schema);
        Theme.initThemeSchemaControl();
    }

    static initThemeSchemaControl() {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
    }
}
