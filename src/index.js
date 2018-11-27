const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const newToySubmit = document.querySelector('.submit')
const newToyName = document.querySelector('[name="name"]')
const newToyImage = document.querySelector('[name="image"]')



let addToy = false
let currentToy;

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

    const addToyName = document.createElement('h2')
    addToyName.innerHTML = toy.name

    const addToyImage = document.createElement('img')
    addToyImage.className = "toy-avatar"
    addToyImage.src = toy.image

    const addToyLikes = document.createElement('p')
    addToyLikes.innerHTML = `${toy.likes} Likes`

    const addToyLikeButton = document.createElement('button')
    addToyLikeButton.className = "like-btn"
    addToyLikeButton.innerHTML = "Like <3"
    addToyLikeButton.addEventListener('click', function(e){
      currentToy = toy
      currentToy.likes++
      updateToy()
    })

    toyCollection.append(addToyCard)
    addToyCard.append(addToyName)
    addToyCard.append(addToyImage)
    addToyCard.append(addToyLikes)
    addToyCard.append(addToyLikeButton)
  })
}

newToySubmit.addEventListener('click', function(e){
  e.preventDefault()
  createToy()
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  newToyName.value = ''
  newToyImage.value = ''
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

const createToy = function(){
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: newToyName.value,
      image: newToyImage.value,
      likes: 0
    })
  })
    .then( render )
}

const updateToy = function(){
  fetch(`http://localhost:3000/toys/${currentToy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: currentToy.likes
    })
  })
    .then( render )
}

render()

// OR HERE!
