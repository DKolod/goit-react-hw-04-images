import React, { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChangeInput = e => {
    const valueInput = e.target.value;
    this.setState({ value: valueInput });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      toast.error('Write value name');
      //   alert('Write value name');

      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
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
            value={this.state.value}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
