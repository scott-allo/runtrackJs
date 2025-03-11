// Créez une balise <button> ayant comme id “button”.
// Lorsque l’on clique dessus, un <article> contenant le texte suivant est ajouté
// au contenu de la page : “L'important n'est pas la chute, mais l'atterrissage.”
// Si l'on clique à nouveau sur ce bouton, l’article disparaît.
// L’apparition / Disparition

document.getElementById("button").addEventListener("click", showhide);

function showhide() {
    let article = document.getElementById("article");
    article.style.display = (article.style.display === "none") ? "block" : "none";
}
