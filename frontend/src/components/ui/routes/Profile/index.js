import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
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

const Profile = () => {
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
    if (event.target.files) {
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
        <Button>Done</Button>
      </PositionContainer>
    </Container>
  );
};

export default Profile;
