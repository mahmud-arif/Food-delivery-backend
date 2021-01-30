import * as Order from "../models/Order";
import { validate, errorResponseHandler, statusCodes } from "../helpers";
import { verifyToken} from "../helpers/jwt";
import { orderCreateRules} from "../helpers/validationRules";


async function placeOrder(ctx){
    try {
         verifyToken(ctx); 
       
        validate(ctx.request.body, orderCreateRules); 

        const newOrder = await Order.placeOrder(ctx.request.body); 

        ctx.response.ok(
            { ...newOrder, subTotal, total},
            "Order created successfully"
          );
    } catch (error) {
        ctx.log.error(error);
        errorResponseHandler(ctx, error);
    }

    const newOrder = await Order.placeOrder(ctx.request.body); 
    ctx.response.ok(
        { newOrder },
        "Order created successfully"
      );
}

export {placeOrder}