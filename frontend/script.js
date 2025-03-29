document.addEventListener('DOMContentLoaded', function () {
    console.log("✅ script.js loaded!");

    const form = document.querySelector('#trip-form');
    const tripList = document.getElementById('trips-container');
    let editingTripId = null;  // ✅ Store ID of trip being edited

    if (!form) {
        console.error("🚨 Form not found! Check your HTML.");
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("🚀 Form submitted!");

        const tripData = {
            destination: document.getElementById('destination').value,
            start_date: document.getElementById('start_date').value,
            end_date: document.getElementById('end_date').value,
            itinerary: document.getElementById('itinerary').value
        };

        console.log("📡 Sending Data:", tripData);

        if (editingTripId) {
            updateTrip(editingTripId, tripData);
        } else {
            createTrip(tripData);
        }
    });

    function createTrip(tripData) {
        fetch('http://127.0.0.1:8000/api/trips/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(tripData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('✅ Trip Created:', data);
                alert('🎉 Trip successfully created!');
                form.reset();
                editingTripId = null;
                fetchWeather(tripData.destination);
                displayTrips();
            })
            .catch(error => console.error('❌ Fetch Error:', error));
    }

    function updateTrip(id, tripData) {
        fetch(`http://127.0.0.1:8000/api/trips/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(tripData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('✅ Trip Updated:', data);
                alert('✏️ Trip successfully updated!');
                form.reset();
                editingTripId = null;
                displayTrips();
            })
            .catch(error => console.error('❌ Update Error:', error));
    }

    // ✅ Make deleteTrip accessible globally
    window.deleteTrip = function (id) {
        if (!confirm("❗ Are you sure you want to delete this trip?")) return;

        fetch(`http://127.0.0.1:8000/api/trips/${id}/`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log(`🗑️ Trip ${id} Deleted`);
                    alert('🗑️ Trip successfully deleted!');
                    displayTrips();
                } else {
                    throw new Error(`Delete failed! Status: ${response.status}`);
                }
            })
            .catch(error => console.error('❌ Delete Error:', error));
    };

    function fetchWeather(city) {
        const apiKey = '911d355e014cb1677cdcbeabec033d48';

        console.log("📡 Fetching Weather Data for:", city);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log("✅ Weather Data Received:", data);

                document.getElementById('weather-info').innerHTML = `
                    <h3>🌍 Weather in ${data.name}</h3>
                    <p>🌡️ Temperature: <b>${data.main.temp}°C</b></p>
                    <p>🌤️ Condition: <b>${data.weather[0].description}</b></p>
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
                `;
            })
            .catch(error => console.error('🌦️ Weather API Error:', error));
    }

    function displayTrips() {
        fetch('http://127.0.0.1:8000/api/trips/')
            .then(response => response.json())
            .then(data => {
                console.log("📡 Trips Fetched:", data);
                tripList.innerHTML = "";
                data.forEach(trip => {
                    const tripElement = document.createElement("div");
                    tripElement.classList.add("trip-item");
                    tripElement.innerHTML = `
                        <h3>📍 Destination: ${trip.destination}</h3>
                        <p>🗓️ Start Date: <b>${trip.start_date}</b></p>
                        <p>🗓️ End Date: <b>${trip.end_date}</b></p>
                        <p>📜 Itinerary: ${trip.itinerary}</p>
                        <button class="edit-btn" onclick="editTrip(${trip.id}, '${trip.destination}', '${trip.start_date}', '${trip.end_date}', '${trip.itinerary}')">✏️ Edit</button>
                        <button class="delete-btn" onclick="deleteTrip(${trip.id})">🗑️ Delete</button>
                    `;

                    tripList.appendChild(tripElement);
                });
            })
            .catch(error => console.error('❌ Trip Fetch Error:', error));
    }

    // ✅ Make editTrip globally accessible
    window.editTrip = function (id, destination, start_date, end_date, itinerary) {
        document.getElementById('destination').value = destination;
        document.getElementById('start_date').value = start_date;
        document.getElementById('end_date').value = end_date;
        document.getElementById('itinerary').value = itinerary;
        editingTripId = id;
        alert("✏️ Editing trip. Click 'Create Trip' to save changes.");
    };

    displayTrips();
});
