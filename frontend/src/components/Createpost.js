import React, { useState, useEffect } from "react";
import "./Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)


  useEffect(() => {

    if (url) {

      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error)
          } else {
            notifyB("Successfully Posted")
            navigate("/")
          }
        })
        .catch(err => console.log(err))
    }

  }, [url])


  const postDetails = () => {

    console.log(body, image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "cloudinary13")
    fetch("https://api.cloudinary.com/v1_1/cloudinary13/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))
    console.log(url)

  }


  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };
  return (
    <div className="createPost">
      {/* //header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0])
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAACTCAMAAAC9O9snAAAAQlBMVEX///+ZmZmUlJT29vaRkZH6+vrs7Ozl5eW/v7+cnJypqany8vKMjIytra3i4uLd3d3Ly8vX19eioqK1tbXR0dHFxcUCKFv3AAAEiElEQVR4nO1b2ZarIBAMm2tcYsz//+rVJDMxChQN6Hjuod7Bom1653JJSEhISEhISEhISEiICpHl3e2FLs/EX9NR+XivhpLxNxgrh+re50r9EZ+2b/hVTjxW4FKypm8Pp6XyYnjKxQTOhiI/kpYYK418tvKq+km7DiFWF6VNQl8oi/oARqpgroRe/7DYW1DqQWL0YtXvyqqtJJHRDFm1uzEShYNma0Uli51MaVb5MXqyqrI9KI2eQnpDjvEpFUGMZlEVkRmpxke5V5Jqot4/FaBKC0lVEUnVQwxKE6khmlVXkSjNpCJJSkT5cW9SkX5fE4/SRKqJQalwuHFTGDdFU9LFgskIJmGElObwrctqUWddMWAXzYONZ4YoTb5s6WFb7BNloJuB+s3v6y9kd/uSklVhDhl5FN5rFj2AbMO8TIt277TLOnASGRBPqQpQuhkW3uykQqwU+AmW8APcVqn75U5QQEo289fY1zJfQSEFt93pDJzHU83r0r7t3boaWATmFyEApwJMHzC2foISdjExcHfQnS19NGoE9/kB1j/Aeo+rp1CIYrJNPwA2CslZh1yCf5ejDezLmUQbbAFzJ+TdgTXw0HI1gC1LdJmBKWGMHJu3MDYLlRNjVE/cI05lqD7Rbx5MDIwxwQ9ukBMxL1Y4rA60T/MWNE45TlYC7TgjWwOcrQT6u+cOtAwGeXUWHBfMsO+wBhY8C4qfXqgolASymDPscaZLQj9QkqoM2eAn/OPxN0pK9gnt3QuWvMXpUNCPL4EStF9S+vwOO6Y39MtN53TcVOsfetfaJ/QFXpw86gX7c1rXVXJKr4FU9iFwmutP1bP+JOq2qGhNq904sVedjrnV6Q7j5Il99IlzeV1hLm3uwcnNPnE2NI8uE2oBIfLucXcoaz5BsU+tw36SF60pT5i0nbsYKUpEnkEfzAfQUVUj7j6Q/B2MC2SPXbpAdU1aXADiJ964VWpqELGQ4id7lCid2/PKWi8CkeoaNjcazaoQEzxL3kKM7C0loystbzGXVyVFSjNuxuMR8ztj3daj5meq0JDbZqZ6gUef2VRdI9cLDJbcq6dkSj+pdRV9/QkWCfTQlw7ovWGtFtAM7y9q3QE9NFMncO82ic7cedQzlebmUS/vZzON0H16U1tjF9AL3GqCV1t420cwZJgu2AaJpZdqbs4WMNmx0XJPmW+KySHjCmvthKVsA1aCCmotx9pr5YilvzptPbF3O//brHgYlA++gx+fptQb36NY15Dhpfq65BQy3fM1XyCDOH3tFDSvuVTNQE6fWxw47SeqHTgFzqssXbEM2Up8OIXO9SzdnsyEPz5nI6U9BixSNB6A35NFGR094TzdKecOzzifeco51li/L+q87ynnoi9uo6N2KcWeH78QuigGKUUwlVuc8D3CKd9tXPzft4REqBAnfAd0ob+XKnd/LzVjflfmzuiId2UzVE94f3cY5neKzNJ/4oe/U3zRmt9zSs095Fzyv3jP+cNr9e6VP9+9jscLaA1Rz++Dx3G83br2798HJyQkJCQkJCQkJCT8b/gHHCwzqvUm8QUAAAAASUVORK5CYII="
              alt=""
            />
          </div>
          <h5></h5>
        </div>
        <textarea value={body} onChange={(e) => {
          setBody(e.target.value)
        }} type="text" placeholder="Write a caption...."></textarea>
      </div>
    </div>
  );
}
