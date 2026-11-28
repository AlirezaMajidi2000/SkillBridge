const regexPatterns = {
    firstName: /^[\u0600-\u06FFa-zA-Z\s]{2,50}$/,
    lastName: /^[\u0600-\u06FFa-zA-Z\s]{2,70}$/,
    username: /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/,
    phone: /^09\d{9}$/,
    email: /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#-_]{8,64}$/
};

function validateInput(value, pattern) {
    return pattern.test(value);
}