export type LoginViewProps = {
    authenticating: boolean;
    errorMessage: string;
    authenticate: (email: string, password: string) => void;
};
