import React from 'react';
import { createContext, useReducer } from "react";

const Context = createContext({});

const initialState = {
    uid: '',
    id: '',
    extra: {}
    // 기본 값들
}

function reducer(state, action) {
    switch(action.type) {
        case 'SET_UID':
            return {
                ...state,
                uid: action.uid,
                id: action.id,
                extra: action.extra
            }
        case 'SET_EXTRA':
            return {
                ...state,
                extra: action.extra
            }
        default:
            return state;
    }
}

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Context.Provider value={value}>{children}</Context.Provider> ;
};

export { Context, Provider };
