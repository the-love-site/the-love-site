export class Auth {

    static handleInvalidToken(err) {
        alert(`Token inválido!`)
        const error = err ?? new Error(`Invalid token!`)
        throw error;
    }
}
