const apiKey = "22f6c10a587e4499bf1c2b8bf81c0e31"; // Replace with your NewsAPI key
const newsContainer = document.getElementById("newsContainer");

// Fetch Top Headlines
async function fetchNews(query = "latest") {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Display News
function displayNews(articles) {
    newsContainer.innerHTML = "";

    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        newsCard.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            </div>
        `;

        newsContainer.appendChild(newsCard);
    });
}

// Search Function
function searchNews() {
    const query = document.getElementById("searchInput").value;
    if (query) {
        fetchNews(query);
    }
}

// Load default news on page load
fetchNews();