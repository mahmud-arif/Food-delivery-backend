import bcrypt from "bcryptjs";
import * as AuthUser from "../models/AuthUser";
import variables from "../variables";
import { validate, errorResponseHandler, statusCodes } from "../helpers";
import { generateToken, verifyToken} from "../helpers/jwt";
import { userSignupRules, userUpdateRules, userRemoveRules} from "../helpers/validationRules";

async function signup(ctx) {
  try {
    const {
      email,
      password,
      deliveryAddress, 
      name
    } = ctx.request.body;

    validate({name, email, password, deliveryAddress}, userSignupRules);
    

    const existingUser = await AuthUser.getByEmail(email);
    
    if (existingUser) {
      const error = {
        status: 400,
        title: "User with the same email already exists",
      };

      throw error;
    } else {
      

      const newUser = await AuthUser.create({
        email,
        password,
        deliveryAddress, 
        name
      });
  

      const authData = generateToken(newUser);

      ctx.response.ok(
        { ...authData, user: newUser },
        "User created successfully"
      );
    }
  } catch (error) {
    ctx.log.error(errorResponseHandler);
    errorResponseHandler(ctx, error);
  }
}

async function login(ctx) {
  try {
    const values = ctx.request.body;

    validate(values, {
      email: "required|email",
      password: "required|min:6",
    });

    const user = await AuthUser.getByEmail(values.email);
    const error = {
      status: 401,
      title: "Email or password not matched",
    };

    if (!user) {
      throw error;
    }

    const { password,  _id, name, email, deliveryAddress } = user;

    const isPasswordValid = await bcrypt.compare(
      values.password,
      password
    );

    if (isPasswordValid) {
      const { token, expiresIn } = generateToken({ user: {_id, name, email, deliveryAddress} });
      ctx.response.ok(
        {  name, email, deliveryAddress, token, expiresIn },
        "User loggedin successfully"
      );
    } else {
      throw error;
    }
  } catch (error) {
    ctx.log.error(error);
    errorResponseHandler(ctx, error);
  }
}

async function update(ctx){
  try {
     const {email} =  verifyToken(ctx)
     const user = await AuthUser.getByEmail(email);

     if(!user){
      throw {
        status: `${statusCodes.NOT_FOUND}`,
        title: "No user found with this email",
      };
     }
     validate(ctx.request.body, userUpdateRules); 

     const updatedUser = await AuthUser.update(email, ctx.request.body); 

     ctx.response.ok(
      { ...updatedUser },
      "User updated successfully"
    );
    
  } catch (error) {
    ctx.log.error(error);
    errorResponseHandler(ctx, error);
  }
}

async function remove(ctx){
  try {
      verifyToken(ctx)
     const {email} = ctx.query;  

     validate(email, userRemoveRules);
     const user = await AuthUser.getByEmail(email);
    

     if(!user){
      throw {
        status: `${statusCodes.NOT_FOUND}`,
        title: "No user found with this email",
      };
     }
      

     const deletedUser = await AuthUser.remove(email); 

     ctx.response.ok(
      { ...deletedUser },
      "User updated successfully"
    );
    
  } catch (error) {
    ctx.log.error(error);
    errorResponseHandler(ctx, error);
  }
}


export {
  signup,
 login, 
 update, 
 remove

};
