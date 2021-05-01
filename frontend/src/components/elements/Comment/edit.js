import React, { useEffect, useState } from "react";

import { EditContainer, TextArea, Button, Counter } from "../common/styles";

const maxLength = 400;
const lineHeight = 19; // 1,2rem = 19px

const EditComment = ({ content, handleEdit, commentHeight }) => {
  let inputRef;
  const rows = commentHeight / lineHeight;
  const [newContent, setNewContent] = useState(content);
  const handleChange = (event) => {
    setNewContent(event.target.value);
  };

  useEffect(() => {
    inputRef.focus();
  }, [inputRef]);

  return (
    <EditContainer style={{ height: `${commentHeight}px` }}>
      <TextArea
        spellCheck="false"
        maxLength={maxLength}
        rows={rows}
        onClick={(event) => event.stopPropagation()}
        ref={(input) => (inputRef = input)}
        value={newContent}
        onChange={handleChange}
      />
      <Counter filled={newContent.length >= maxLength}>
        {newContent.length + "/" + maxLength}
      </Counter>

      <Button
        disabled={!newContent.length > 0 || !/[A-Za-z0-9]/g.test(newContent)}
        gray={!newContent.length > 0}
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

export default EditComment;
