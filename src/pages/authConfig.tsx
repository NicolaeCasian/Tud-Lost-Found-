export const msalConfig = {
    auth: {
      clientId: '99908f5c-a126-4ac7-be48-2a123cd17dd9', //client id
      authority: 'https://login.microsoftonline.com/consumers', //tenant id
      redirectUri: 'http://localhost:8100/tab1', //redirect URI
    },
  };

  export const loginRequest = {
    scopes:["openid","profile","User.Read"]
  }