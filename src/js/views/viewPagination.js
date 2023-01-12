import icons from 'url:../../img/icons.svg';

import View from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  handlerPagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goTOPage = +btn.dataset.goto;
      handler(goTOPage);
    });
  }

  _generateMarkUp() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    //page 1, and there are other pages.
    if (curPage === 1 && numPages > 1) {
      //   let goTOPage = curPage + 1;
      return this._generateMarkUpButton('next', curPage + 1, 'right');
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkUpButton('prev', curPage - 1, 'left');
    }

    //other page
    if (curPage < numPages) {
      return [
        this._generateMarkUpButton('prev', curPage - 1, 'left'),
        this._generateMarkUpButton('next', curPage + 1, 'right'),
      ].join(',');
    }

    //page 1, and there are no other pages.
    return '';
  }

  _generateMarkUpButton(slide, goTOPage, arrow) {
    return `
        <button data-goto="${goTOPage}" class="btn--inline pagination__btn--${slide}">
            <span>Page ${goTOPage}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
        </button> 
    `;
  }
}

export default new PaginationView();
