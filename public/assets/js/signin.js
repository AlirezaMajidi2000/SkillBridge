
const userName = document.querySelector('#email');
const password = document.querySelector('#password');
const userNameHint = document.querySelector('#userNameHint');
const passwordHint = document.querySelector('#passwordHint');

userName.addEventListener('input', function () {
    const value = userName.value.trim();

    const pattern = value.includes('@')
        ? regexPatterns.email
        : regexPatterns.phone;

    if (!validateInput(value, pattern)) {
        userNameHint.innerHTML = 'ایمیل یا شماره موبایل نامعتبر است';
        userNameHint.style.color = 'red';
    } else {
        userNameHint.innerHTML = '';
    }
});

password.addEventListener('input', function () {
    const value = password.value.trim();

    if (!validateInput(value, regexPatterns.password)) {
        passwordHint.innerHTML = 'رمز عبور باید حداقل ۸ کاراکتر و شامل حروف کوچک، بزرگ، عدد و کاراکتر خاص باشد';
        passwordHint.style.color = 'red';
    } else {
        passwordHint.innerHTML = '';
    }
});
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {

    if (passwordInput.type === 'password') {

        passwordInput.type = 'text';

        togglePassword.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';

        togglePassword.setAttribute('aria-label', 'مخفی کردن رمز عبور');

    } else {

        passwordInput.type = 'password';

        togglePassword.innerHTML = '<i class="fa-regular fa-eye"></i>';

        togglePassword.setAttribute('aria-label', 'نمایش رمز عبور');

    }

});
