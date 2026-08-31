import { RequestStatus } from './request-status.model';

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type NewCustomer = Omit<Customer, 'id'>;
//prends toutes les propriétés de Customer, sauf id.
export interface CustomerListState {
  customers: Customer[];
  status: RequestStatus;
  errorMessage?: string;
}
