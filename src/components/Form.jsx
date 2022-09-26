/* eslint-disable operator-linebreak */
import { Button, TextField } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

function Form({ addBookmark }) {
  const [bookmark, setBookmark] = useState({
    id: '',
    url: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const [label, setLabel] = useState('Url');

  //URL VALIDATOR
  const validateUrl = (url) => {
    const regex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    return regex.test(url);
  };

  // Handling pasting from clipboard into input
  const handlePaste = (event) => {
    event.clipboardData.getData('text');
  };

  useEffect(() => {
    const handlePasteAnywhere = (event) => {
      event.clipboardData.getData('text');
    };

    window.addEventListener('paste', handlePasteAnywhere);

    return () => {
      window.removeEventListener('paste', handlePasteAnywhere);
    };
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault(); // prevents browser refresh
    setBookmark({ id: '', url: '' }); // sets input values into empty string
    // eslint-disable-next-line no-shadow
    // VALIDATOR conditional
    const isValid = validateUrl(bookmark.url);
    if (bookmark.url !== '' && isValid) {
      setIsValid(isValid);
      addBookmark(bookmark);
    } else {
      setBookmark({ id: '', url: bookmark.url });
    }
  });

  const handleURLInputChange = useCallback((e) => {
    // e.target.value contains new input from onChange
    // event for input elements
    setBookmark({ id: uuid(), url: e.target.value });
    // eslint-disable-next-line no-shadow
    const isValid = validateUrl(e.target.value);
    if (isValid) {
      setLabel('Url');
      setIsValid(true);
      setError(false);
    } else {
      setLabel('Error');
      setIsValid(false);
      setError(true);
    }
  });

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        error={error}
        label={label}
        type="text"
        name="url"
        value={bookmark.url}
        onChange={handleURLInputChange}
        onPaste={handlePaste}
      />
      {isValid && bookmark.url === '' ? null : (
        <Button onClick={handleSubmit}>Submit</Button>
      )}
    </form>
  );
}

Form.propTypes = {
  addBookmark: PropTypes.func.isRequired,
};

export default Form;
