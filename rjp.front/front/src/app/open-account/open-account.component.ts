import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RjpService } from '../services/rjpService';

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.css']
})
export class OpenAccountComponent implements OnInit {
  openAccountForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  users: any[] = [];
  constructor(private formBuilder: FormBuilder, private rjpService: RjpService) { 
    this.openAccountForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      initialCredit: ['', Validators.required]
    });
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {
    this.getUsers(); // Call the getUsers method to fetch the list of users
  }
  getUsers() {
    this.rjpService.getUsers().subscribe({
      next:  (response: any) => {
        this.users = response; // Assign the fetched users to the users array
      },
      error:  (error: any) => {
        console.log(error);
      }
    });

  }
 
  openAccount() {
    if (this.openAccountForm.valid) {
      const customerId = this.openAccountForm.get('customerId')!.value;
      const initialCredit = this.openAccountForm.get('initialCredit')!.value;
  
      this.rjpService.openAccount(customerId, initialCredit).subscribe(
    {     next: (response: any) => {
          this.successMessage = response;
          this.errorMessage = '';
          this.openAccountForm.reset();
        },
        error: (error: any) => {
          this.errorMessage = error.message;
          this.successMessage = '';
        }}
      );
    }
  }
}
