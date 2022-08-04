import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import searchImg from '../../ApiServices/Api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from '../Loader/Loader';
import Button from 'components/Button/Button';

export class App extends Component {
  state = {
    searchName: '',
    images: [],
    largeImageURL: '',
    alt: '',
    showModal: false,
    loading: false,
    visible: false,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    try {
      if (prevState.searchName !== searchName) {
        this.setState({ loading: true, images: [], page: 1, visible: false });
      }

      if (searchName !== prevState.searchName || page !== prevState.page) {
        const response = await searchImg(searchName, page);
        const images = response.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        images.length > 0
          ? toast.success('Done')
          : toast.warning(' Not Found ');

        images.length > 11
          ? this.setState({ visible: true })
          : this.setState({ visible: false });

        this.setState(state => ({
          images: [...state.images, ...images],
          loading: false,
        }));
      }
    } catch (eror) {
      console.log(eror.message);
      toast.error('eror.message 404');
    }
  }

  hendleSubmit = e => {
    this.setState({ page: 1 });
    this.setState({ searchName: e });
  };

  onImgClick = (largeImageURL, alt) => {
    this.setState({ largeImageURL, alt });
    this.togleModal();
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onLoadMore = () => {
    this.setState(state => ({ page: state.page + 1, loading: true }));
  };

  showMoreButton = () => {
    this.setState({ loading: true });
  };
  hideMoreButton = () => {
    this.setState({ loading: false });
  };

  render() {
    const { showModal, images, largeImageURL, alt, visible, loading } =
      this.state;
    return (
      <div className={css.Container}>
        <Searchbar onSubmit={this.hendleSubmit} />
        <ImageGallery
          images={images}
          onClick={this.onImgClick}
          showMoreButton={this.showMoreButton}
          hideMoreButton={this.hideMoreButton}
        />
        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
        {loading && <Loader />}
        {visible && <Button onClick={this.onLoadMore} />}

        <ToastContainer />
      </div>
    );
  }
}
