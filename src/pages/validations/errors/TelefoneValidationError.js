class TelefoneValidationError extends Error {
    constructor(message) {
        super(message ?? 'Telefone inválido.')
    }
}

export default TelefoneValidationError