const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDiv = document.body.querySelector('#toy-collection')
const toyNameField = document.body.querySelector("input[name='name']")
const toyImgField = document.body.querySelector("input[name='image']")
const ce = document.createElement.bind(document)
let addToy = false

const render = () => {
  fetch('http://localhost:3000/toys')
  .then( (response) => {
    return response.json();
  })
  .then ( renderToys )
}

function renderToys(toys){
  toyDiv.innerHTML = ''
  toys.forEach( (toy) => {
    let toyCard = ce('div')
    toyCard.className = 'card'
    let toyName = ce('h2')
    toyName.innerText = toy.name
    let toyImage = ce('img')
    toyImage.className = 'toy-avatar'
    toyImage.src = toy.image
    let toyLikes = ce('p')
    toyLikes.innerText = `${toy.likes} likes`
    let toyLikeButton = ce('button')
    toyLikeButton.className = 'like-btn'
    toyLikeButton.innerText = 'like <3'
    toyLikeButton.addEventListener('click', e => {
      addLike(toy);
    })
    toyDiv.append(toyCard);
    [ toyName, toyImage, toyLikes, toyLikeButton ].forEach( element => {
      toyCard.append(element)
    })
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    document.body.querySelector('.submit').addEventListener('click', (e) => {
      e.preventDefault()
      createToy();
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function createToy() {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify (
    {
      name: toyNameField.value,
      image: toyImgField.value,
      likes: 0
    })
  })
  .then(render);
  toyNameField.value = ''
  toyImgField.value = ''
}

function addLike(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      likes: (toy.likes+1)
    })
  })
  .then(render);
}

render();
