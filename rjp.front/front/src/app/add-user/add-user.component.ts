import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  name: string= '';
  surname: string = ''; 

  constructor(private http: HttpClient) { }

  onSubmit() {
    const user = {
      name: this.name,
      surname: this.surname
    };

    this.http.post<any>('https://localhost:7146/api/Users', user).subscribe(response => {
      console.log(JSON.stringify(response));
      // Handle the response as needed
    });
  }
}
