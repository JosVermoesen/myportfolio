import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  returnUrl = '';
  registerForm!: FormGroup;
  user!: User;
  maxDate!: Date;
  maxAge!: string;
  isLoading = false;

  tsUserMessage!: string;
  tsKnownAsMessage!: string;
  tsEmailMessage!: string;
  tsEmailPattern!: string;
  tsDateOfBirthMessage!: string;
  tsBerNumberMessage!: string;
  tsBerNumberMinMaxMessage!: string;
  tsPasswordMessage!: string;
  tsPasswordMinMessage!: string;
  tsPasswordMaxMessage!: string;

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
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
    this.maxAge = this.maxDate.toISOString();
    this.maxAge = this.maxAge.slice(0, 10);
    this.createRegisterForm();
  }

  initTranslateMessages() {
    /* this.translate.get('REGISTER.UsernameMessage').subscribe(value => {
      this.userMessage = value;
    }); */
    this.ts.get('REGISTER.KnownAsMessage').subscribe((value) => {
      this.tsKnownAsMessage = value;
    });
    this.ts.get('REGISTER.EmailMessage').subscribe((value) => {
      this.tsEmailMessage = value;
    });
    this.ts.get('REGISTER.EmailPattern').subscribe((value) => {
      this.tsEmailPattern = value;
    });
    /* this.translate.get('REGISTER.DateOfBirthMessage').subscribe(value => {
      this.dateOfBirthMessage = value;
    }); */
    this.ts.get('REGISTER.BerNumberMessage').subscribe((value) => {
      this.tsBerNumberMessage = value;
    });
    this.ts.get('REGISTER.BerNumberMinMaxMessage').subscribe((value) => {
      this.tsBerNumberMinMaxMessage = value;
    });
    this.ts.get('REGISTER.PasswordMessage').subscribe((value) => {
      this.tsPasswordMessage = value;
    });
    this.ts.get('REGISTER.PasswordMinMessage').subscribe((value) => {
      this.tsPasswordMinMessage = value;
    });
    this.ts.get('REGISTER.PasswordMaxMessage').subscribe((value) => {
      this.tsPasswordMaxMessage = value;
    });

    this.validation_messages = {
      knownAs: [{ type: 'required', message: this.tsKnownAsMessage }],
      email: [
        { type: 'required', message: this.tsEmailMessage },
        { type: 'pattern', message: this.tsEmailPattern },
      ],
      // dateOfBirth: [{ type: 'required', message: this.dateOfBirthMessage }],
      berNumber: [
        { type: 'required', message: this.tsBerNumberMessage },
        {
          type: 'minlength',
          message: this.tsBerNumberMinMaxMessage,
        },
        {
          type: 'maxlength',
          message: this.tsBerNumberMinMaxMessage,
        },
      ],
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

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['user220750', Validators.required],
      dateOfBirth: ['1984-05-16', Validators.required],
      berNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      gender: ['male'],
      knownAs: ['', Validators.required],
      clientNumber: ['220750'],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      city: ['Herdersem', Validators.required],
      country: ['Belgium', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(36),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  register() {
    if (this.registerForm.valid) {
      const userEmail = this.registerForm.value.email;
      this.registerForm.value.username = userEmail;
      this.user = Object.assign({}, this.registerForm.value);
      this.isLoading = true;

      this.aService.register(this.user).subscribe({
        next: () => {
          this.isLoading = false;
          this.ts.get('REGISTER.RegisterSuccess').subscribe((message) => {
            const showSuccess = async () => {
              await Toast.show({
                text: message,
                duration: 'long',
              });
            };
            showSuccess();
          });
        },
        error: (err: any) => {
          this.isLoading = false;
          this.ts
            .get('REGISTER.RegisterFailed')
            .subscribe((message: string) => {
              const showFailed = async () => {
                await Toast.show({
                  text: message,
                });
              };
              showFailed();
            });
        },
        complete: () => {
          this.router.navigateByUrl('/user');
        },
      });
    }
  }
}
