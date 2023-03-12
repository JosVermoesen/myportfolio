import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  returnUrl = '';
  loginForm!: FormGroup;
  isLoading = false;

  tsUsernameMessage = '';
  tsPasswordMessage = '';
  tsPasswordMinMessage = '';
  tsPasswordMaxMessage = '';
  tsLoginSucces = '';
  tsLoginFailed = '';

  validation_messages: any;

  constructor(
    private aService: AccountService,
    private router: Router,
    private ts: TranslateService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
  }

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
        'LOGIN.UsernameMessage',
        'LOGIN.PasswordMessage',
        'LOGIN.PasswordMinMessage',
        'LOGIN.PasswordMaxMessage',
        'LOGIN.LoginSuccess',
        'LOGIN.LoginFailed',
      ])
      .subscribe((translations) => {
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
    this.isLoading = true;

    this.aService.login(this.loginForm.value).subscribe({
      next: () => {
        const showSuccess = async () => {
          await Toast.show({
            text: this.tsLoginSucces,
          });
        };
        showSuccess();
        this.isLoading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err: any) => {
        const showFailed = async () => {
          await Toast.show({
            text: this.tsLoginFailed,
          });
        };
        showFailed();
        this.isLoading = false;
      },
      complete: () => {
        this.router.navigateByUrl('/user');
      },
    });
  }
}
