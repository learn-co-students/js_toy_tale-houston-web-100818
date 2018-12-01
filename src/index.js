const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyContainer = document.querySelector("#toy-collection");
const newToy = document.querySelector('[name="name"]');
const newImg = document.querySelector('[name="image"]');
let addToy = false;

const API = "http://localhost:3000/toys";

let toys = [];

// YOUR CODE HERE

const fetchToys = function() {
  fetch(API)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      toys = result;
      renderToys();
    });
};

const renderToys = function() {
  toyContainer.innerHTML = ``;

  toys.forEach(function(toy) {
    const toyCard = document.createElement("div");
    const toyName = document.createElement("h2");
    toyName.innerHTML = toy.name;

    const toyImg = document.createElement("img");
    toyImg.src = toy.image;

    const toyLikes = document.createElement("p");
    console.log(toyLikes);
    toyLikes.innerHTML = `${toy.likes} likes`;

    const toyLikesButton = document.createElement("button");
    toyLikesButton.innerHTML = "Like";

    toyCard.append(toyName, toyImg, toyLikesButton, toyLikes);
    toyLikesButton.className = "like-btn";
    toyImg.className = "toy-avatar";
    toyCard.className = "card";
    toyContainer.append(toyCard);

    toyLikesButton.addEventListener("click", function(event) {
      console.log("click");
      toy.likes++;
      likeToy(toy);
      renderToys();
    });
  });
};

likeToy = function(toy) {
  fetch(`${API}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  });
};

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

toyForm.addEventListener("submit", function(event) {
  console.log("submit");
  event.preventDefault();
  createToy();
  newToy.value = "";
  newImg.value = "";
});

createToy = function() {
  fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: newToy.value,
      image: newImg.value,
      likes: 0
    })
  }).then(fetchToys);
};

// OR HERE!
fetchToys();

// const addBtn = document.querySelector("#new-toy-btn");
// const toyForm = document.querySelector(".container");
// const toyCollection = document.querySelector("#toy-collection");
// const formName = document.querySelector('[name="name"]');
// const formImage = document.querySelector('[name="image"]');
// let toys;

// // const createToy = document.querySelector('[type="submit"]');
// let addToy = false;

// // This is a function that fetches our data -(render) function
// const fetchData = function() {
//   fetch("http://localhost:3000/toys")
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(result) {
//       toys = result;
//       renderToys();
//     });
// };

// const renderToys = function() {
//   toyCollection.innerHTML = ``;
//   // This takes the data from toys, makes it so we can access each one individually (in this instance, it's in the word "toy" and then have access to it's unique attributes)
//   toys.forEach(function(toy) {
//     const toyName = document.createElement("h2");
//     const toyImage = document.createElement("img");
//     const toyCard = document.createElement("div");
//     const toyLikes = document.createElement("p");
//     const likeButton = document.createElement("button");

//     //Set toy card with a class name of card, for css purposes
//     toyCard.className = "card";
//     //SEt toy name to an HTML element
//     toyName.innerHTML = toy.name;
//     //Set Image to an html element with the class name of toy-avatar
//     toyImage.className = "toy-avatar";
//     toyImage.src = toy.image;

//     toyLikes.innerHTML = `${toy.likes} likes`;

//     likeButton.innerHTML = "Like";
//     likeButton.className = "like-btn";

//     toyCard.append(toyName);
//     toyCard.append(toyImage);
//     toyCard.append(toyLikes);
//     toyCard.append(likeButton);
//     toyCollection.append(toyCard);

//     // Create your event listener for a button

//     likeButton.addEventListener("click", function(event) {
//       likeToy(toy);
//     });
//   });
// };
// addBtn.addEventListener("click", () => {
//   // hide & seek with the form
//   addToy = !addToy;
//   if (addToy) {
//     toyForm.style.display = "block";
//     // submit listener here
//     toyForm.addEventListener("submit", function(event) {
//       event.preventDefault();
//       createToy();
//     });
//   } else {
//     toyForm.style.display = "none";
//   }
// });

// // OR HERE!

// // This is a function that updates our data
// const likeToy = function(toy) {
//   fetch(`http://localhost:3000/toys/${toy.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       likes: toy.likes + 1
//     })
//   }).then(fetchData); //or (render)
// };

// // This will render the toys we get from the Json data

// // this is a function for our event listeners!  So that we can add new toys!

// // CODE HERE

// const createToy = function() {
//   // this fetches but does a POST request instead of a GET request

//   fetch(`http://localhost:3000/toys/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: formName.value,
//       image: formImage.value,
//       likes: 0
//     })
//   }).then(fetchData);

//   formName.value = "";
//   formImage.value = "";
// };

// // This invokes our fetch function
// fetchData();
