import React from 'react'
import { useLocation } from "react-router-dom";
import "./article.css";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "../../firebase";
import { updateArticle } from '../../redux/apiCalls';

export default function Article() {
  const location = useLocation();
  const articleId = location.pathname.split("/")[2];

  const article = useSelector((state) => state.article.articles.find((article) => article._id === articleId));


  const [title, setTitle] =React.useState(article.title)
  const [desc, setDesc] =React.useState(article.desc)
  const [file, setFile] = React.useState(null);
  const [img, setImg] = React.useState("");
  const [error, setError] = React.useState("")
  const [inputs, setInputs] =React.useState({})

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleInputs = (e) => {
    setInputs({ title, desc });
  };

  const handleTitleChange = (e) => {
    handleTitle(e);
    handleInputs(e);
  };

  const handleDescChange = (e) => {
    handleDesc(e);
    handleInputs(e);
  };
  
  const handleClick = (e) => {
    e.preventDefault();

    if (!file || !title || !desc) {
      setError("Please fill in all fields");
      return;
    }

    if (file) {
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
                  // const updatedArticle = ({...inputs, img: downloadURL});
                  // updateArticle(articleId, updatedArticle)
              });
          }
      );
    } else {
      console.log("No file selected");
    }
    
}

// React.useEffect(() => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       _id: articleId,
//       img: img || prevInputs.img,
//     }));
//   }, [img]);

    React.useEffect(() => {
      setInputs((prevInputs) => ({
        ...prevInputs,
        title: title,
        desc: desc,
        img: img || prevInputs.img,
      }));
    }, [title, desc, img])

    console.log(inputs)

    React.useEffect(() => {
        if (article) {
          setImg(article.img);
        }
      }, [article]);

    const dispatch = useDispatch()

    const redirectToHomePage = () => {
        setTimeout(() => {
          window.location.replace('http://localhost:3001/');
        }, 2000)
      };

    const handleRequest = (e, newData) => {
        e.preventDefault()
        const updatedArticle = newData

        updateArticle(articleId, updatedArticle, dispatch)

        redirectToHomePage()
    }

    // if (!article) {
    //     return <div>Loading...</div>;
    //   }

  return (
    <div className="article">
      <div className="articleTitleContainer">
        <h1 className="articleTitle">Update article</h1>
      </div>
      <div className="articleTop">
        <div className="articleTopRight">
          <div className="articleInfoTop">
            <img src={article.img} alt="" className="articleInfoImg" />
            <span className="articleName">{article.title}</span>
          </div>
          <div className="articleInfoBottom">
            <div className="articleInfoItem">
              <span className="articleInfoKey">id:</span>
              <span className="articleInfoValue">{article._id}</span>
            </div>
          </div>
          <div className="articleInfoBottom">
            <div className="articleInfoItem">
              <span className="articleInfoKey">Author:</span>
              <span className="articleInfoValue">{article.fullName}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="articleBottom">
        <form className="articleForm">
          <div className="articleFormLeft">
            <label>Article Title</label>
            <input type="text" value={title} onChange={handleTitleChange} />
            <label>Article Description</label>
            <textarea type="text" value={desc} onChange={handleDescChange} cols={70} rows={20}/>
          </div>
          <div className="articleFormRight">
            <div className="articleUpload">
              <img src={img} alt="" className="articleUploadImg" />
              <label className='selectImg' for="file">
                Select Image
              </label>
              <input type="file" id="file" name='file' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            {error && <span style={{ color: "red", marginTop: "10px" }}>{error}</span>}
            <div className='uploadImg' onClick={handleClick}>Upload</div>
            <button className="articleButton" onClick={(e) => handleRequest(e, inputs)}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}