export const initialState = {
    scene: 'login',
    loginForm: {
        username: '',
        password: '',
        errors: {},
    },
    registrationForm: {
        errors: {},
    },
};

export default {
    SET_SCENE: (state, scene) => ({
        ...state,
        scene,
        error: false,
    }),
    SET_LOGIN_USERNAME: (state, username) => ({
        ...state,
        loginForm: {
            ...state.loginForm,
            username,
        },
    }),
    SET_LOGIN_PASSWORD: (state, password) => ({
        ...state,
        loginForm: {
            ...state.loginForm,
            password,
        },
    }),
    SET_LOGIN_ERRORS: (state, errors) => ({
        ...state,
        loginForm: {
            ...state.loginForm,
            errors,
        },
    }),
    SET_REGISTRATION_ERRORS: (state, errors) => ({
        ...state,
        registrationForm: {
            ...state.registrationForm,
            errors,
        },
    }),
};

export const setScene = scene => ({
    type: 'SET_SCENE',
    payload: scene,
});

export const setLoginUsername = username => ({
    type: 'SET_LOGIN_USERNAME',
    payload: username,
});

export const setLoginPassword = password => ({
    type: 'SET_LOGIN_PASSWORD',
    payload: password,
});

export const setLoginErrors = errors => ({
    type: 'SET_LOGIN_ERRORS',
    payload: errors || {},
});

export const setRegistrationErrors = errors => ({
    type: 'SET_REGISTRATION_ERRORS',
    payload: errors || {},
});
