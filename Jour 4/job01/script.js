document.getElementById("button").addEventListener("click", function() {
    document.getElementById("button").disabled = true;
    fetch("expression.txt")
        .then(response => response.text())
        .then(data => {
            let paragraph = document.createElement("p");
            paragraph.textContent = data;
            document.getElementById("result").appendChild(paragraph);
        })
        .catch(error => console.error("Erreur lors du chargement du fichier :", error));
});