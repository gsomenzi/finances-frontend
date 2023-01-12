import HttpClient from 'tools/HttpClient';
import { AccountsListing } from 'types/AccountsListing';

export default class AccountService {
    public static async getAll(): Promise<AccountsListing> {
        return HttpClient.get('/financial-accounts');
    }
}
