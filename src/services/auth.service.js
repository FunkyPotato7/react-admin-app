import { createAuth0Client } from '@auth0/auth0-spa-js';

const auth0 = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    cacheLocation: 'localstorage',
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "http://localhost:5000/",
    },
});

const AuthService = {
    login: () => auth0.loginWithRedirect(),
    logout: () => auth0.logout({
        logoutParams: {
            returnTo: 'http://localhost:5173/login',
        }
    }),
    getToken: () => auth0.getTokenSilently(),
    getUser: () => auth0.getUser(),
    isAuthenticated: () => auth0.isAuthenticated(),
}

export {
    AuthService,
}