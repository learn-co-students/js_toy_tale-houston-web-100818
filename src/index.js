// STARTER CODE
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', function(event) {
      event.preventDefault()
      createToy()
      addToy = !addToy
      toyForm.style.display = 'none'
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// MY CODE
const toyCollection = document.querySelector('#toy-collection')
let toys

// Fetch all the toys from the server and store them in toys variable
fetch('http://localhost:3000/toys')
.then(function(response) {
  return response.json()
}).then(function(result) {
  toys = result
  render()
})

const render = function() {
  toyCollection.innerHTML = ''
  toys.forEach(function(toy) {
    renderToy(toy)
  })
}

const renderToy = function(toy) {
  const toyCard = toyCollection.appendChild(document.createElement('div'))
  toyCard.className = 'card'
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
  `
  // add like button and event listener to add a like
  const likeButton = toyCard.appendChild(document.createElement('button'))
  likeButton.className = 'lik-btn'
  likeButton.innerText = 'Like <3'
  likeButton.addEventListener('click', function() {
    toy.likes++
    updateToy(toy)
  })
}

const createToy = function() {
  const toyData = toyForm.querySelector('form').querySelectorAll('input')
  const toy = {
    name: toyData[0].value,
    image: toyData[1].value,
    likes: 0
  }

  toys.push(toy)

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(toy)
  }).then(function(response) {
    return response.json()
  }).then(render)
}

const updateToy = function(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(toy)
  }).then(function(response) {
    return response.json()
  }).then(render)
}
