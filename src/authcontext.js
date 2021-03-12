import { Component } from 'react';
import { createContext} from 'react';

const authContext = createContext({
    authenticated: localStorage.getItem('authenticated') ? Boolean(localStorage.getItem('authenticated')) : false,
    user: localStorage.getItem('user') || null,
    role: localStorage.getItem('role') || "visitor",
    token: localStorage.getItem('token') || null,
});

export const AuthContextType = authContext;
export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;