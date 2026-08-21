export interface Account {
  accountId?:number;
  balance?:number;
  createdAt?:string;
  type?:string;
  customerId?:number;

}
export enum RequestStatus {
  SUCCESS = 0,
  ERROR = 1
}
 export interface AccountListState{
    accounts?: Account[];
    status?: RequestStatus;
    errorMessage?: string;

 }
