export function parseFirebaseLoginError(error: string) {
  let firebaseError: string = "";
  switch (error) {
    case "auth/wrong-password":
      firebaseError = "Senha incorreta";
      break;
    case "auth/user-not-found":
      firebaseError = "Usuário não encontrado";
      break;
    case "auth/invalid-email":
      firebaseError = "Email inválido";
      break;
    case "auth/too-many-requests":
      firebaseError = "Muitas tentativas, tente mais tarde";
      break;
    case "auth/user-disabled":
      firebaseError = "Usuário desabilitado";
      break;
    case "auth/quota-exceeded":
      firebaseError = "Limite de requisições excedido";
      break;
    case "auth/invalid-login-credentials":
      firebaseError = "Credenciais inválidas";
      break;
    case "auth/email-already-in-use":
      firebaseError = "Email já cadastrado";
      break;
    case "auth/operation-not-allowed":
      firebaseError = "Operação não permitida";
      break;
    case "auth/weak-password":
      firebaseError = "Senha fraca";
      break;
    default:
      firebaseError = "Erro desconhecido";
      break;
  }

  return firebaseError;
}
