function getRecipes() {
  return recipes
}

const container = document.getElementById('recettes-container')
function displayRecipes(recipes) {
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
      return searchName || searchDescription
    })
  }

  displayRecipes(resultatRecherche)
})

function selects() {
  const selectIngredients = document.getElementById("ingredients")
  const selectAppareils = document.getElementById("appareils")
  const selectUstensiles = document.getElementById("ustensiles")

  recipes.forEach(recette => {
    recette.ingredients.forEach(ingredient => {
      const optionIngredients = document.createElement("option")
      optionIngredients.textContent = ingredient.ingredient
      selectIngredients.appendChild(optionIngredients)
    })

    const optionAppareil = document.createElement("option")
    optionAppareil.textContent = recette.appliance
    selectAppareils.appendChild(optionAppareil)

    recette.ustensils.forEach(ustensils => {
      const optionUstensils = document.createElement("option")
      optionUstensils.textContent = ustensils
      selectUstensiles.appendChild(optionUstensils)
    })
  })
}

function init() {
  displayRecipes(recipes)
  selects()
}

init()