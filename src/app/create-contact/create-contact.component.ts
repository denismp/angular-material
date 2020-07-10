import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddencontactnames = ['Chris', 'Anna'];

  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    let mrButton: MatRadioButton = mrChange.source;
    console.log(mrButton.name);
    console.log(mrButton.checked);
    console.log(mrButton.inputId);
  }
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
   * get the contactname error message if there is an error
   * @returns nothing or a string
   */
  getContactnameErrorMessage(): string {
    if (this.signupForm.get('contactname').hasError('required')) {
      return 'You must enter a value';
    }

    return this.signupForm.get('contactname').hasError('contactname') ? 'Not a valid contactname' : '';
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
    console.log('contactname=' + this.signupForm.get('contactname').value);
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
    if (this.forbiddencontactnames.indexOf(control.value) !== -1) {
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

  /**
   * Initialize the signupForm controls.
   */
  private initSignupForm(): void {
    this.signupForm = new FormGroup({
      'contactname': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }


}
