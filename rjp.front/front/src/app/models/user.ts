export interface User {
   Id: number;
   Name: string;
   Surname: string;
   Accounts: Account[];
 }
 
 export interface Account {
   Balance: number;
   Transactions: Transaction[];
 }
 
 export interface Transaction {
   Amount: number;
   TransactionDate: string;
 }