import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // Loading recipe
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    // Rendering recipe
  } catch (err) {
    alert(err);
  }
};

// https://forkify-api.jonas.io/api/v2/recipes?search=pizza

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes),
);
