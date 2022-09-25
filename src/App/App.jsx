import { Typography } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Form from '../components/Form';
import BookmarksList from '../components/BookmarksList';

const LOCAL_STORAGE_KEY = 'react-bookmarks';

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // fires when app component mounts to the DOM
    const storageBookmarks = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY),
    );
    if (storageBookmarks) {
      setBookmarks(storageBookmarks);
      console.log(bookmarks, storageBookmarks);
    }
  }, []);

  const addBookmark = useCallback((bookmark) => {
    // adds new bookmark to beginning of bookmarks array
    setBookmarks([...bookmarks, bookmark]);
  });

  useEffect(() => {
    // fires when bookmarksList array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const removeBookmark = useCallback((id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  });

  return (
    <div className="App">
      <Typography style={{ padding: 16 }} variant="h1">
        Phantom - URL Bookmarks System
      </Typography>
      <Form addBookmark={addBookmark} />
      <BookmarksList bookmarks={bookmarks} removeBookmark={removeBookmark} />
    </div>
  );
}

export default App;
