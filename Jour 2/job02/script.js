document.getElementById("button").addEventListener("click", showhide);

function showhide() {
    let article = document.getElementById("article");
    article.style.display = (article.style.display === "none") ? "block" : "none";
}