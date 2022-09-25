/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { IconButton, ListItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import './Bookmark.css';

function Bookmark({ bookmark, removeBookmark }) {
  const [text, setText] = useState(bookmark.url);
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const [label, setLabel] = useState('Url');

  // Url Validator
  const validateUrl = (url) => {
    const regex =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return regex.test(url);
  };

  // Handles validation after pasting into input
  const handlePaste = (event) => {
    event.clipboardData.getData('text');
  };

  useEffect(() => {
    const handlePasteAnywhere = (event) => {
      event.clipboardData.getData('text');
    };

    window.addEventListener('paste', handlePasteAnywhere);

    return () => {
      window.removeEventListener('paste', handlePasteAnywhere);
    };
  }, []);

  const handleURLInputChange = (e) => {
    setText(e.target.value);
    const isValid = validateUrl(e.target.value);
    if (isValid) {
      setLabel('Url');
      setIsValid(true);
      setError(false);
    } else {
      setLabel('Error');
      setIsValid(false);
      setError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateUrl(text);
    if (text !== '' && isValid) {
      setText(text);
      setIsValid(isValid);
      setIsEditing(false);
    } else {
      setText(text);
    }
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
              error={error}
              label={label}
              type="text"
              name="text"
              value={text}
              onChange={handleURLInputChange}
              onPaste={handlePaste}
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
  // eslint-disable-next-line react/forbid-prop-types
  bookmark: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
  }),
  removeBookmark: PropTypes.func.isRequired,
};

export default Bookmark;
