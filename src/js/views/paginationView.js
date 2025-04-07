import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

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
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupButton('next', this._data.page);
    }

    // Last Page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', this._data.page);
    }

    // Other page
    if (this._data.page < numPages) {
      return `
      ${this._generateMarkupButton('prev', this._data.page)}
      ${this._generateMarkupButton('next', this._data.page)}
    `;
    }

    // Page 1, but there aren't other pages
    return '';
  }

  _generateMarkupButton(_type, page) {
    if (_type === 'next') {
      return `
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    } else if (_type === 'prev') {
      return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `;
    }
  }
}

export default new PaginationView();
