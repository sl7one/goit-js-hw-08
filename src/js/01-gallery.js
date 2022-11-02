// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  parentDom: document.querySelector('.gallery'),
};

const markup = makeMarkup(galleryItems);
refs.parentDom.insertAdjacentHTML('beforeend', markup);

const lightbox = new SimpleLightbox('.gallery a', {
  // overlay: false, // СКРИПТ ПАДАЕТ НА 2ОМ ВЫЗОВЕ
  captionsData: 'alt',
  captionDelay: 250,
  captionType: 'alt',
  captionPosition: 'bottom',
  overlayOpacity: 0.5,
});

function makeMarkup(obj) {
  return obj
    .map(el => {
      const { preview, original, description } = el;
      return `<a class="gallery__item" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" /></a>`;
    })
    .join('');
}
