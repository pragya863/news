const API_KEY = "71e032c3ce394f4db876f551f6806888";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const template = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;

        const card = template.content.cloneNode(true);

        card.querySelector("#news-img").src = article.urlToImage;
        card.querySelector("#news-title").innerText = article.title;
        card.querySelector("#news-source").innerText =
            `${article.source.name} · ${new Date(article.publishedAt).toLocaleString()}`;
        card.querySelector("#news-desc").innerText = article.description;

        card.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        cardsContainer.appendChild(card);
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-text").value;
    if (!query) return;

    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});