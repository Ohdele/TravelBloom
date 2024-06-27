// Step 3: Create XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Step 4: Define URL for the JSON file
var url = "news.json";

// Step 5: Open a new connection, using the GET request on the URL endpoint
xhr.open("GET", url, true);

// Step 6: Define a callback function to execute when the request is complete
xhr.onreadystatechange = function () {
    // Check if request is complete and was successful
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the JSON data
        var newsArticles = JSON.parse(xhr.responseText);
        
        // Get the container element
        var container = document.getElementById("news-container");
        
        // Process and display the news articles
        newsArticles.forEach(function(article) {
            // Create a new div for each article
            var articleDiv = document.createElement("div");
            articleDiv.className = "article";
            
            // Create and append the title
            var title = document.createElement("h2");
            title.textContent = article.title;
            articleDiv.appendChild(title);
            
            // Create and append the author
            var author = document.createElement("p");
            author.textContent = "By " + article.author;
            articleDiv.appendChild(author);
            
            // Create and append the date
            var date = document.createElement("p");
            date.textContent = article.date;
            articleDiv.appendChild(date);
            
            // Create and append the content
            var content = document.createElement("p");
            content.textContent = article.content;
            articleDiv.appendChild(content);
            
            // Append the article div to the container
            container.appendChild(articleDiv);
        });
    }
};

// Step 7: Send the request
xhr.send();
