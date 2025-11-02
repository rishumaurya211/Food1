// import foodModel from "../models/foodmodel.js";
// import fs from 'fs'

// // add food item

// const addFood = async (req, res) => {

//     let image_filename = `${req.file.image_filename}`;

//     const food = new foodModel({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
//         image: image_filename
//     })
//     try {
//         await food.save();
//         res.json({ success: true, message: "Food Added" })
//     } catch (error) {
//         console.log(error);
//         res.json({ sucess: false, message: "Error" })
//     }
// }

// // all food list

// const listFood = async (req,res)=> {
// try{
//     const foods = await foodModel.find({})
//     res.json({success:true,data:foods})
// }catch(error){
//  console.log(error);
//  res.json({sucess:false,message:"Error"})
// }
// }

// // Delete the food items

// const removeFood = async (req,res) =>{
// try {
//     const food = await foodModel.findById(req.body.id);
//     fs.unlink(`uploads/${food.image}`,()=>{})

//     await foodModel.findByIdAndDelete(req.body.id)
//     res.json({success:true,message:"Food Removed"})
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
// }
// }


// export { addFood ,listFood,removeFood}
import foodModel from "../models/foodmodel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "Image is required" });
        }

        let image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Delete a food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.error("Error deleting file:", err);
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood };

