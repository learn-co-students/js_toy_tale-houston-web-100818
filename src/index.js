const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const ce = document.createElement.bind(document)
const qs = document.querySelector.bind(document)
let toyCollection =  qs('#toy-collection')
let addToy = false
let currentToy;
const submitButton = document.querySelector('#submit-button')

// YOUR CODE HERE
const render = function(){
  fetch('http://localhost:3000/toys')
    .then(function(response){
      return response.json()
    })
    .then(function(toys){
      console.log(toys)
      renderToys(toys)
      
  })
}


const renderToys = function(toys){

  toyCollection.innerHTML = ''
  toys.forEach(function(toy){
    // declaring & creating elements
    const toyDiv = document.createElement('div')
    const toyName = document.createElement('h2')
    const toyLikes = document.createElement('p')
    const toyImage = document.createElement('img')
    const likeButton = document.createElement('button')
    

    // setting html
    toyDiv.className = "card"
    toyImage.className = "toy-avatar"
    toyImage.src =`${toy.image}`
    likeButton.className ="like-btn"
    likeButton.innerHTML = 'Like'
    toyName.innerHTML = toy.name
    toyLikes.innerHTML = `${toy.likes} Likes`
    
    // like button event listener
    likeButton.addEventListener('click', function (e) {
      e.preventDefault()
      console.log('like button clicked')
      currentToy = toy
      currentToy.likes++
      console.log(currentToy.likes)
      updateToy()
    })
    
    
    //append to document
    toyCollection.append(toyDiv)
    toyDiv.append(toyName)
    toyDiv.append(toyImage)
    toyDiv.append(toyLikes)
    toyDiv.append(likeButton)
  })
  
  // create button event listener
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    console.log('add button is working')
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      submitButton.addEventListener('click', function(e){
        createToy()
        addToy = false
        render()
        
      })
    } else {
      toyForm.style.display = 'none'
    }
  })
}

const updateToy = function () {
  fetch(`http://localhost:3000/toys/${currentToy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: currentToy.likes,
    })
  })
    .then(render)
}

const createToy = function(){
  fetch(`http://localhost:3000/toys/`,{
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: document.querySelector('#create-toy-name').value,
      image: document.querySelector('#create-toy-image-url').value,
      likes: 0

    })
  }) 
  .then(render)
}



render();
