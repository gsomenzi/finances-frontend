import HttpClient from 'tools/HttpClient';
import { AccountsListing } from 'types/AccountsListing';

export default class AccountService {
    public static async getAll(): Promise<AccountsListing> {
        return HttpClient.get('/financial-accounts');
    }

    public static async remove(id: number): Promise<number> {
        return HttpClient.delete(`/financial-accounts/${id}`);
    }
}
