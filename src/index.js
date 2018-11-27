document.addEventListener('DOMContentLoaded', () => {

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
let addToy = false

const likeToy = function(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  }).then (render)
}

// YOUR CODE HERE
const render = function() {
  fetch('http://localhost:3000/toys')
  .then( function(response) {
    return response.json()
  })
  .then(function(toys) {
    toyCollection.innerHTML = ``
    toys.forEach(function(toy, indexOfToy) {
      const toyCard = toyCollection.appendChild(document.createElement('div'))
      toyCard.id = toy.id
      toyCard.className = 'card'
      const toyName = toyCard.appendChild(document.createElement('h2'))
      toyName.innerHTML = `${toy.name}`
      const toyImg = toyCard.appendChild(document.createElement('img'))
      toyImg.src = toy.image
      toyImg.className = 'toy-avatar'
      const toyLikes = toyCard.appendChild(document.createElement('p'))
      toyLikes.innerHTML = `${toy.likes} Likes`
      const likeButton = toyCard.appendChild(document.createElement('button'))
      likeButton.innerHTML = "Like <3"
      likeButton.className = "like-btn"
      likeButton.addEventListener('click', (event) => {
        likeToy(toy)
      })
    })
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
})
