import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, alt, onClick }) {
  return (
    <li className={css.ImageGalleryItem} onClick={onClick}>
      <img className={css.ImageGalleryItemImage} src={webformatURL} alt={alt} />
    </li>
  );
}
