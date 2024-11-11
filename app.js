let dateIdeas = [];

// Fetch date ideas from the JSON file
async function fetchDateIdeas() {
  try {
    const response = await fetch('ideas.json');
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

// Render the date ideas
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
      <button onclick="toggleDescription(${index})">Show Description</button>
      <div class="description-box" id="description-${index}">${idea.description}</div>
    `;
    ideasContainer.appendChild(ideaCard);
  });
}

// Toggle description visibility
function toggleDescription(index) {
  const descriptionBox = document.getElementById(`description-${index}`);
  if (descriptionBox.style.display === "block") {
    descriptionBox.style.display = "none";
  } else {
    descriptionBox.style.display = "block";
  }
}

// Sort and filter function
function sortAndFilterIdeas() {
  const sortBy = document.getElementById("sort").value;
  const minTime = parseFloat(document.getElementById("minTime").value) || 0;
  const maxTime = parseFloat(document.getElementById("maxTime").value) || Infinity;
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
  const energyFilter = document.getElementById("energyFilter").value;
  const minDistance = parseFloat(document.getElementById("minDistance").value) || 0;
  const maxDistance = parseFloat(document.getElementById("maxDistance").value) || Infinity;

  let filteredIdeas = dateIdeas.filter(idea => {
    return (idea.time >= minTime && idea.time <= maxTime) &&
           (idea.price >= minPrice && idea.price <= maxPrice) &&
           (idea.distance >= minDistance && idea.distance <= maxDistance) &&
           (!energyFilter || idea.energy === energyFilter);
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
