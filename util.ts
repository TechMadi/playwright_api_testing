export const getAuthToken = (cookie: string) => {
  // Get Token
  const dirtyToken = cookie;

  //Split and get token
  const splitted_Token = dirtyToken.split(";");

  let clean_Token: string = "";
  for (let token of splitted_Token) {
    token = token.trim();

    if (token.startsWith("token=")) {
      clean_Token = token.split("=")[1];
      break;
    }
  }

  return clean_Token;
};
