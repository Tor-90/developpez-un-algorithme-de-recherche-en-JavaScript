function recipeCards(recipe) {

    const article = document.createElement('article')
    article.classList.add('card')

    const photoDiv = document.createElement('div')
    photoDiv.classList.add('photo-plat')

    const img = document.createElement('img')
    img.setAttribute('src', `assets/images/${recipe.image}`)
    img.setAttribute('alt', recipe.name)
    photoDiv.appendChild(img)

    const contentDiv = document.createElement('div')
    contentDiv.classList.add('card-content')

    const title = document.createElement('p')
    title.classList.add('titre-plat')
    title.textContent = recipe.name

    const descriptionDiv = document.createElement('div')
    descriptionDiv.classList.add('description')

    const descriptionTitle = document.createElement('p')
    descriptionTitle.classList.add('titre')
    descriptionTitle.textContent = "RECETTE"

    const descriptionText = document.createElement('p')
    descriptionText.classList.add('desc')
    descriptionText.textContent = recipe.description

    descriptionDiv.appendChild(descriptionTitle)
    descriptionDiv.appendChild(descriptionText)

    const ingredientsDiv = document.createElement('div')
    ingredientsDiv.classList.add('ingredients')

    const ingredientsTitle = document.createElement('p')
    ingredientsTitle.classList.add('titre')
    ingredientsTitle.textContent = "INGRÉDIENTS"

    const ingredientsGrid = document.createElement('div')
    ingredientsGrid.classList.add('grid-ingrédient')
    
    recipe.ingredients.forEach(ingredients => {
    const infoDiv = document.createElement('div')
    infoDiv.classList.add('info-ingredient')

    const nameP = document.createElement('p')
    nameP.classList.add('nom-ingredient')
    nameP.textContent = ingredients.ingredient

    const quantityP = document.createElement('p')
    quantityP.classList.add('dose-ingredient')
    quantityP.textContent = `${ingredients.quantity || ""} ${ingredients.unit || ""}`

    infoDiv.appendChild(nameP)
    infoDiv.appendChild(quantityP)
    ingredientsGrid.appendChild(infoDiv)
  })

  ingredientsDiv.appendChild(ingredientsTitle)
  ingredientsDiv.appendChild(ingredientsGrid)

  contentDiv.appendChild(title)
  contentDiv.appendChild(descriptionDiv)
  contentDiv.appendChild(ingredientsDiv)

  article.appendChild(photoDiv)
  article.appendChild(contentDiv)

  return article
}