import * as Food from "../models/Food";
import { errorResponseHandler, statusCodes } from "../helpers";
import { verifyToken} from "../helpers/jwt";


async function create(ctx){

    const newFood = await Food.create(ctx.request.body); 
    ctx.response.ok(
        { newFood },
        "Food created successfully"
      );
}


async function getAll(ctx){
    try {
        verifyToken(ctx); 
        const foods = await Food.getAll(); 
        ctx.response.ok(
            { ...foods },
            "Foods fetched successfully"
          );

    } catch (error) {
        ctx.log.error(error); 
        errorResponseHandler(ctx, error);
    }
}
export {create, getAll}