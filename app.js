
const formGroup = document.getElementById('form-group');
const name = document.getElementById('name');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password1 = document.getElementById('password1');


// Validator class
class FormValidator{
  constructor(){
  }

  // Show error message and red border when input field is not valid
  static alertError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = message;
  }

  // show green bordr when input field is valid
  static alertSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

  static makeFirstCharacterUpperCase(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  // Check username length
  checkUsernameLength(input, min, max){
    if(input.value.trim().length < min) {
      FormValidator.alertError(input,
         `${FormValidator.makeFirstCharacterUpperCase(input)} must be more than ${min} characters long`);
    } else if(input.value.trim().length > max) {
      FormValidator.alertError(input,
         `${FormValidator.makeFirstCharacterUpperCase(input)} must be less ${max} characters long`);
    } else {
      FormValidator.alertSuccess(input);
    }
  }

  // Check if email is valid
  checkEmail(input){
    const em = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(em.test(input.value.trim())){
      FormValidator.alertSuccess(input);
    } else {
      FormValidator.alertError(input, 'Email is not valid')
    }
  }

  // Check to see if password meets all the criteria
  checkValidPassword(input){
      const msg = 'Password must be at least 8 characters long, include at least 1 lowercase and uppercase letter, 1 number and 1 special character from !@#$%^&*';
    const str = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    if(str.test(input.value.trim())){
      FormValidator.alertSuccess(input);
    } else {
      FormValidator.alertError(input, msg);
    }
  }

  // check to see if two passwords match
  checkPassWordIsMatched(input1, input2){
    if(input1.value !== input2.value){
      FormValidator.alertError(input2, 'Password do not match');
    }
  }

  // Check form field
  checkFormField(inputArr){
    inputArr.forEach(function(input) {
      console.log(input.value)
      if(input.value.trim() === '') {
        FormValidator.alertError(input, `${FormValidator.makeFirstCharacterUpperCase(input)} is required`);
      } else {
        FormValidator.alertSuccess(input);
      }
    });
  }
};

// Instantiate the Form validator class
const form = new FormValidator

// Event listener when the form is submitted
formGroup.addEventListener('submit', e => {
  e.preventDefault();
  form.checkFormField([name, username, email, password, password1]);
  form.checkEmail(email);
  form.checkUsernameLength(username, 3, 20);
  form.checkPassWordIsMatched(password, password1);
  form.checkValidPassword(password);
});