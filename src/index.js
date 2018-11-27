const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')


let addToy = false

const render = function(){
  fetch('http://localhost:3000/toys')
    .then(function(response){
      return response.json()
    })
    .then(function(toys){
      console.log(toys)
      renderToyCollection(toys)
    })
}

const renderToyCollection = function(toys){
  toyCollection.innerHTML = ''
  toys.forEach(function(toy){
    const addToyCard = document.createElement('div')
    addToyCard.className = "card"

    const addToyName = document.createElement('h1')
    addToyName.innerHTML = toy.name

    const addToyImage = document.createElement('img')
    addToyImage.className = "toy-avatar"
    addToyImage.src = toy.image

    const addToyLikes = document.createElement('p')
    addToyLikes.innerHTML = `${toy.likes} Likes`

    const addToyLikeButton = document.createElement('button')
    addToyLikeButton.className = "like-btn"
    addToyLikeButton.innerHTML = "Like <3"

    toyCollection.append(addToyCard)
    addToyCard.append(addToyName)
    addToyCard.append(addToyImage)
    addToyCard.append(addToyLikes)
    addToyCard.append(addToyLikeButton)
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

render()

// OR HERE!
