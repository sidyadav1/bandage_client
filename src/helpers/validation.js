export const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{1,}$/;
    return name && nameRegex.test(name);
};

export const validateEmail = (email) => {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email && emailRegex.test(email);
};

export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phone && phoneRegex.test(phone);
};

export const validatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password && passwordRegex.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};
