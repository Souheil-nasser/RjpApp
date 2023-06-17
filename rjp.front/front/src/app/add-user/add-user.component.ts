import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RjpService } from '../services/rjpService';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup; // Marked as undefined

  successMessage: string;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private rjpService: RjpService) {
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  addUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user = {
      name: this.userForm.value.name,
      surname: this.userForm.value.surname
    };

    this.rjpService.addUser(user).subscribe({
      next: (response: any) => {
            this.successMessage = `User created successfully: ${response.name}`;
 // Display success message
        this.userForm.reset(); // Reset the form
        this.errorMessage = ''; // Clear any previous error message
      },
      error: (error: any) => {
        this.errorMessage = error.message; // Display error message
        this.successMessage = ''; // Clear any previous success message
      }
    });
  }
}





