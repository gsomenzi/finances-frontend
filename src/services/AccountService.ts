import { QueryFunctionContext } from 'react-query';
import HttpClient from 'tools/HttpClient';
import { Account } from 'types/Account';
import { AccountsListing } from 'types/AccountsListing';
import { QueryStrings } from 'types/QueryStrings';

export default class AccountService {
    
    public static async getAll({ queryKey }: QueryFunctionContext<[string, QueryStrings]>): Promise<AccountsListing> {
        console.log(queryKey);
        return HttpClient.get('/financial-accounts', queryKey[1]);
    }

    public static async create(newAccountData: Partial<Account>): Promise<Account> {
        return HttpClient.post(`/financial-accounts`, newAccountData);
    }

    public static async update(accountData: Partial<Account>): Promise<Account> {
        return HttpClient.put(`/financial-accounts/${accountData.id}`, accountData);
    }

    public static async remove(id: number): Promise<number> {
        return HttpClient.delete(`/financial-accounts/${id}`);
    }
}
