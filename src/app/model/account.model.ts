import { Customer } from './customer.model';

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

// export type NewAccount = Pick<
//   Account,
//   'balance'
//   | 'currency'
//   | 'type'
//   | 'status'
//   | 'customerId'
// >;
export type NewAccount = Omit<Account, ' accountId , createdAt'>;
export enum RequestStatus {
  SUCCESS = 0,
  ERROR = 1
}
 export interface AccountListState{
    accounts?: Account[];
    status?: RequestStatus;
    errorMessage?: string;

 }


