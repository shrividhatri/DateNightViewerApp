// Sample date ideas with descriptions
const dateIdeas = [
  { name: "Hiking", price: 0, distance: 10, time: 4, energy: "High", description: "A scenic hiking experience with beautiful views." },
  { name: "Movie Night", price: 15, distance: 2, time: 2, energy: "Low", description: "Relax with a cozy movie night at your favorite theater." },
  { name: "Cooking Class", price: 50, distance: 5, time: 3, energy: "Medium", description: "Learn new recipes and cooking techniques together." },
  { name: "Beach Day", price: 0, distance: 15, time: 6, energy: "Medium", description: "Enjoy a sunny day at the beach with fun activities." },
];

// Function to render date ideas
function renderDateIdeas(ideas) {
  const ideasContainer = document.getElementById("ideasContainer");
  ideasContainer.innerHTML = "";
  ideas.forEach((idea, index) => {
    const ideaCard = document.createElement("div");
    ideaCard.className = "idea-card";
    ideaCard.innerHTML = `
      <h2>${idea.name}</h2>
      <p>Price: $${idea.price}</p>
      <p>Distance: ${idea.distance} miles</p>
      <p>Time: ${idea.time} hours</p>
      <p>Energy: ${idea.energy}</p>
      <button onclick="toggleDescription(${index})">Description</button>
      <div class="description-box" id="description-${index}">${idea.description}</div>
    `;
    ideasContainer.appendChild(ideaCard);
  });
}

// Toggle description visibility
function toggleDescription(index) {
  const descriptionBox = document.getElementById(`description-${index}`);
  descriptionBox.style.display = descriptionBox.style.display === "block" ? "none" : "block";
}

// Sort and filter function
function sortAndFilterIdeas() {
  const sortBy = document.getElementById("sort").value;
  const minTime = document.getElementById("minTime").value;
  const maxTime = document.getElementById("maxTime").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;
  const energyFilter = document.getElementById("energyFilter").value;
  const minDistance = document.getElementById("minDistance").value;
  const maxDistance = document.getElementById("maxDistance").value;

  let filteredIdeas = dateIdeas.filter(idea => {
    return (!minTime || idea.time >= minTime) &&
           (!maxTime || idea.time <= maxTime) &&
           (!minPrice || idea.price >= minPrice) &&
           (!maxPrice || idea.price <= maxPrice) &&
           (!energyFilter || idea.energy === energyFilter) &&
           (!minDistance || idea.distance >= minDistance) &&
           (!maxDistance || idea.distance <= maxDistance);
  });

  filteredIdeas = filteredIdeas.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "distance") return a.distance - b.distance;
    if (sortBy === "time") return a.time - b.time;
    if (sortBy === "energy") return a.energy.localeCompare(b.energy);
  });

  renderDateIdeas(filteredIdeas);
}

// Initial render
renderDateIdeas(dateIdeas);
