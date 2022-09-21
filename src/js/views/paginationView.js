import View from './View.js';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage + 1, 'next');
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage - 1, 'prev');
    }
    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton(curPage - 1, 'prev') +
        this._generateMarkupButton(curPage + 1, 'next')
      );
    }
    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(page, type) {
    const icon = `
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${
      type === 'prev' ? 'left' : 'right'
    }"></use>
      </svg>
    `;
    const spanPage = `<span>Page ${page}</span>`;
    return `<button data-goto='${page}' class='btn--inline pagination__btn--${type}'>
      ${type === 'prev' ? icon + spanPage : spanPage + icon}
    </button>`;
  }
}

export default new PaginationView();
