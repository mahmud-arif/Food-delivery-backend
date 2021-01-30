import Validator from "validatorjs";

const errorMessage = {
  required: ":attribute is missing/invalid",
  required_if: ":attribute cannot be empty string",
};

function validation(data, rules) {
  const validator = new Validator(data, rules, errorMessage);
  const error = {
    status: 400,
    errors: {
      title: "Invalid Parameter(s)",
      invalidParams: validator.errors.all(),
    },
  };

  if (validator.fails()) {
    throw error;
  }

  return validator.passes();
}

export default validation;
