import { IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useCallback } from 'react';

function Bookmark({ bookmark, removeBookmark }) {
  const handleRemoveClick = useCallback(() => {
    removeBookmark(bookmark.id);
  });

  return (
    <ListItem>
      {bookmark}
      {/* <IconButton onClick={handleRemoveClick}>
        <DeleteIcon />
      </IconButton> */}
    </ListItem>
  );
}

export default Bookmark;
