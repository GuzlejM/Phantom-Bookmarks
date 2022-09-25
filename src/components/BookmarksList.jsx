import React from 'react';
import { List } from '@mui/material';
import PropTypes from 'prop-types';
import Bookmark from './Bookmark';

function BookmarksList({ bookmarks, removeBookmark }) {
  const reversedBookmarks = [...bookmarks].reverse();
  return (
    <List>
      {reversedBookmarks.map((bookmark) => (
        <Bookmark
          key={bookmark.id}
          bookmark={bookmark}
          removeBookmark={removeBookmark}
        />
      ))}
    </List>
  );
}

BookmarksList.propTypes = {
  bookmarks: PropTypes.arrayOf(),
  removeBookmark: PropTypes.func.isRequired,
};
export default BookmarksList;
