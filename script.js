// Global list of activities (you can replace this with a backend or database)
const activities = ['Movie Night', 'Dinner Date', 'Bowling'];

// Function to populate the date night options for users
function populateDateNightOptions() {
    const select = document.getElementById('dateNightSelect');
    select.innerHTML = ''; // Clear any existing options
    activities.forEach((activity) => {
        const option = document.createElement('option');
        option.value = activity;
        option.innerText = activity;
        select.appendChild(option);
    });
}

// Function to handle user selection
document.getElementById('dateNightForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const selectedOption = document.getElementById('dateNightSelect').value;
    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;
    
    if (selectedOption && selectedDate && selectedTime) {
        // In a real app, you might send this data to a backend or use EmailJS to notify the admin
        document.getElementById('responseMessage').innerText = `Your date night (${selectedOption}) is confirmed for ${selectedDate} at ${selectedTime}`;
    }
});

// Admin login function (simple demo without real auth)
document.getElementById('adminLoginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password123') {
        window.location.href = 'admin.html'; // Redirect to admin dashboard
    } else {
        document.getElementById('loginMessage').innerText = 'Invalid credentials';
    }
});

// Function to render activities in the admin dashboard
function renderActivities() {
    const list = document.getElementById('activitiesList');
    list.innerHTML = ''; // Clear the list
    activities.forEach((activity, index) => {
        const li = document.createElement('li');
        li.innerText = activity;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            activities.splice(index, 1); // Remove the activity
            renderActivities(); // Re-render the list
        });
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}

// Admin adding a new activity
document.getElementById('addActivityForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const newActivity = document.getElementById('newActivity').value;
    if (newActivity) {
        activities.push(newActivity);
        renderActivities();
    }
});

// Initial render for the user and admin pages
populateDateNightOptions();
renderActivities();
