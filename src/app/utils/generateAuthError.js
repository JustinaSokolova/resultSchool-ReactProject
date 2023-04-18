function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Неверный пароль";

    case "EMAIL_NOT_FOUND":
      return "Пользователь с таким email не найден";

    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";
    default:
      return "Слишком много попыток входа, попробуйте позже";
  }
}

export default generateAuthError;
