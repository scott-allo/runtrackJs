document.addEventListener('DOMContentLoaded', function () {
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('Vous devez être connecté pour accéder à cette page.');
      window.location.href = 'connexion.html'; 
      return; 
    }
  
    let users = []; 
    let requests = []; 
  
    
    async function loadUsers() {
      try {
        const response = await fetch('data/users.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');
        users = await response.json();
        checkUserRole(); 
      } catch (error) {
        console.error(error);
      }
    }
  
    
    function checkUserRole() {
      const user = users.find(u => u.email === loggedInUser);
      if (!user || user.role !== 'admin') {
        alert('Vous n\'avez pas les droits pour accéder à cette page.');
        window.location.href = 'rdv.html'; // Rediriger vers une page autorisée
        return; // Arrêter l'exécution du script
      }
      loadRequests(); // Charger les demandes si l'utilisateur est admin
    }
  
    // Charger les demandes depuis le fichier JSON
    async function loadRequests() {
      try {
        const response = await fetch('data/requests.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des demandes');
        requests = await response.json();
        displayRequests(); // Afficher les demandes
      } catch (error) {
        console.error(error);
      }
    }
  
    // Afficher les demandes dans le tableau
    function displayRequests() {
      const tbody = document.getElementById('requestsTable');
      tbody.innerHTML = ''; // Vider le tableau
  
      requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${request.email}</td>
          <td>${request.date}</td>
          <td>${request.status}</td>
          <td>
            <button class="btn btn-success btn-sm" onclick="approveRequest(${request.id})">Accepter</button>
            <button class="btn btn-danger btn-sm" onclick="rejectRequest(${request.id})">Refuser</button>
            <button class="btn btn-warning btn-sm" onclick="deleteRequest(${request.id})">Supprimer</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  
    // Accepter une demande
    window.approveRequest = function (id) {
      const request = requests.find(r => r.id === id);
      if (request) {
        request.status = 'approved';
        saveRequests();
        displayRequests();
      }
    };
  
    // Refuser une demande
    window.rejectRequest = function (id) {
      const request = requests.find(r => r.id === id);
      if (request) {
        request.status = 'rejected';
        saveRequests();
        displayRequests();
      }
    };
  
    // Supprimer une demande
    window.deleteRequest = function (id) {
      const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette demande ?');
      if (confirmDelete) {
        requests = requests.filter(r => r.id !== id); // Supprimer la demande
        saveRequests();
        displayRequests();
      }
    };
  
    // Sauvegarder les demandes (simulé pour l'instant)
    function saveRequests() {
      console.log('Demandes sauvegardées :', requests);
      // Plus tard, on enverra ces données à un backend
    }
  
    // Charger les utilisateurs au démarrage
    loadUsers();
  });