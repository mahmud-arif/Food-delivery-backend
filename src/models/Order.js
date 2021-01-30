import mongoose from 'mongoose';
const  User = mongoose.model("User"); 

const orderSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    items: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food'
        },
      }
    ],     
  },
  {
    timestamps: true
  }
);

const orderModel = mongoose.model('Order', orderSchema);

async function placeOrder(inputs){
  const {user} = inputs; 

  const order = await new orderModel({...inputs}).save(); 
  await User.findOneAndUpdate({_id: user._id}, {$push: { 
    orderLog: {
      _id: order._id
      }  
  } })
   
  const {_id, items} = await order.populate('items.food').execPopulate(); 
  return {
    _id, items
  }; 

}

export {placeOrder}

