let searchbar = document.getElementById("searchbar");

const articles = [
  {title: "The Science Reef", author: "Lewis Martin", url: "article.html"},
  {title: "The Theory and Practice of Oligarchical Collectivism", author: "Emmanuel Goldstein", url: "goldstein.html"}
]

function SearchForArticles(){
  const search = searchbar ? searchbar.value.trim() : "";

  sessionStorage.setItem("searchQuery", search);
  window.location.href = "search.html";
}

function renderSearchResults(){
  const page = document.getElementById("pagecontent");
  if (!page) return;
  const search = sessionStorage.getItem("searchQuery") || "";
  const list = document.createElement('ul');

  const filteredArticles = articles.filter((article) => {const title = article.title.toLowerCase();
    const author = article.author.toLowerCase();
  return !search || title.includes(search) || author.includes(search);
  });

  if (filteredArticles.length === 0){
    const item = document.createElement("li");
    item.textContent = "No results";
    list.append(item);
  } else{
    filteredArticles.forEach((article) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const description = document.createElement("p");

      link.href = article.url;
      link.textContent = article.title;
      description.textContent = `${article.author}`
      item.appendChild(link);
      item.appendChild(description);
      list.appendChild(item);
    });
  }


  page.innerHTML = "";
  page.appendChild(list);
  
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("search.html")) {
    renderSearchResults();
  }
});