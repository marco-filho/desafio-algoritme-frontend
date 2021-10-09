class NomeValidationError extends Error {
    constructor(message) {
        super(message ?? 'Nome inválido.')
    }
}

export default NomeValidationError