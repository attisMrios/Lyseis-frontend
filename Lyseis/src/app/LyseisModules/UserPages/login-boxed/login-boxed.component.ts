import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ResponseModel from 'src/app/base/response.model';
import Utils from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { LoginService } from './login-boxed.service';

@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})
export class LoginBoxedComponent implements OnInit {

  formControls: FormGroup = this.formBuilder.group({});

  constructor(private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,) {

  }
  ngOnInit(): void {
    this.formControls = this.formBuilder.group({
      userName: ['', [Validators.required,]],
      password: ['', [Validators.required]]
    });
  }

  Login() {
    try {
      if (this.formControls?.valid) {

        this.loginService.GetToken(this.formControls.controls['userName'].value, this.formControls.controls['password'].value)
          .subscribe({
            next: (response: ResponseModel<{ token: string, expirationDate: Date }>) => {
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
            },
            error: (error: HttpErrorResponse) => {
              Swal.fire('Algo salió mal', error.error, 'error');
            }
          });
      } else {
        Swal.fire('Faltó algo?', 'Por favor diligencie los campos', 'question');
      }
    } catch (error) {
      console.log(error);
    }
  }

}
