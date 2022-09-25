import React, { useState, useCallback } from 'react';
import { IconButton, ListItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import './Bookmark.css';

function Bookmark({ bookmark, removeBookmark }) {
  const [text, setText] = useState(bookmark.url);
  const [isEditing, setIsEditing] = useState(false);

  const handleURLInputChange = useCallback((e) => {
    // e.target.value contains new input from onChange
    // event for input elements
    setText(e.target.value);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(text);
    setIsEditing(false);
  };

  const handleRemoveClick = useCallback(() => {
    removeBookmark(bookmark.id);
  });

  const handleEditClick = useCallback(() => {
    setIsEditing(!isEditing);
  });

  return (
    <ListItem>
      <div>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Text"
              type="text"
              name="text"
              value={text}
              onChange={handleURLInputChange}
            />
          </form>
        ) : (
          <div className="notEditingState">
            <p>{text}</p>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </div>
        )}
      </div>
      <IconButton onClick={handleRemoveClick}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

Bookmark.propTypes = {
  bookmark: PropTypes.element,
  removeBookmark: PropTypes.func.isRequired,
};

export default Bookmark;
