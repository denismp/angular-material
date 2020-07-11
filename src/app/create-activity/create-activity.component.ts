import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  signupForm: FormGroup;
  forbiddenactivitynames = ['Chris', 'Anna'];

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
   * get the activityname error message if there is an error
   * @returns nothing or a string
   */
  getActivitynameErrorMessage(): string {
    if (this.signupForm.get('activityname').hasError('required')) {
      return 'You must enter a value';
    }

    return this.signupForm.get('activityname').hasError('activityname') ? 'Not a valid activityname' : '';
  }

  /**
   * get the description error message if there is an error
   * @returns nothing or a string
   */
  getActivitydescriptionErrorMessage(): string {
    if (this.signupForm.get('description').hasError('required')) {
      return 'You must enter a description';
    }

    return this.signupForm.get('description').hasError('description') ? 'Not a valid description' : '';
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
   * get the phone error message if there is an error
   * @returns nothing or a string
   */
  getPhoneErrorMessage(): string {
    if (this.signupForm.get('phone').hasError('required')) {
      return 'You must enter a phone number';
    }

    return this.signupForm.get('phone').hasError('phone') ? 'Not a valid phone' : '';
  }

  /**
   * get the address1 error message if there is an error
   * @returns nothing or a string
   */
  getAddress1ErrorMessage(): string {
    if (this.signupForm.get('address1').hasError('required')) {
      return 'You must enter an address1';
    }

    return this.signupForm.get('address1').hasError('address1') ? 'Not a valid address1' : '';
  }

  /**
   * get the address2 error message if there is an error
   * @returns nothing or a string
   */
  getAddress2ErrorMessage(): string {
    if (this.signupForm.get('address2').hasError('required')) {
      return 'You must enter an address2';
    }

    return this.signupForm.get('address2').hasError('address2') ? 'Not a valid address2' : '';
  }

  /**
   * get the city error message if there is an error
   * @returns nothing or a string
   */
  getCityErrorMessage(): string {
    if (this.signupForm.get('city').hasError('required')) {
      return 'You must enter a city';
    }

    return this.signupForm.get('city').hasError('city') ? 'Not a valid city' : '';
  }

  /**
   * get the state error message if there is an error
   * @returns nothing or a string
   */
  getStateErrorMessage(): string {
    if (this.signupForm.get('state').hasError('isNotTwoChars')) {
      return 'You must enter a two character state';
    }

    return this.signupForm.get('state').hasError('state') ? 'Not a valid state.  Must be two characters' : '';
  }

  /**
   * get the zip error message if there is an error
   * @returns nothing or a string
   */
  getZipErrorMessage(): string {
    if (this.signupForm.get('zip').hasError('isNotNumber')) {
      return 'You must enter a zip code';
    }

    return this.signupForm.get('zip').hasError('zip') ? 'Not a valid zip' : '';
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
    console.log('activityname=' + this.signupForm.get('activityname').value);
    console.log('description=' + this.signupForm.get('description').value);
    console.log('email=' + this.signupForm.get('email').value);
    console.log('phone=' + this.signupForm.get('phone').value);
    console.log('address1=' + this.signupForm.get('address1').value);
    console.log('address2=' + this.signupForm.get('address2').value);
    console.log('city=' + this.signupForm.get('city').value);
    console.log('state=' + this.signupForm.get('state').value);
    console.log('zip=' + this.signupForm.get('zip').value);
    this.signupForm.reset();
    this.initSignupForm();
  }

  /**
   * check for forbbin names
   * @param control
   * @requires true or null
   */
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenactivitynames.indexOf(control.value) !== -1) {
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
   * check that the control is not a number
   * @param control
   * @returns true or null
   */
  isNotNumber(control: FormControl): { [s: string]: boolean } {
    if (isNaN(control.value)) {
      return { 'isNotNumber': true };
    }
    return null;
  }

  /**
   * check that the control is not two characters
   * @param control
   * @returns true or null
   */
  isNotTwoCharacters(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value.length !== 2) {
      return { 'isNotTwoChars': true }
    }
    return null;
  }

  /**
   * Initialize the signupForm controls.
   */
  private initSignupForm(): void {
    this.signupForm = new FormGroup({
      'activityname': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'description': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'phone': new FormControl(null, [Validators.required]),
      'address1': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'address2': new FormControl(null, []),
      'city': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required, this.isNotTwoCharacters]),
      'zip': new FormControl(null, [Validators.required, Validators.minLength(5), this.isNotNumber]),
      'hobbies': new FormArray([])
    });
  }

}
