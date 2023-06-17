import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RjpService } from '../services/rjpService';
import { Account, User } from '../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  userId!: number;
  user!: User;
  errorMessage: string;
  totalBalance: number=0;
  constructor(
    private route: ActivatedRoute,
    private rjpService: RjpService,
    private router: Router
) { 
    this.errorMessage = '';

  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('Id');
    if (idParam) {
      this.userId = +idParam;
      this.getUser();
    } else {
      this.router.navigate(['/']);
    }
  }
  calculateTotalBalance() {
    this.totalBalance = this.user.Accounts.reduce(
      (total: number, account: Account) => total + account.Balance,
      0
    );
  } 
  getUser() {
    this.rjpService.getUserById(this.userId).subscribe({
      next: (response: User) => {
        this.user = response;
        this.calculateTotalBalance();
        this.errorMessage = '';
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      }
    });
  }
  
}







