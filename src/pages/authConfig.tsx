export const msalConfig = {
    auth: {
   
      clientId: '66e000f7-e91b-4972-9974-c6745914d1e4', //client id
      authority: 'https://login.microsoftonline.com/common', //tenant id
      redirectUri: 'http://localhost:8100/Tab1', //redirect URI
    },
  };

  export const loginRequest = {
    scopes:["openid","profile","User.Read"]
  }