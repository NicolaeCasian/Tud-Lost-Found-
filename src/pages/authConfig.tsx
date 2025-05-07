// src/auth/authConfig.ts
import { isPlatform } from '@ionic/react';
import { PublicClientApplication, Configuration, PopupRequest } from '@azure/msal-browser';

//
// 1) Define the two redirect URIs *exactly* as you have them in Azure
//
const REDIRECT_WEB    = 'http://localhost:8100/Tab1';  
const REDIRECT_MOBILE = 'msauth://io.ionic.starter/g8yEzGu%2FOSEgBl4iWdvcEpiA7Kg%3D';

export const msalConfig: Configuration = {
  auth: {
    clientId:  '03b9016f-a259-4ab8-90c4-7bf6d5445c1e',
    authority: 'https://login.microsoftonline.com/common',
    // pick the one that matches your runtime
    redirectUri: isPlatform('hybrid') ? REDIRECT_MOBILE : REDIRECT_WEB,
  }
};

export const loginRequest: PopupRequest = {
  scopes: ['openid','profile','User.Read']
};

export const msalInstance = new PublicClientApplication(msalConfig);