import NomeValidationError from "./errors/NomeValidationError";
import TelefoneValidationError from "./errors/TelefoneValidationError";

function clientValidations(client) {
  if (client.nome.length === 0)
    throw new NomeValidationError("O campo deve ser preenchido.")
  else if (/[^a-z\s]/i.test(client.nome))
    throw new NomeValidationError("O campo deve conter apenas letras.")

  if (client.telefone.length < 10)
    throw new TelefoneValidationError("O campo conter 10 ou 11 números.")
  else if(client.telefone[0] === "0" || client.telefone[1] === "0")
    throw new TelefoneValidationError("O DDD do campo é inválido.")
  switch(client.telefone.length) {
    case 10:
      if (client.telefone[2] === "0" || client.telefone[2] === "1")
        throw new TelefoneValidationError(
          "O campo é inválido,\npois deve iniciar com 2 a 8 após o DDD."
        )
      break;
    case 11:
      if (client.telefone[2] !== "9")
        throw new TelefoneValidationError(
          "O campo é inválido,\npois deve iniciar com 9 após o DDD."
        )
      else if (client.telefone[4] === "0")
        throw new TelefoneValidationError("O campo é inválido,\npois não deve começar com 0.")
      break;
    default:
      break;
  }
}

export default clientValidations