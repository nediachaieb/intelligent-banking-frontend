import { Customer } from './customer.model';
import { RequestStatus } from './request-status.model';

export type AccountType =
  'CURRENT_ACCOUNT'
  | 'SAVING_ACCOUNT';

export type AccountStatus =
  'CREATED'
  | 'ACTIVATED'
  | 'SUSPENDED'
  | 'BLOCKED';

export interface Account {

  accountId?: number;

  createdAt?: string;

  balance: number;

  currency: string;

  type: AccountType;

  status: AccountStatus;

  customerId: number;

  customer?: Customer;
}

export type NewAccount =
  Omit<
    Account,
    'accountId' | 'createdAt' | 'customer'
  >;

 export interface AccountListState{
    accounts: Account[];
    status: RequestStatus;
    errorMessage?: string;

 }


