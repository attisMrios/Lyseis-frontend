import { Component, OnInit } from '@angular/core';
import ResponseModel from '../base/response.model';
import Utils from '../libs/utils';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formControls: FormGroup = this.formBuilder.group({});

  constructor(private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,) {

  }
  ngOnInit(): void {
    this.formControls = this.formBuilder.group({
      userName: ['', [Validators.required, ]],
      password: ['', [Validators.required]]
    });
  }

  Login() {
    try {
      if (this.formControls?.valid) {
        let params = new URLSearchParams();
        params.append("userName", this.formControls.controls['userName'].value)
        params.append("password", this.formControls.controls['password'].value)

        this.loginService.GetToken().subscribe((response: ResponseModel<{ token: string, expirationDate: Date }>) => {
          if (response.status == 200) {
            let token = response.data?.token;
            let expirationDate = response.data?.expirationDate;
            if (token && expirationDate) {

              let tokenWasSaved = Utils.SetSessionStorage('token', token);
              let expirationDateWasSaved = Utils.SetSessionStorage('token-expiration-date', expirationDate.toString());

              if (tokenWasSaved && expirationDateWasSaved) {
                // redirect to layout
                this.router.navigate(['/']);
              }
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

}
