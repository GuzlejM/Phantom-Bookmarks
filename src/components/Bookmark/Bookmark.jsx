/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import OutsideClickHandler from '../OutsideClickHandler';
import PropTypes from 'prop-types';

import { IconButton, ListItem, TextField, Link, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import './Bookmark.css';

function Bookmark({ bookmark, removeBookmark }) {
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [label, setLabel] = useState('Url');
  const [text, setText] = useState(bookmark.url);

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

  // Url Validator
  const validateUrl = (url) => {
    const regex =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return regex.test(url);
  };

  const handleURLInputChange = (e) => {
    setText(e.target.value);
    // Validate URL by input value
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

  // Handles submiting the form
  const handleSubmit = (e) => {
    // Prevent from refreshing page after submiting form submit event
    e.preventDefault();
    // Validate URL by input value
    const isValid = validateUrl(text);
    if (text !== '' && isValid) {
      setText(text);
      setIsValid(isValid);
      setIsEditing(false);
    } else {
      setText(text);
    }
  };
  //Handles Focused input State
  const handleFocused = (e) => {
    setIsEditing(!isEditing);
  };
  // Handles removing bookmark from list by id
  const handleRemoveClick = useCallback(() => {
    removeBookmark(bookmark.id);
  });
  // handles Editing Bookmark and switching state 'isEditing'
  const handleEditClick = useCallback(() => {
    setIsEditing(!isEditing);
  });

  return (
    <ListItem>
      <div>
        {/* Switching is Editing State*/}
        {isEditing || isFocused ? (
          <form onSubmit={handleSubmit}>
            <TextField
              error={error}
              label={label}
              name="text"
              type="text"
              value={text}
              onChange={handleURLInputChange}
              onPaste={handlePaste}
              onBlur={handleFocused}
              autoFocus
            />
          </form>
        ) : (
          <div className="notEditingState">
            <Tooltip title="Link to:">
              <Link href={text}>{text}</Link>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
      <Tooltip title="Delete">
        <IconButton onClick={handleRemoveClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
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
