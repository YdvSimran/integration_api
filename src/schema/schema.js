import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Required"),
    name:yup.string().required('required'),
    phoneNumber:yup.number().integer().min(10,'enter 10 digit number').required('required'),

  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .matches(passwordRules, {
      message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
    })
    .required("Required"),
});

export default schema;
