import { Component, OnInit } from '@angular/core';
import { RjpService } from '../services/rjpService';
import { User } from '../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users: User[] = [];

  constructor(private router: Router, private rjpService: RjpService) {}
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.rjpService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
      },
      error: (error: any) => {
        console.error('Error retrieving users:', error);
      }
    });
  }

  
  goToUser(userId: number) {
    this.router.navigate(['show-user', userId]);
  } }