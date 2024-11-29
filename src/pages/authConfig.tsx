export const msalConfig = {
    auth: {
      clientId: '45b8f383-951a-43a7-9793-00fd52492c9d', //client id
      authority: 'https://login.microsoftonline.com/9b43a4f8-f425-4e4a-a11d-c36ea42ca7a3', //tenant id
      redirectUri: 'http://localhost:8100/tab1', //redirect URI
    },
  };

  export const loginRequest = {
    scopes:["openid","profile"]
  }