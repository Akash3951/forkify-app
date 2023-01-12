import icons from 'url:../../img/icons.svg';
import viewPreview from './viewPreview.js';
import View from './view.js';

class viewBookmarks extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMsg = 'No bookmarks yet, find a nice recipe and bookmark it!!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkUp() {
    return this._data
      .map(bookmark => viewPreview.render(bookmark, false))
      .join('');
  }
}

export default new viewBookmarks();
