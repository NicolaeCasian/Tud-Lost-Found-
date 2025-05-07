// src/auth/authConfig.ts

import { PublicClientApplication, Configuration, PopupRequest } from "@azure/msal-browser";

// MSAL configuration for Azure AD
export const msalConfig: Configuration = {
  auth: {
    clientId: '03b9016f-a259-4ab8-90c4-7bf6d5445c1e',       // Your Azure AD app client ID
    authority: 'https://login.microsoftonline.com/common', // Tenant or common endpoint
    redirectUri: 'http://localhost:8100/Tab1',             // Your Ionic redirect URI
  },
};

// Scopes to request during login
export const loginRequest: PopupRequest = {
  scopes: ["openid", "profile", "User.Read"]
};

// Create an MSAL instance for use throughout the app
export const msalInstance = new PublicClientApplication(msalConfig);
