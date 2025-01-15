import mongoose from "mongoose";

const productScheme = new mongoose.Schema({

    Image: {type: String, required: true}, 
    name: {type: String, required: true},
    category: {type:  String, 
        enum: ['adultos', 'niños'],  
        required: false},
    price: {type: Number, required: true},
    description: {type: String}, 
    tallas: {type: String,
        enum:[35,36,37,38,39,40,41,42,43,23,24,25,26,27,28,29,30,31,32,33,34],
        required: true}
    });

    export const productModel = mongoose.model('product', productScheme);
