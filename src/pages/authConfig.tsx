export const msalConfig = {
    auth: {
   
      clientId: '03b9016f-a259-4ab8-90c4-7bf6d5445c1e', //client id
      authority: 'https://login.microsoftonline.com/common', //tenant id
      redirectUri: 'http://localhost:8100/Tab1', //redirect URI
    },
  };

  export const loginRequest = {
    scopes:["openid","profile","User.Read"]
  }