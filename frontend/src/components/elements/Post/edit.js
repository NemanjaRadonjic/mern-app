import React, { useEffect, useState } from "react";

import { EditContainer, EditForm, TextArea, Button, Counter } from "./styles";

const maxLength = 400;
const lineHeight = 19; // 1,2rem = 19px , this has to be hardcoded to work

const EditPost = ({ content, handleEdit, postHeight }) => {
  let inputRef;
  const rows = postHeight / lineHeight;
  const [newContent, setNewContent] = useState(content);
  const handleChange = (event) => {
    setNewContent(event.target.value);
  };

  useEffect(() => {
    inputRef.focus();
  }, []);

  return (
    <EditContainer style={{ height: `${postHeight}px` }}>
      <TextArea
        spellCheck="false"
        maxLength={maxLength}
        rows={rows}
        onClick={(event) => event.stopPropagation()}
        ref={(input) => (inputRef = input)}
        value={newContent}
        onChange={handleChange}
      />
      <Counter>{maxLength + "/" + newContent.length}</Counter>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleEdit(newContent);
        }}
      >
        Submit
      </Button>
    </EditContainer>
  );
};

export default EditPost;
