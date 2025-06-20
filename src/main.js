import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const loadMoreBtn = document.querySelector('.btn-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value.trim();
  page = 1;
  clearGallery();
  hideLoadMoreButton();

  if (!query) {
    iziToast.warning({
      title: 'Oops!',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchImages();
});

async function fetchImages() {
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    totalHits = data.totalHits;

    if (data.hits.length === 0 && page === 1) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    handleLoadMoreVisibility(data.hits.length);

    if (page > 1) {
      scrollToNextGroup();
    }

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }
}

function handleLoadMoreVisibility(resultsLength) {
  if (resultsLength < 15 || page * 15 >= totalHits) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
}

function scrollToNextGroup() {
  const { height: cardHeight } =
    document.querySelector('.gallery-item').getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
