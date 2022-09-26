import React from 'react';
import { List } from '@mui/material';
import PropTypes from 'prop-types';
import Bookmark from './Bookmark/Bookmark';

function BookmarksList({ bookmarks, removeBookmark }) {
  // Reversing bookmarks order (most recent on the top)
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
  bookmarks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  removeBookmark: PropTypes.func.isRequired,
};
export default BookmarksList;
