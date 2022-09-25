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
    console.log(storageBookmarks);
    if (storageBookmarks) {
      setBookmarks(storageBookmarks);
    }
  }, []);

  useEffect(() => {
    // fires when bookmarksList array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = useCallback((bookmark) => {
    // adds new bookmark to beginning of bookmarksList array
    setBookmarks([bookmark, ...bookmarks]);
    console.log('App', ...bookmarks);
    console.log('App2', bookmark);
  });

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
