// src/auth/authConfig.ts

import { isPlatform } from '@ionic/react';
import { PublicClientApplication, Configuration, PopupRequest } from '@azure/msal-browser';

// Define redirect URIs exactly as registered in Azure
const REDIRECT_WEB    = 'http://localhost:8100/Tab1';
export const REDIRECT_MOBILE = 'msauth://io.ionic.starter/g8yEzGu%2FOSEgBl4iWdvcEpiA7Kg%3D';

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId:  '03b9016f-a259-4ab8-90c4-7bf6d5445c1e',
    authority: 'https://login.microsoftonline.com/common',
    // Choose proper redirect URI for browser vs. device
    redirectUri: isPlatform('hybrid') ? REDIRECT_MOBILE : REDIRECT_WEB,
  }
};

// Scopes for login
export const loginRequest: PopupRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
};



// Create MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);
