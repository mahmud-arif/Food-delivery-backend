import { stringify } from "query-string";

export const userSignupRules = {
  name: "required|string",
  email: "required|email",
  password: "required|min:6",
  deliveryAddress: "required"
};


export const userUpdateRules = {
  email: "required_if:email,|string", 
  name: "required_if:name,|string",
  deliveryAddress: "required_if:deliveryAddress,|string"
}


export const userRemoveRules = {
  email: "required | string"
}


export const orderCreateRules = { 
    items: "required|array", 
    "items.quantity": "required|numeric", 
    "items.food": "required|object"
}