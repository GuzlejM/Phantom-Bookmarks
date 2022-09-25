import { List } from '@mui/material';
import React from 'react';
import Bookmark from './Bookmark';

function BookmarksList({ bookmarks, removeBookmark }) {
  return (
    <List>
      {bookmarks.map((bookmark) => (
        <Bookmark
          key={bookmark.id}
          bookmark={bookmark}
          removeBookmark={removeBookmark}
        />
      ))}
    </List>
  );
}

export default BookmarksList;
