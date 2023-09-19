import { useState, useEffect } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [inputError, setInputError] = useState("")

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  useEffect(() => {
    setInputError("");
  }, [inputs]);

  const handleClick = (e) => {
    e.preventDefault();

    if (!file || !inputs.title || !inputs.desc || !inputs.price || !quantity || cat.length === 0) {
      setInputError("Please fill in all fields");
      return;
    }

  //   if (
  //     typeof inputs.price !== 'number' 
  //     || typeof inputs.quantity !== 'number'
  //     || typeof inputs.title !== 'string'
  //     || typeof inputs.desc !== 'string'
  //     || !['hats', 'mugs', 'stickers'].includes(inputs.categories)
  //     ) {

  //         setInputError("Invalid input types")
  //         return
  // }

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
          const product = { ...inputs, img: downloadURL, categories: cat, quantity };
          addProduct(product, dispatch);
          setTimeout(() => { window.location.reload() }, 3000)
        });
      }
    );
  };

  const { error, emptyInputsError, wrongTypeError } = useSelector((state) => state.product);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
            name="quantity"
            type="number"
            placeholder="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="hats,mugs,stickers" onChange={handleCat} />
        </div>
        {error && <p className="errorMessage">Please try another Title.</p>}
        {/* {emptyInputsError && <p className="errorMessage">Please fill in all the required fields.</p>}
        {wrongTypeError && <p className="errorMessage">Please check the types of your inputs.</p>} */}
        {inputError && <span style={{ color: "red", marginTop: "10px" }}>{inputError}</span>}
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
