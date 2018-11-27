const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection')
const submitToy = document.querySelector('[value="Create New Toy"]')
const nameInput = document.querySelector('input[name= "name"]')
const imageInput = document.querySelector('input[name= "image"]')

const render = () => {
  toyCollection.innerHTML = ''
  fetch('http://localhost:3000/toys') 
	.then( function(response) {
	return response.json()
  })
	.then ( function(toys) {
    toys.forEach(function(toy){
      const card = document.createElement("div")
      const toyName = document.createElement("h2")
      const toyImage = document.createElement("img")
      const toyLikes = document.createElement("p")
      const likeButton = document.createElement("button")

      card.className = "card"
      
      toyName.innerText = toy.name
      toyImage.className = "toy-avatar"
      toyImage.src = toy.image
      toyLikes.innerHTML = `${toy.likes} likes`
      likeButton.className = "like.btn"
      likeButton.innerHTML = "Like <3"
      
      card.append(toyName)
      card.append(toyImage)
      card.append(toyLikes)
      card.append(likeButton)
      toyCollection.append(card);

      likeButton.addEventListener('click', (e) => {
        e.preventDefault()
        toy.likes++
        saveToy(toy)
        toyLikes.innerHTML = `${toy.likes} likes`
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

submitToy.addEventListener('click', (e) => {
  e.preventDefault();

 fetch(`http://localhost:3000/toys`, {
  method: 'POST',
  headers: 
  {
    "Content-Type": "application/json",
  },
  
  body: JSON.stringify ({
    name: nameInput.value,
    image: imageInput.value,
    likes: 0
  })
  
  }).then ( render )
  
})

saveToy = (toy) => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: 'PATCH',
  headers: 
  {
    "Content-Type": "application/json",
  },
  
  body: JSON.stringify (toy)
  
  }).then ( render )
}

render();

// OR HERE!
