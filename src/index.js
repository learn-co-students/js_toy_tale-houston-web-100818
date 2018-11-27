const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.getElementById("toy-collection");

let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

const render = function() {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(renderToys);
  // .then(function(toys) {
  //   toys.forEach(function(toy) {
  //     toyCollection.innerHTML += `
  //       <div class="card">
  //          <h2>${toy.name}</h2>
  //          <img class="toy-avatar" src="${toy.image}" />
  //          <p>${toy.likes} Likes</p>
  //          <button class="like-btn">Like <3</button>
  //       </div >`;
  //   });
  // });
};

function renderToys(toys) {
  toyCollection.innerHTML = "";
  toys.forEach(function(toy) {
    let toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img class="toy-avatar" src="${toy.image}" />
      <p >${toy.likes} Likes</p>
    `;
    let likeButton = document.createElement("button");
    likeButton.className = "like-btn";
    likeButton.innerHTML = `Like <3`;
    toyCard.append(likeButton);
    toyCollection.append(toyCard);
    //       <button class="like-btn">Like <3</button>

    likeBtn.addEventListener("click", function(e) {
      console.log("clicked!");
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          likes: toy.likes + 1
        })
      }).then(render);
    });
  });
}

toyForm.addEventListener("click", function(e) {
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name: toyForm.querySelector("#toy-name").value,
      image: toyForm.querySelector("#toy-image").value,
      likes: 0
    })
  }).then(render);
});

render();
