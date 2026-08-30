export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type NewCustomer = Omit<Customer, 'id'>;
//prends toutes les propriétés de Customer, sauf id.
