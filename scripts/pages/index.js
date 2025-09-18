function getRecipes() {
  return recipes
}

const container = document.getElementById('recettes-container')
function displayRecipes() {
  container.innerHTML = ""
  recipes.forEach(recipe => {
    container.appendChild(recipeCards(recipe))
  })
}

const barreRecherche = document.getElementById('search')
const compteur = document.querySelector(".nombre-recettes")

barreRecherche.addEventListener("input", () => {
  const inputRecherche = barreRecherche.value
  let resultatRecherche = []

  if (inputRecherche.length < 3) {
    resultatRecherche = recipes
  }
  else {
    resultatRecherche = recipes.filter(recette => {
      const searchName = recette.name.includes(inputRecherche)
      const searchDescription = recette.description.includes(inputRecherche)
      //const searchIngredients = recette.ingredients.includes(inputRecherche)
      return searchName || searchDescription
    })
  }

  container.innerHTML = ""
  resultatRecherche.forEach(recipe => {
    container.appendChild(recipeCards(recipe))
  })
})

displayRecipes()