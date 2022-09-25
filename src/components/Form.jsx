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
    setBookmark({ id: '', url: '' });
    addBookmark(bookmark);
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
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
}

Form.propTypes = {
  addBookmark: PropTypes.func.isRequired,
};

export default Form;
