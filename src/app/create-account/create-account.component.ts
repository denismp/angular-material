import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  get hobbies(): FormArray {
    return this.signupForm.get('hobbies') as FormArray;
 }

  constructor() {

  }

  ngOnInit() {
    this.initSignupForm();
  }

  onSubmit() {
    console.log(this.signupForm);
    console.log('username='+this.signupForm.get('username').value);
    console.log('email='+this.signupForm.get('email').value);
    console.log("gender="+this.signupForm.get('gender').value);
    //this.signupForm.reset();
  }

  onAddHobby(event: Event) {
    console.log(event);

    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // private initSignupForm(): void {
  //   this.signupForm = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     gender: ['male', Validators.required],
  //     hobbies: this.formBuilder.array([])
  //   });
  // }
  private initSignupForm(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
}
