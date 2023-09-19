import React from 'react';
import './sidebar.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { addSuggestedArticle } from '../../apiCalls';
import sidebarImg from '../../images/sidebarImg.png';

const Sidebar = () => {
  const [inputs, setInputs] = React.useState({});
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!inputs.fullName || !inputs.email || !inputs.title || !inputs.desc || !file) {
      setError('Please fill in all fields and select an image.');
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const suggestedArticle = { ...inputs, img: downloadURL };
          addSuggestedArticle(suggestedArticle);
          setInputs({});
          setFile(null);
          setError(null);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
      }
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">You got some news?</span>
        <img src={sidebarImg} alt="" />
        <p>
          We are happy to promote relevant accessibility related news stories to our GAMING community. If you have a
          story we should be aware of please let us know using the form below.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">SUGGEST NEWS</span>
        <form className="sidebarForm">
          <div className="sidebarFormItem">
            <label>Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={inputs.fullName || ''}
              onChange={handleChange}
            />
          </div>
          <div className="sidebarFormItem">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={inputs.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="sidebarFormItem">
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={inputs.title || ''}
              onChange={handleChange}
            />
          </div>
          <div className="sidebarFormItem">
            <label>Description</label>
            <textarea
              name="desc"
              rows="6"
              placeholder="Enter your news here..."
              value={inputs.desc || ''}
              onChange={handleChange}
            />
          </div>
          <div className="sidebarFormItem">
            <label>Image</label>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="sidebarFormButton" onClick={handleClick}>
            Send
          </button>
        </form>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
