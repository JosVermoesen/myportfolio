import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
// import { AccountService } from '../../../shared/services/account.service';

import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  tsTitle = '';
  tsUsername = '';
  tsPassword = '';
  tsRegister = '';
  tsUsernameMessage = '';
  tsPasswordMessage = '';
  tsPasswordMinMessage = '';
  tsPasswordMaxMessage = '';
  tsLoginSucces = '';
  tsLoginFailed = '';

  validation_messages: any;

  constructor(
    // private aService: AccountService,
    private router: Router,
    private ts: TranslateService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initTranslateMessages();
    this.loginForm = this.fb.group({
      username: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(36),
        ],
      }),
    });
  }

  async initTranslateMessages() {
    this.ts
      .get([
        'LOGIN.Title',
        'LOGIN.Username',
        'LOGIN.Password',
        'LOGIN.Register',
        'LOGIN.UsernameMessage',
        'LOGIN.PasswordMessage',
        'LOGIN.PasswordMinMessage',
        'LOGIN.PasswordMaxMessage',
        'LOGIN.LoginSuccess',
        'LOGIN.LoginFailed',
      ])
      .subscribe((translations) => {
        this.tsTitle = translations['LOGIN.Title'];
        this.tsUsername = translations['LOGIN.Username'];
        this.tsPassword = translations['LOGIN.Password'];
        this.tsRegister = translations['LOGIN.Register'];
        this.tsUsernameMessage = translations['LOGIN.UsernameMessage'];
        this.tsPasswordMessage = translations['LOGIN.PasswordMessage'];
        this.tsPasswordMinMessage = translations['LOGIN.PasswordMinMessage'];
        this.tsPasswordMaxMessage = translations['LOGIN.PasswordMaxMessage'];
        this.tsLoginSucces = translations['LOGIN.LoginSuccess'];
        this.tsLoginFailed = translations['LOGIN.LoginFailed'];
      });

    this.validation_messages = {
      username: [{ type: 'required', message: this.tsUsernameMessage }],
      password: [
        { type: 'required', message: this.tsPasswordMessage },
        {
          type: 'minlength',
          message: this.tsPasswordMinMessage,
        },
        {
          type: 'maxlength',
          message: this.tsPasswordMaxMessage,
        },
      ],
    };
  }

  clear() {
    this.loginForm.reset();
  }

  login() {
    console.log(this.loginForm.value);
    /* this.isLoading = true;
    this.aService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .subscribe(
        () => {
          const showSuccess = async () => {
            await Toast.show({
              text: this.tsLoginSucces,
            });
          };
          showSuccess();
          this.isLoading = false;
        },
        (error: any) => {
          const showFailed = async () => {
            await Toast.show({
              text: this.tsLoginFailed,
            });
          };
          showFailed();
          this.isLoading = false;
        },
        () => {
          this.router.navigateByUrl('/user');
          // console.log('whatever');
        }
      ); */
  }
}
