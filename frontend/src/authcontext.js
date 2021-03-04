import { createContext} from 'react';

const authContext = createContext({
    authenticated: false,
    username: "",
    role: "visitor",
    token: ""
});

export const AuthContextType = authContext;
export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;