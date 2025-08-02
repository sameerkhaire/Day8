import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',

})
export class SignupComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }


  userSignUp() {
    if (this.userForm.valid) {
      this.authService.UserSignUp(this.userForm.value).subscribe(res => {
        if (res.status == 201) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
