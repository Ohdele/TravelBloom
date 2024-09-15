document.addEventListener('DOMContentLoaded', () => {
    fetch('travel_recommendation_api.json') // Replace with actual API or JSON file path
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data); // Log the data

            const container = document.getElementById('recommendations');
            const searchInput = document.querySelector('.navbar input[type="text"]');
            const searchButton = document.getElementById('search-button');
            const resetButton = document.getElementById('reset-button');

            // Function to create and append a section for each category
            function createCategorySection(title, items) {
                const section = document.createElement('section');
                const heading = document.createElement('h2');
                heading.textContent = title;
                section.appendChild(heading);

                items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('recommendation-item');

                    const img = document.createElement('img');
                    img.src = `images/${item.imageUrl}`;  // Ensure 'images/' is the correct path
                    img.alt = item.name;
                    img.style.width = '200px'; // Adjust size as needed
                    img.style.height = 'auto';

                    const name = document.createElement('h3');
                    name.textContent = item.name;

                    const description = document.createElement('p');
                    description.textContent = item.description;

                    itemDiv.appendChild(img);
                    itemDiv.appendChild(name);
                    itemDiv.appendChild(description);

                    section.appendChild(itemDiv);
                });

                container.appendChild(section);
            }

            // Function to filter and display search results
            function displaySearchResults(keyword) {
                container.innerHTML = ''; // Clear previous results

                const lowerKeyword = keyword.toLowerCase();

                // Filter and display matching results
                let displayed = false; // Flag to check if at least two recommendations are shown for each keyword

                data.countries.forEach(country => {
                    const matchingCities = country.cities.filter(city =>
                        city.name.toLowerCase().includes(lowerKeyword) ||
                        city.description.toLowerCase().includes(lowerKeyword)
                    );
                    if (matchingCities.length > 0) {
                        if (matchingCities.length >= 2) {
                            createCategorySection(country.name, matchingCities.slice(0, 2));
                            displayed = true;
                        } else if (!displayed) {
                            createCategorySection(country.name, matchingCities);
                            displayed = true;
                        }
                    }
                });

                const matchingTemples = data.temples.filter(temple =>
                    temple.name.toLowerCase().includes(lowerKeyword) ||
                    temple.description.toLowerCase().includes(lowerKeyword)
                );
                if (matchingTemples.length > 0) {
                    if (matchingTemples.length >= 2) {
                        createCategorySection('Temples', matchingTemples.slice(0, 2));
                    } else {
                        createCategorySection('Temples', matchingTemples);
                    }
                }

                const matchingBeaches = data.beaches.filter(beach =>
                    beach.name.toLowerCase().includes(lowerKeyword) ||
                    beach.description.toLowerCase().includes(lowerKeyword)
                );
                if (matchingBeaches.length > 0) {
                    if (matchingBeaches.length >= 2) {
                        createCategorySection('Beaches', matchingBeaches.slice(0, 2));
                    } else {
                        createCategorySection('Beaches', matchingBeaches);
                    }
                }
            }

            // Event listener for the Search button
            searchButton.addEventListener('click', () => {
                const keyword = searchInput.value.trim();
                if (keyword) {
                    displaySearchResults(keyword);
                }
            });

            // Event listener for the Reset button
            resetButton.addEventListener('click', () => {
                searchInput.value = '';
                container.innerHTML = '';
                // Recreate sections for each category initially
                data.countries.forEach(country => {
                    createCategorySection(country.name, country.cities);
                });
                createCategorySection('Temples', data.temples);
                createCategorySection('Beaches', data.beaches);
            });

            // Create sections for each category initially
            data.countries.forEach(country => {
                createCategorySection(country.name, country.cities);
            });
            createCategorySection('Temples', data.temples);
            createCategorySection('Beaches', data.beaches);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
