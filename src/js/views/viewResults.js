import icons from 'url:../../img/icons.svg';
import viewPreview from './viewPreview.js';
import View from './view.js';

class viewResults extends View {
  _parentEl = document.querySelector('.results');
  _errorMsg = 'No recipes found for your search. Please try another one!!';
  _message = '';

  _generateMarkUp() {
    return this._data.map(result => viewPreview.render(result, false)).join('');
  }
}

export default new viewResults();
