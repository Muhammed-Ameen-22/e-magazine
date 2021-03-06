import React, { useContext, useState, useEffect } from "react";
import "../../pages/write/write.css";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Context } from "../../context/Context";

export default function PostView() {

  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const { user } = useContext(Context);

  const reader = new FileReader();


  const imgSubmit = (e) => {
    console.log(e.target.files[0])
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      // console.log('Zero', reader.result)
      console.log('first', e.target.result)
      // const a = e.target.result
      // console.log('second', a)
      // setFile(a)
      // setFile(reader.result)

      setFile(e.target.result)
      console.log('Third', file)
      // setDrivingLicenceDataURL(reader.result);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      file,
      //username: user.username,
      title,
      desc,

    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        //const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/createPost", data);

      } catch (err) { }
    }
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/create/createpost", newPost);
      console.log("status", res);
      if (res.status == "200") {
        // return(
        //   <Stack sx={{ width: '100%' }} spacing={2}>
        // <Alert severity="info">Successfully submitted. Wait for admin approval !</Alert>
        // </Stack>
        // );
       window.alert('Wait for admin approval');
        
        window.location.replace("/");
      }
      else {
        window.alert("ERROR! Something went wrong. Please try again");
      }
      //window.location.replace("/post/" + res.data._id);
    } catch (err) { }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={file} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={imgSubmit}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
       
      </form>
    </div>
  );
}
