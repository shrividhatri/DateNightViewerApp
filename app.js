let dateIdeas = [];

// Fetch date ideas from the JSON file
async function fetchDateIdeas() {
  try {
    const response = await fetch('dateIdeas.json');
    if (response.ok) {
      dateIdeas = await response.json();
      sortAndFilterIdeas(); // Initial render with fetched data
    } else {
      console.error('Failed to fetch date ideas.');
    }
  } catch (error) {
    console.error('Error fetching date ideas:', error);
  }
}

// Function to render date ideas
function renderDateIdeas(ideas) {
  const ideasContainer = document.getElementById("ideasContainer");
  ideasContainer.innerHTML = "";
  ideas.forEach((idea, index) => {
    const ideaCard = document.createElement("div");
    ideaCard.className = "idea-card";
    ideaCard.innerHTML = `
      <h2>${idea.name}</h2>
      <p>Price: Rs ${idea.price}</p>
      <p>Distance: ${idea.distance} km</p>
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

// Initial fetch
fetchDateIdeas();
