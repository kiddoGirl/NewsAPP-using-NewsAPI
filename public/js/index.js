document.addEventListener("DOMContentLoaded", function () {
    let currentQuery = "sports";
    let currentPage = 1;

    const fetchNews = async (page, q) => {
        console.log(`Fetching News for ${q}, Page number ${page}...`);
        var url =
            'https://newsapi.org/v2/everything?' +
            'q=' + q +
            '&from=2024-01-10&' +
            'pageSize=20&' +
            'language=en&' +
            'page=' + page +
            '&sortBy=popularity&' +
            'apiKey=e094f6a66dbd47509af1aec1e26ebe49';

        console.log(url);
        var req = new Request(url);

        let a = await fetch(req);
        let response = await a.json();

        let str = "";
        resultCount.innerHTML = response.totalResults;
        for (let item of response.articles) {
            str = str + `<div class="card my-4 mx-2" style="width: 18rem;">
                <img height="184" src="${item.urlToImage}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title.slice(0, 23)}</h5>
                    <p class="card-text">${item.description.slice(0, 123)}...</p>
                    <a href="${item.url}" target="_blank" class="btn btn-primary">Read More</a>
                </div>
            </div>`;
        }

        document.querySelector(".content").innerHTML = str;
    };

    
    fetchNews(currentPage, currentQuery);

    search.addEventListener("click", (e) => {
        e.preventDefault();
        let query = searchInput.value;
        currentQuery = query;
        fetchNews(1, query);
    });

    previous.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage = currentPage - 1;
            fetchNews(currentPage, currentQuery);
        }
    });

    next.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = currentPage + 1;
        fetchNews(currentPage, currentQuery);
    });

    
    document.getElementById("homeLink").addEventListener("click", function (e) {
        e.preventDefault();
        currentQuery = "home";
        fetchNews(1, currentQuery);
    });

    document.getElementById("sportsLink").addEventListener("click", function (e) {
        e.preventDefault();
        currentQuery = "sports";
        fetchNews(1, currentQuery);
    });

    document.getElementById("weatherLink").addEventListener("click", function (e) {
        e.preventDefault();
        currentQuery = "weather";
        fetchNews(1, currentQuery);
    });
});


        
