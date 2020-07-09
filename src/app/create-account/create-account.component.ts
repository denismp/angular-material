import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    let mrButton: MatRadioButton = mrChange.source;
    console.log(mrButton.name);
    console.log(mrButton.checked);
    console.log(mrButton.inputId);
  }
  //   get hobbies(): FormArray {
  //     return this.signupForm.get('hobbies') as FormArray;
  //   }
  // get controls() {
  //   return (this.signupForm.get('hobbies') as FormArray).controls;
  // }

  /**Fixing a Bug
In the next lecture, we'll add some code to access the controls of our form array:

*ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"

This code will fail as of the latest Angular version.

You can fix it easily though. Outsource the "get the controls" logic into a method of your component code (the .ts file):

getControls() {
  return (<FormArray>this.signupForm.get('hobbies')).controls;
}
In the template, you can then use:

*ngFor="let hobbyControl of getControls(); let i = index"

Alternatively, you can set up a getter and use an alternative type casting syntax:

get controls() {
  return (this.signupForm.get('hobbies') as FormArray).controls;
}
and then in the template:

*ngFor="let hobbyControl of controls; let i = index"

This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).

 */
  constructor() {
  }

  /**
   *  This method gets the hobbies ForArray control called by the template
   *  @returns FormArray controls based on the index in the html template.
   */
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  ngOnInit() {
    this.initSignupForm();
  }

  /**
   * get the username error message if there is an error
   * @returns nothing or a string
   */
  getUsernameErrorMessage(): string {
    if (this.signupForm.get('username').hasError('required')) {
      return 'You must enter a value';
    }

    return this.signupForm.get('username').hasError('username') ? 'Not a valid username' : '';
  }

  /**
   * get the email error message if there is an error
   * @returns nothing or a string
   */
  getEmailErrorMessage(): string {
    if (this.signupForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.signupForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  /**
   * get the overall form error message if there is an error
   * @returns nothing or a string
   */
  getFormErrorMessage(): string {
    return this.signupForm.invalid ? 'Please enter valid data!' : '';
  }

  /**
   * submit the data from the html template.
   */
  onSubmit() {
    console.log(this.signupForm);
    console.log('username=' + this.signupForm.get('username').value);
    console.log('email=' + this.signupForm.get('email').value);
    console.log("gender=" + this.signupForm.get('gender').value);
    for (let i = 0; i < (<FormArray>this.signupForm.get('hobbies')).controls.length; i++) {
      let hobbie = (<FormArray>this.signupForm.get('hobbies')).controls[i].value;
      console.log('hobbie=' + hobbie);
    }
    this.signupForm.reset();
    this.initSignupForm();
  }

  /**
   * Add a dynamic FormArray control for the hobbies.  The controlName will be the index i from the template
   */
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  /**
   * check for forbbin names
   * @param control
   * @requires true or null
   */
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  /**
   * check for forbidden emails.
   * @param control
   * @returns a Promise or Observable
   */
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

  /**
   * Initialize the signupForm controls.
   */
  private initSignupForm(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
}
