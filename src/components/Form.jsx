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

  const validateUrl = (url) => {
    const regex =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return regex.test(url);
  };

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
    setBookmark({ id: '', url: '' });
    // eslint-disable-next-line no-shadow
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
