import HttpClient from 'tools/HttpClient';
import { AuthData } from 'types/AuthData';
import { User } from 'types/User';
import { UserRegistrationData } from 'types/UserRegistrationData';

type ResType = {
    auth_data: AuthData;
    user_data: User;
}

export default class UserService {
    public static async register(userData: UserRegistrationData): Promise<ResType | Error> {
        const ua = navigator.userAgent;
        const device_name = ua.split(' ')[0];
        return HttpClient.post('/register', {...userData, device_name});
    }

    public static async persistUserData(userData: User): Promise<User> {
        localStorage.setItem('user_data', JSON.stringify(userData));
        return userData;
    }
}
