document.addEventListener("DOMContentLoaded", function () {
   
    async function loadJSON(filePath) {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Erreur lors du chargement du fichier JSON :", error);
      }
    }
  
    
    function populateTable(data) {
      const tableBody = document.querySelector("#utilisateur-table tbody");

      data.forEach((item) => {
        const utilisateur = item.utilisateur; 
        const row = document.createElement("tr");
  
        row.innerHTML = `
            <td>${utilisateur.id}</td>
            <td>${utilisateur.nom}</td>
            <td>${utilisateur.prenom}</td>
            <td>${utilisateur.email}</td>
          `;
  
        tableBody.appendChild(row);
      });
    }
  
   
    loadJSON("utilisateur.json").then((data) => {
      if (data) populateTable(data); 
    });
  });