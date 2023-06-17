import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/env'; 
import { Account, Transaction, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RjpService {
  private apiUrl = environment.apiUrl; // API base URL

  constructor(private http: HttpClient) {}
  openAccount(customerId: number, initialCredit: number): Observable<any> {
    const url = `${this.apiUrl}/accounts`;
    const account = {
      UserId: customerId,
      Balance: initialCredit
    };
    return this.http.post<any>(url, account);
  }
  
  addUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.post<any>(url, user);
  }

  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<any>(url).pipe(map((response: any) => response.$values));
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/users/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const user: User = {
          Name: response.Name,
          Id: response.Id,
          Surname: response.Surname,
          Accounts: response.Accounts.$values.map((accountData :any) => {
            const account: Account = {
              Balance: accountData.Balance,
              Transactions: accountData.Transactions.$values.map((transactionData:any) => {
                const transaction: Transaction = {
                  Amount: transactionData.Amount,
                  TransactionDate: transactionData.TransactionDate
                };
                return transaction;
              })
            };
            return account;
          })
        };
        return user;
      })
    );
  }

 
}
