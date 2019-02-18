export const tryToRegister = ({
    username,
    password,
    email,
}) => {
    mp.trigger('fromBrowser.handleRegistration', username, password, email);
};
