const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0
    }
  },
);

const FoodModel = mongoose.model('Food', foodSchema);

module.export = FoodModel; 

async function create(inputs){
  const newFood = await new FoodModel({...inputs}).save(); 

  return newFood; 
}

async function  getAll(){
  const foods = await FoodModel.find({}); 
  return foods; 
}

export {create, getAll}

