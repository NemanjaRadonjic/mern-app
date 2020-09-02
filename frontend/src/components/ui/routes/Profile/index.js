import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import axiosInstance from "@axios";
import store from "../../../../index";
import { changeAvatar } from "@actions/userActions";
import {
  Container,
  PositionContainer,
  ReactCropContainer,
  Header,
  Label,
  Button,
  Preview,
} from "./styles";

import "react-image-crop/dist/ReactCrop.css";

const pixelRatio = 4;

function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

const uploadAvatar = async (previewCanvas, crop, filename, history) => {
  if (!crop || !previewCanvas) {
    return history.push("/");
  }

  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
  const dataUrl = canvas.toDataURL();

  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const imageFile = new File([u8arr], filename, { type: mime });
  const bodyFormData = new FormData();
  bodyFormData.append("image", imageFile);

  const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));
  axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;

  const {
    data: { path },
  } = await axiosInstance.post("/upload/profile", bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const userData = JSON.parse(window.localStorage.getItem("user"));
  userData.avatar = path;
  window.localStorage.setItem("user", JSON.stringify(userData));
  store.dispatch(changeAvatar(path));
  history.push("/");
};

const Profile = ({ history }) => {
  const [filename, setFilename] = useState(null);
  const [src, setSrc] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const onFileChange = (event) => {
    event.persist();
    setSrc();
    if (event.target.files[0]) {
      setFilename(event.target.files[0].name);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setSrc(reader.result);
      });
    }
  };
  const onImageLoaded = (img) => {
    imgRef.current = img;
  };
  return (
    <Container>
      <PositionContainer>
        <Header>Profile Image</Header>
        <ReactCropContainer>
          {src && (
            <>
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={onImageLoaded}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </>
          )}
        </ReactCropContainer>
        <Label>
          Upload Image
          <input
            name="profile"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </Label>
        <Preview ref={previewCanvasRef}></Preview>
        <Button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            uploadAvatar(
              previewCanvasRef.current,
              completedCrop,
              filename,
              history
            );
          }}
        >
          Done
        </Button>
      </PositionContainer>
    </Container>
  );
};

export default Profile;
