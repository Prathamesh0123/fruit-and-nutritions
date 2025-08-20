const mongoose = require('mongoose');

const fruiteSchema = new mongoose.Schema({
    name:{type:String,require:true},
    id:{type:Number,require:true},
    family:{type:String},
    order:{type:String},
    genus:{type:String},
    imageUrl:{type:String},
    fruiteFact:{type:String},
    nutritions:{
        calories:{type:Number},
        fat:{type:Number},
        sugar:{type:Number},
        carbohydrates:{type:Number},
        protein:{type:Number}
    }
})

const Fruit = mongoose.model("Fruit",fruiteSchema);
module.exports = Fruit;