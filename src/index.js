const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const formName = document.querySelector('[name="name"]');
const formImage = document.querySelector('[name="image"]');
// const createToy = document.querySelector('[type="submit"]');
let addToy = false;

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
    toyForm.addEventListener("submit", function(event) {
      event.preventDefault();
      createToy();
    });
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!

// This is a function that updates our data
const likeToy = function(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  }).then(fetchData); //or (render)
};

// This is a function that fetches our data -(render) function
const fetchData = function() {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(toys) {
      renderToys(toys);
    });
};

// This will render the toys we get from the Json data
const renderToys = function(toys) {
  toyCollection.innerHTML = ``;
  // This takes the data from toys, makes it so we can access each one individually (in this instance, it's in the word "toy" and then have access to it's unique attributes)
  toys.forEach(function(toy) {
    const toyName = document.createElement("h2");
    const toyImage = document.createElement("img");
    const toyCard = document.createElement("div");
    const toyLikes = document.createElement("p");
    const likeButton = document.createElement("button");

    //Set toy card with a class name of card, for css purposes
    toyCard.className = "card";
    //SEt toy name to an HTML element
    toyName.innerHTML = toy.name;
    //Set Image to an html element with the class name of toy-avatar
    toyImage.className = "toy-avatar";
    toyImage.src = toy.image;

    toyLikes.innerHTML = `${toy.likes} likes`;

    likeButton.innerHTML = "Like";
    likeButton.className = "like-btn";

    toyCard.append(toyName);
    toyCard.append(toyImage);
    toyCard.append(toyLikes);
    toyCard.append(likeButton);
    toyCollection.append(toyCard);

    // Create your event listener for a button

    likeButton.addEventListener("click", function(event) {
      likeToy(toy);
    });
  });
};

// this is a function for our event listeners!  So that we can add new toys!

// CODE HERE

const createToy = function() {
  // this fetches but does a POST request instead of a GET request

  fetch(`http://localhost:3000/toys/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: formName.value,
      image: formImage.value,
      likes: 0
    })
  }).then(fetchData);
};

// This invokes our fetch function
fetchData();
