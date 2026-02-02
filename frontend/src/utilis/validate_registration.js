


const validateUsername = (username) => {
    if(!username) return "username is required";
    if(!/^[A-Za-z ]{3,10}$/.test(username)){
        return "username must be 3-10 characters long only "
    }
    return null
}

const validateEmail = (email) => {
    if(!email) return "Email is required"
    let allowedDomain = ["@gmail.com","@hotmail.com"]

    const isValid = allowedDomain.some(domain=> email.endsWith(domain) )

    if(!isValid){
        return "invalid!,email must be in format gmail.com or hotmail.com"
    }
    return null
}


const validatePassword = (password) => {

    let passRegex = /^[A-Za-z0-9]+$/

    if(!password) return "password is required"

    if(!passRegex.test(password)){
        return "password can be alphanumeric only"
    }

    if (password.length < 4 || password.length > 8) {
      return "password must be between 4 and 8 characters";
    }

    return null
}

export const accountRegistrationVal = (data) => {
  const errors = {};

  const usernameError = validateUsername(data.username);
  if (usernameError) errors.username = usernameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  return errors;
}
