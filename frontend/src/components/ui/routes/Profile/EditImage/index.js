import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import axiosInstance from "@axios";
import store from "@store";
import { changeImage, setPreviewCanvas } from "@actions/userActions";
import {
  Container,
  PositionContainer,
  ReactCropContainer,
  Header,
  Label,
} from "./styles";
import { Button } from "@styles/common";
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

const uploadAvatar = async (previewCanvas, crop, filename, history, type) => {
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
  bodyFormData.append("type", type);

  try {
    const response = await axiosInstance.post("/upload", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { path } = response.data;
    const userData = JSON.parse(window.localStorage.getItem("user"));
    userData[type] = path;
    window.localStorage.setItem("user", JSON.stringify(userData));
    store.dispatch(changeImage(path, type));
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

const EditImage = ({ history, type }) => {
  const [filename, setFilename] = useState(null);
  const [src, setSrc] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: type === "background" ? null : 50,
    x: 25,
    y: 25,
    aspect: type === "background" ? 15 / 5 : null,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    store.dispatch(setPreviewCanvas({ ref: previewCanvasRef, type }));

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

    return () => {
      store.dispatch(setPreviewCanvas(null));
    };
  }, [completedCrop, type]);
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
    <>
      <Container>
        <PositionContainer>
          <Header>{`Change your profile ${type}`}</Header>
          <ReactCropContainer type={type}>
            {src && (
              <>
                <ReactCrop
                  src={src}
                  crop={crop}
                  onImageLoaded={onImageLoaded}
                  onChange={(c) => {
                    setCrop(c);
                    store.dispatch(
                      setPreviewCanvas({ ref: previewCanvasRef, type })
                    );
                  }}
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
          <Button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              uploadAvatar(
                previewCanvasRef.current,
                completedCrop,
                filename,
                history,
                type
              );
            }}
          >
            Done
          </Button>
        </PositionContainer>
      </Container>
    </>
  );
};

export default EditImage;
