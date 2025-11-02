// import React, { useState } from "react";
// import "./Add.css";
// import { assets } from "../../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Add = () => {
//   const url = "http://localhost:8000";
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Salad",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDeafault();
//     const formData = new formData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", Number(data.price));
//     formData.append("category", Number(data.category));
//     formData.append("image", Number(data.image));

//     const response = await axios.post(`${url}/api/food/add`, formData);
//     if (response.data.success) {
//       setData({
//         name: "",
//         description: "",
//         price: "",
//         category: "Salad",
//       });
//       setImage(false);
//       toast.success(res.data.message);
//     } else {
//       toast.error(response.data.message);
//     }
//   };

//   return (
//     <div className="add">
//       <form className="flex-col" onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//           <p>Upload Image</p>
//           <label htmlFor="image">
//             <img
//               src={image ? URL.createObjectURL(image) : assets.upload_area}
//               alt=""
//             />
//           </label>
//           <input
//             onChange={(e) => setImage(e.target.files[0])}
//             type="file"
//             id="image"
//             hidden
//             required
//           />
//         </div>
//         <div className="add-product-name flex-col">
//           <p>Product Name</p>
//           <input
//             onChange={onChangeHandler}
//             value={data.name}
//             type="text"
//             name="name"
//             placeholder="Type here"
//           />
//         </div>
//         <div className="add-product-description flex-col">
//           <p>Product Description</p>
//           <textarea
//             onChange={onChangeHandler}
//             value={data.description}
//             name="description"
//             rows="6"
//             placeholder="Write Content here"
//           ></textarea>
//         </div>
//         <div className="add-category-price">
//           <div className="add-category flex-col">
//             <p>Product category</p>
//             <select onChange={onChangeHandler} name="category">
//               <option value="Salad">Salad</option>
//               <option value="Rolls">Rolls</option>
//               <option value="Desert">Desert</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cakes">Cake</option>
//               <option value="Pure Veg">Pure Veg</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//             </select>
//           </div>
//           <div className="add-price flex-col">
//             <p>Product Price</p>
//             <input
//               onChange={onChangeHandler}
//               value={data.price}
//               type="Number"
//               name="price"
//               placeholder="$20"
//             />
//           </div>
//         </div>
//         <button type="submit" className="add-btn">
//           ADD
//         </button>
//       </form>
//     </div>
//   );
// };
// export default Add;

import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Fixed typo

    const formData = new FormData(); // Fixed capitalization
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message); // Fixed variable reference
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add product. Try again.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write Content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cakes">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
