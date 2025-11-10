function getRecipes() {
  return recipes
}

const criteres = {
  text: "",
  ingredients: [],
  ustensils: [],
  appareils: []
}

const container = document.getElementById('recettes-container')

function displayRecipes(recipes) {
  container.innerHTML = ""
  recipes.forEach(recipe => {
    container.appendChild(recipeCards(recipe))
  })
  numberPlat(recipes)
}

const barreRecherche = document.getElementById('search')
const compteur = document.querySelector(".nombre-recettes")

barreRecherche.addEventListener("input", () => {
  const inputRecherche = barreRecherche.value
  let resultatRecherche = []

  if (inputRecherche.length < 3) {
    criteres.text = ""
  }
  else {
    criteres.text = inputRecherche

  }
  filterRecipes()
})

const selectIngredients = document.getElementById("option-ingredients")
const selectAppareils = document.getElementById("option-appareils")
const selectUstensiles = document.getElementById("option-ustensiles")
const tagContainer = document.getElementById("tags-container")
const selectedOptionIngredients = document.getElementById("option-selected-ingredients")
const selectedOptionAppareils = document.getElementById("option-selected-appareils")
const selectedOptionUstensiles = document.getElementById("option-selected-ustensiles")
const unselectedOptionIngredients = document.getElementById("option-ingredients")
const unselectedOptionAppareils = document.getElementById("option-appareils")
const unselectedOptionUstensiles = document.getElementById("option-ustensiles")

function createOption(parent, text, type) {
  const option = document.createElement("div")
  option.classList.add("option")
  option.textContent = text
  option.addEventListener("click", (e) => {
    createTag(text, type)
    if (type === "ingredient") {
      criteres.ingredients.push(text)
      option.classList.add("selected", "hidden")
      const cloneOption = option.cloneNode(true)
      cloneOption.classList.remove("hidden")
      selectedOptionIngredients.appendChild(cloneOption)
    }
    else if (type === "appareil") {
      criteres.appareils.push(text)
      option.classList.add("selected", "hidden")
      const cloneOption = option.cloneNode(true)
      cloneOption.classList.remove("hidden")
      selectedOptionAppareils.appendChild(cloneOption)
    }
    else if (type === "ustensile") {
      criteres.ustensils.push(text)
      option.classList.add("selected", "hidden")
      const cloneOption = option.cloneNode(true)
      cloneOption.classList.remove("hidden")
      selectedOptionUstensiles.appendChild(cloneOption)
    }
    filterRecipes()
  })
  parent.appendChild(option)
}

function selects() {
  const memoIngredients = []
  const memoAppareils = []
  const memoUstensils = []

  recipes.forEach(recette => {
    recette.ingredients.forEach(ingredient => {
      if (!memoIngredients.includes(ingredient.ingredient)) {
        memoIngredients.push(ingredient.ingredient)
        createOption(selectIngredients, ingredient.ingredient, "ingredient")
      }
    })

    if (!memoAppareils.includes(recette.appliance)) {
      memoAppareils.push(recette.appliance)
      createOption(selectAppareils, recette.appliance, "appareil")
    }

    recette.ustensils.forEach(ustensils => {
      if (!memoUstensils.includes(ustensils)) {
        memoUstensils.push(ustensils)
        createOption(selectUstensiles, ustensils, "ustensile")
      }
    })
  })
}

document.querySelectorAll(".select").forEach(select => {
  const selectName = select.querySelector(".select-name")
  const options = select.querySelector(".select-options")
  const icon = selectName.querySelector("i")

  selectName.addEventListener("click", () => {
    options.classList.toggle("open")

    if (options.classList.contains("open")) {
      icon.classList.remove("fa-chevron-down")
      icon.classList.add("fa-chevron-up")
    } else {
      icon.classList.remove("fa-chevron-up")
      icon.classList.add("fa-chevron-down")
    }
  })
})

function createTag(tagContent, type) {
  const tag = document.createElement("article")
  tag.classList.add("tag")
  tag.textContent = tagContent

  const closeBtn = document.createElement("i")
  closeBtn.classList.add("fa-solid", "fa-xmark")
  closeBtn.style.cursor = "pointer"

  closeBtn.addEventListener("click", () => {
    tag.remove()
    if (type === "ingredient") {
      indexIngredient = criteres.ingredients.findIndex(index => {
        return index == tagContent
      })
      criteres.ingredients.splice(indexIngredient, 1)
    }
    else if (type === "appareil") {
      indexAppareil = criteres.appareils.findIndex(index => {
        index == tagContent
      })
      criteres.appareils.splice(indexAppareil, 1)
    }
    else if (type === "ustensile") {
      indexUstensils = criteres.ustensils.findIndex(index => {
        index == tagContent
      })
      criteres.ustensils.splice(indexUstensils, 1)
    }

    const allOptions = document.querySelectorAll(".option")
    allOptions.forEach(option => {
      if (option.textContent === tagContent) {
        option.classList.remove("hidden")
        option.classList.remove("selected")
      }
    })

    let selectedContainer
    if (type === "ingredient") selectedContainer = selectedOptionIngredients
    else if (type === "appareil") selectedContainer = selectedOptionAppareils
    else if (type === "ustensile") selectedContainer = selectedOptionUstensiles

    const clones = selectedContainer.querySelectorAll(".option")
    clones.forEach(clone => {
      if (clone.textContent === tagContent) {
        clone.remove()
      }
    })

    filterRecipes()
  })

  tag.appendChild(closeBtn)
  tagContainer.appendChild(tag)
}

function filterRecipes() {
  let resultatRecherche = []

  resultatRecherche = recipes.filter(recette => {
    const searchName = recette.name.includes(criteres.text)
    const searchDescription = recette.description.includes(criteres.text)
    return searchName || searchDescription
  })

  resultatRecherche = resultatRecherche.filter(recette => {
    let match = true
    criteres.ingredients.forEach(critereIngredient => {
      let matchIngredient = recette.ingredients.find(
        ingredient => ingredient.ingredient == critereIngredient
      )
      if (!matchIngredient) {
        match = false
      }
    })
    return match
  })

  resultatRecherche = resultatRecherche.filter(recette => {
    let match = true
    criteres.appareils.forEach(critereAppareil => {
      if (recette.appliance != critereAppareil) {
        match = false
      }
    })
    return match
  })

  resultatRecherche = resultatRecherche.filter(recette => {
    let match = true
    criteres.ustensils.forEach(critereUstensil => {
      let matchUstensil = recette.ustensils.find(
        ustensil => ustensil == critereUstensil
      )
      if (!matchUstensil) {
        match = false
      }
    })
    return match
  })

  displayRecipes(resultatRecherche)
  actualSelects(resultatRecherche)
}

function numberPlat(recettes) {
  const compteurRecette = document.querySelector(".nombre-recettes")
  compteurRecette.textContent = `${recettes.length} recettes`

}

const searchBar = document.getElementById("search")
const clearButton = document.getElementById("clear-search")

searchBar.addEventListener("focus", () => {
  searchBar.placeholder = ""
})

searchBar.addEventListener("blur", () => {
  searchBar.placeholder = "Rechercher une recette, un ingrédient ..."
})


searchBar.addEventListener("input", () => {
  if (searchBar.value.length > 0) {
    clearButton.style.display = "inline"
  } else {
    clearButton.style.display = "none"
  }
})

clearButton.addEventListener("click", () => {
  searchBar.value = ""
  clearButton.style.display = "none"
  displayRecipes(recipes)
})

function actualSelects(recipesFilter) {

  selectIngredients.innerHTML = ""
  selectAppareils.innerHTML = ""
  selectUstensiles.innerHTML = ""

  const memoIngredients = []
  const memoAppareils = []
  const memoUstensils = []

  recipesFilter.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if(!memoIngredients.includes(ingredient.ingredient)){
        memoIngredients.push(ingredient.ingredient)
        createOption(selectIngredients, ingredient.ingredient, "ingredient")
      }
    })

    if(!memoAppareils.includes(recipe.appliance)){
      memoAppareils.push(recipe.appliance)
      createOption(selectAppareils, recipe.appliance, "appareil")
    }

    recipe.ustensils.forEach(ustensil => {
      if(!memoUstensils.includes(ustensil)){
        memoUstensils.push(ustensil)
        createOption(selectUstensiles, ustensil, "ustensile")
      }
    })
  })
}

function init() {
  displayRecipes(recipes)
  selects()
}

init()