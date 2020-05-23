const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const errorMessage = formControl.querySelector('small');
    errorMessage.innerText = message;
}

const showSuccess = input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const fieldRequired = inputArray => {
    inputArray.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${formatName(input)} is required!`)
        } else {
            showSuccess(input);
        }
    })
}

const formatName = name => {
    return name.id.charAt(0).toUpperCase() + name.id.slice(1);
}

const emailCheck = () => {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regExp.test(email.value.trim())) {
        showSuccess(email);
    } else {
        showError(email, 'Email is not valid!');
    }
}

const comparePasswords = (pwd1, pwd2) => {
    console.log(pwd1.value)
    if (pwd1.value !== pwd2.value) {
        showError(pwd2, 'Passwords do not match!')
    }
}

const checkPasswordLength = input => {
    if (input.value.length < 6) {
        showError(input, 'Password need to be at least 6 characters long!');
    } else if (input.value.length > 15) {
        showError(input, 'Password should be less then 15 characters!');
    } else {
        showSuccess(input);
    }
}

const formCheck = () => {
    fieldRequired([username, email, password, password2]);
    emailCheck();
    comparePasswords(password, password2);
    checkPasswordLength(password);
}


form.addEventListener('submit', e => {
    e.preventDefault();

    formCheck();
});