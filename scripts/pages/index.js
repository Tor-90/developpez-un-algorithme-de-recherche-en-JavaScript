function getRecipes() {
  return recipes;
}

function displayRecipes() {
  const container = document.getElementById('recettes-container')
  recipes.forEach(recipe => {
    container.appendChild(recipeCards(recipe))
  })
}

displayRecipes()