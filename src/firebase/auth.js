import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  } from "firebase/auth";
  
const auth = {
  signIn: (email, password) => {
    signInWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
      console.log("Signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/wrong-password")
        alert("Senha incorreta.");

      alert(`Error Code: ${error.code}\nError Message: ${error.message}`)
    })
  },
  register: (email, password) => {
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
      console.log("User account created & signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use")
        alert("Endereço de email já está cadastrado.");

      if (error.code === "auth/invalid-email")
        alert("Endereço de email inválido.");

      alert(`Error Code: ${error.code}\nError Message: ${error.message}`)
    });
  }
}

export default auth