import { Account } from "./Account";
import { ApiListResponse } from "./_ApiListResponse";

export interface AccountsListing extends ApiListResponse {
    data: Account[];
}