import { toast } from "react-hot-toast";
import { authenticate } from "./helper.js";

// Validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    // check user exist or not
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist...!");
    }
  }

  return errors;
}

//Validate the user password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

// Validate Reset Password
export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirm_password) {
    errors.exist = toast.error("Password does not match");
  }
  return errors;
}

//Validate register form
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

// validate profile page
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

// *******************************************

//verify password
function passwordVerify(errors = {}, values) {
  //   const specialChars = "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  if (!values.password) {
    errors.password = toast.error("password Required!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password!");
  } else if (values.password.length < 4) {
    errors.password = toast.error("Password must be more than 4 characters");
  }
  //   else if (!specialChars.test(values.password)) {
  //     errors.password = toast.error("Password must have special character");
  //   }
  return errors;
}

//Verify the username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username!");
  }

  return error;
}

// Verify email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email is required!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email");
  }
  return error;
}

// verify profile page
