import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) => state.product.products.find((product) => product._id === productId));
  console.log(product)

  const [updatedProduct, setUpdatedProduct] = useState({
    _id: product._id,
    title: product.title,
    desc: product.desc,
    price: product.price,
    img: product.img,
    quantity: product.quantity,
    inStock: product.inStock,
  });

  const [img, setImg] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("")

  const handleImageClick = (e) => {
    e.preventDefault();

    if(!file) {
      setError("Please fill in all fields")
      return
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL)
          setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            img: downloadURL,
          }))
          // const updatedArticle = ({...inputs, img: downloadURL});
          // updateArticle(articleId, updatedArticle)
        });
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      img: img || prevProduct.img,
    }));
  };


  useEffect(() => {
    setError("")
  }, [img]);



  const dispatch = useDispatch();



  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if(!updatedProduct.title || !updatedProduct.desc || !updatedProduct.price || !updatedProduct.quantity) {
      setError("Please fill in all fields")
      return
    }

    if (
        typeof updatedProduct.price !== 'number' 
        || typeof updatedProduct.quantity !== 'number'
        || typeof updatedProduct.title !== 'string'
        ) {

            setError("Invalid input types")
            return
    }

    console.log(updatedProduct);
    updateProduct(productId, updatedProduct, dispatch)

    setTimeout(() => {
      window.location.reload()
    }, 2000)

  };



  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Update product</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              value={updatedProduct.title}
              onChange={handleInputChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              name="desc"
              value={updatedProduct.desc}
              onChange={handleInputChange}
            />
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
            />
            <label>Quantity</label>
            <input
              type="text"
              name="quantity"
              value={updatedProduct.quantity}
              onChange={handleInputChange}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              value={updatedProduct.inStock}
              onChange={handleInputChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                name="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {error && <span style={{color: "red", marginTop: "10px"}}>{error}</span>}
            <div className="uploadImg" onClick={handleImageClick}>
              Upload
            </div>
            <button className="productButton" onClick={handleUpdateProduct}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
