import React, { useCallback } from 'react';
import { IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

function Bookmark({ bookmark, removeBookmark }) {
  const handleRemoveClick = useCallback(() => {
    removeBookmark(bookmark.id);
  });

  const handleEditClick = useCallback(() => {
    removeBookmark(bookmark.id);
  });
  

  return (
    <ListItem>
      {bookmark.url}
      <IconButton onClick={handleEditClick}>
        <DeleteIcon />
      </IconButton>
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
