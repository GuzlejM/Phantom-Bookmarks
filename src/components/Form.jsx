import { Button, TextField } from '@mui/material';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

function Form({ addBookmark }) {
  const [bookmark, setBookmark] = useState({
    id: '',
    url: '',
  });

  const handleURLInputChange = useCallback((e) => {
    // e.target.value contains new input from onChange
    // event for input elements
    setBookmark({ id: uuid(), url: e.target.value });
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    addBookmark({ ...bookmark, id: uuid() });
    setBookmark({ ...bookmark, url: e.target.value });
    console.log('here', bookmark);
    console.log('here 2', ...bookmark);
  });

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        label="Url"
        type="text"
        name="url"
        value={bookmark.url}
        onChange={handleURLInputChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Form;
