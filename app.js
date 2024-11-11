// Sample date ideas data
const dateIdeas = [
  { name: "Hiking", price: 0, distance: "10 miles", time: "4 hours", energy: "High" },
  { name: "Movie Night", price: 15, distance: "2 miles", time: "2 hours", energy: "Low" },
  { name: "Cooking Class", price: 50, distance: "5 miles", time: "3 hours", energy: "Medium" },
  { name: "Beach Day", price: 0, distance: "15 miles", time: "6 hours", energy: "Medium" },
];

// Function to render date ideas on the page
function renderDateIdeas(ideas) {
  const ideasContainer = document.getElementById("ideasContainer");
  ideasContainer.innerHTML = "";
  ideas.forEach(idea => {
    const ideaCard = document.createElement("div");
    ideaCard.className = "idea-card";
    ideaCard.innerHTML = `
      <h2>${idea.name}</h2>
      <p>Price: $${idea.price}</p>
      <p>Distance: ${idea.distance}</p>
      <p>Time: ${idea.time}</p>
      <p>Energy: ${idea.energy}</p>
    `;
    ideasContainer.appendChild(ideaCard);
  });
}

// Initial render
renderDateIdeas(dateIdeas);

// Sorting function
function sortIdeas() {
  const sortBy = document.getElementById("sort").value;
  const sortedIdeas = [...dateIdeas].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "distance") return parseInt(a.distance) - parseInt(b.distance);
    if (sortBy === "time") return parseInt(a.time) - parseInt(b.time);
    if (sortBy === "energy") return a.energy.localeCompare(b.energy);
  });
  renderDateIdeas(sortedIdeas);
}
