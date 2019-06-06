type Tab = 'login' | 'registration';
type LoginFormFields = 'username' | 'password';
type RegistrationFormFields = 'username' | 'email' | 'password';
type LoginErrors = { [K in LoginFormFields]?: string };
type RegistrationErrors = { [K in RegistrationFormFields]?: string };

