type AuthResponseStatus = 'success' | 'error';
type AuthForm = 'login' | 'registration';

interface AuthValidationError {
    field: string;
    message: string;
}

interface RegistrationFormValues {
    username: string;
    email: string;
    password: string;
}

interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
}
