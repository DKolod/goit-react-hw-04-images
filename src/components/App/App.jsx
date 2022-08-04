// import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import searchImg from '../../ApiServices/Api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from '../Loader/Loader';
import Button from 'components/Button/Button';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    setLoading(true);
    setVisible(false);

    searchImg(searchName, page)
      .then(data => {
        const images = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        images.length > 0 ? toast.success('Done') : toast.warning('Not Found');

        images.length > 11 ? setVisible(true) : setVisible(false);

        setImages(state => [...state, ...images]);
        setLoading(false);
      })
      .catch(eror => toast.error('eror.message 404'));
  }, [searchName, page]);

  const hendleSubmit = e => {
    setPage(1);
    setImages([]);
    setSearchName(e);
  };

  const onImgClick = (largeImageURL, alt) => {
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    togleModal();
  };

  const togleModal = () => {
    setShowModal(show => !show);
  };
  const onLoadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <div className={css.Container}>
      <Searchbar onSubmit={hendleSubmit} />
      <ImageGallery images={images} onClick={onImgClick} />
      {showModal && (
        <Modal onClose={togleModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
      {loading && <Loader />}
      {visible && <Button onClick={onLoadMore} />}

      <ToastContainer />
    </div>
  );
}
