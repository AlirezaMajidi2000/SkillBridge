const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const phone = document.querySelector('#phone')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirmPassword')
const passwordHint = document.querySelector('.password-hint')

firstName.addEventListener('input', function () {
    if (!validateInput(firstName.value.trim(), regexPatterns.firstName)) {
        passwordHint.innerHTML = 'نام نامعتبر'
        passwordHint.style.color = 'red'
    }else{
        passwordHint.innerHTML = ''
    }
});

lastName.addEventListener('input', function () {
    if (!validateInput(lastName.value.trim(), regexPatterns.lastName)) {
        passwordHint.innerHTML = 'نام خانوادگی نامعتبر'
        passwordHint.style.color = 'red'
    }else{
        passwordHint.innerHTML = ''
    }
});

phone.addEventListener('input', function () {
    if (!validateInput(phone.value.trim(), regexPatterns.phone)) {
        passwordHint.innerHTML = 'شماره موبایل نامعتبر'
        passwordHint.style.color = 'red'
    }else{
        passwordHint.innerHTML = ''
    }
});

email.addEventListener('input', function () {
    if (!validateInput(email.value.trim(), regexPatterns.email)) {
        passwordHint.innerHTML = 'ایمیل نامعتبر'
        passwordHint.style.color = 'red'
    }else{
        passwordHint.innerHTML = ''
    }
});

password.addEventListener('input', function () {
    if (!validateInput(password.value, regexPatterns.password)) {
        passwordHint.innerHTML = 'رمز عبور نامعتبر'
        passwordHint.style.color = 'red'
    }else{
        passwordHint.innerHTML = ''
    }
});

confirmPassword.addEventListener('input', function () {
    if (password.value !== confirmPassword.value) {
        passwordHint.innerHTML = 'رمز عبور نامعتبر'
        passwordHint.style.color = 'red'
    }else{
        passwordHint.innerHTML = ''
    }
});