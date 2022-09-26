import { Typography, Button } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Form from '../components/Form';
import Pagination from '../components/Pagination';
import BookmarksList from '../components/BookmarksList';

const LOCAL_STORAGE_KEY = 'react-bookmarks';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarksPerPage, setBookmarksPerPage] = useState(20);

  useEffect(() => {
    // fires when app component mounts to the DOM
    const storageBookmarks = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY),
    );
    if (storageBookmarks) {
      setBookmarks(storageBookmarks);
    }
  }, []);

  const lastIndex = currentPage * bookmarksPerPage;
  const firstIndex = lastIndex - bookmarksPerPage;
  const currentBookmarks = bookmarks.slice(firstIndex, lastIndex);

  const addBookmark = useCallback((bookmark) => {
    // adds new bookmark to beginning of bookmarks array
    setBookmarks([...bookmarks, bookmark]);
  });

  useEffect(() => {
    // fires when bookmarks array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const removeBookmark = useCallback((id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  });

  const handleClear = () => {
    localStorage.clear();
    setBookmarks([]);
  };

  return (
    <div className="App">
      <Typography style={{ padding: 16 }} variant="h1">
        Phantom - URL Bookmarks System
      </Typography>
      <div className='top-pagination'>
        <Pagination
          totalBookmarks={bookmarks.length}
          bookmarksPerPage={bookmarksPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <Button onClick={handleClear}>ClearAll</Button>
      </div>
      <Form addBookmark={addBookmark} />
      <BookmarksList
        bookmarks={currentBookmarks}
        removeBookmark={removeBookmark}
      />
      <Pagination
        totalBookmarks={bookmarks.length}
        bookmarksPerPage={bookmarksPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
