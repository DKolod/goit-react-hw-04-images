// import React, { Component } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChangeInput = e => {
    setValue(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.error('Write value name');
      //   alert('Write value name');

      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          {/* <span className={css.SearchFormButtonLabel}>Search</span> */}
          <BiSearch size={30} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images"
          value={value}
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}
