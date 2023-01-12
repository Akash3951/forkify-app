import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import viewRecipe from './views/viewRecipe.js';
import viewSearch from './views/viewSearch.js';
import viewResults from './views/viewResults.js';
import viewPagination from './views/viewPagination.js';
import viewBookmarks from './views/viewBookmarks.js';
import viewAddRecipe from './views/viewAddRecipe.js';

if (module.hot) {
  module.hot.accept();
}

const controlReicpe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    viewRecipe.renderSpinner();

    //update results view to mark selected search result.
    viewResults.update(model.getSearchResultsPage());

    //updating bookmarksView
    viewBookmarks.update(model.state.bookmarks);

    //Loading Recipe
    await model.loadRecipe(id);

    //Rendering recipe
    viewRecipe.render(model.state.recipe);
  } catch (err) {
    viewRecipe.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //Get the query
    const query = viewSearch.getQuery();
    if (!query) return;

    viewResults.renderSpinner();

    //Load search result
    await model.loadSearchResults(query);

    //Render search result
    viewResults.render(model.getSearchResultsPage());

    //Render initial pagination buttons.
    viewPagination.render(model.state.search);
  } catch (err) {
    // console.error(err);
    viewResults.renderError();
  }
};

const controlPagination = function (goTOPage) {
  //Render new results
  viewResults.render(model.getSearchResultsPage(goTOPage));

  //Render new pagination buttons.
  viewPagination.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);

  //update the recipe view
  viewRecipe.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1.) Add/Remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2.) Update recipe view.
  viewRecipe.update(model.state.recipe);

  // 3.) Render bookmarks.
  viewBookmarks.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  viewBookmarks.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner.
    viewAddRecipe.renderSpinner();

    //Upload the new recipe data.
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe.
    viewRecipe.render(model.state.recipe);

    //Success message.
    viewAddRecipe.renderMessage();

    //Render bookmarks view.
    viewBookmarks.render(model.state.bookmarks);

    //Change ID in url.
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form window.
    setTimeout(function () {
      viewAddRecipe.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    viewAddRecipe.renderError(err.message);
  }
};

const init = function () {
  viewBookmarks.addHandlerRender(controlBookmarks);
  viewRecipe.handlerRecipe(controlReicpe);
  viewRecipe.handlerUpdateServings(controlServings);
  viewRecipe.addHandlerAddBookmark(controlAddBookmark);
  viewSearch.handlerSearch(controlSearchResults);
  viewPagination.handlerPagination(controlPagination);
  viewAddRecipe.addHandlerUpload(controlAddRecipe);
};

init();
