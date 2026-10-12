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

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  CURRENT_ACCOUNT: 'Compte courant',
  SAVING_ACCOUNT: 'Compte d’épargne'
};


export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  CREATED: 'Créé',
  ACTIVATED: 'Actif',
  SUSPENDED: 'Suspendu',
  BLOCKED: 'Bloqué'
};
