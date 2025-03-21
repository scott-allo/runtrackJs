document.addEventListener('DOMContentLoaded', function () {
    // Vérifier si l'utilisateur est connecté
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('Vous devez être connecté pour accéder à cette page.');
      window.location.href = 'connexion.html'; // Rediriger vers la page de connexion
      return; // Arrêter l'exécution du script
    }
  
    let users = []; // Pour stocker les utilisateurs
    let requests = []; // Pour stocker les demandes
  
    // Charger les utilisateurs depuis le fichier JSON
    async function loadUsers() {
      try {
        const response = await fetch('data/users.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');
        users = await response.json();
        checkUserRole(); // Vérifier le rôle après le chargement des utilisateurs
      } catch (error) {
        console.error(error);
      }
    }
  
    // Vérifier si l'utilisateur est un utilisateur ou un modérateur
    function checkUserRole() {
      const user = users.find(u => u.email === loggedInUser);
      if (!user || (user.role !== 'user' && user.role !== 'moderateur')) {
        alert('Vous n\'avez pas les droits pour accéder à cette page.');
        window.location.href = 'connexion.html'; // Rediriger vers la page de connexion
        return; // Arrêter l'exécution du script
      }
      loadRequests(); // Charger les demandes si l'utilisateur est autorisé
    }
  
    // Charger les demandes depuis le fichier JSON
    async function loadRequests() {
      try {
        const response = await fetch('data/requests.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des demandes');
        requests = await response.json();
        console.log('Demandes chargées :', requests);
      } catch (error) {
        console.error(error);
      }
    }
  
    // Sauvegarder les demandes (simulé pour l'instant)
    function saveRequests() {
      console.log('Demandes sauvegardées :', requests);
      // Plus tard, on enverra ces données à un backend
    }
  
    // Initialiser le calendrier
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth', // Vue par défaut (mois)
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      selectable: true, // Permettre de sélectionner des dates
      select: async function (info) {
        // Vérifier si la date sélectionnée est antérieure à aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Ignorer l'heure pour la comparaison
  
        if (info.start < today) {
          alert('Vous ne pouvez pas sélectionner une date antérieure à aujourd\'hui.');
          return;
        }
  
        // Formater la date sans décalage horaire (YYYY-MM-DD)
        const selectedDate = info.start.toLocaleDateString('fr-CA'); // Format YYYY-MM-DD
  
        // Demander une confirmation
        const confirmRequest = confirm(`Souhaitez-vous faire une demande pour le ${info.start.toLocaleDateString()} ?`);
        if (confirmRequest) {
          // Ajouter la demande
          const newRequest = {
            id: requests.length + 1, // ID unique (à améliorer plus tard)
            email: loggedInUser, // Utiliser l'email de l'utilisateur connecté
            date: selectedDate, // Date au format YYYY-MM-DD
            status: 'pending' // Statut par défaut
          };
          requests.push(newRequest);
          console.log('Nouvelle demande :', newRequest);
  
          // Sauvegarder les demandes
          saveRequests();
  
          // Mettre à jour le calendrier
          calendar.addEvent({
            title: 'En attente',
            start: newRequest.date,
            color: 'orange'
          });
  
          alert('Demande envoyée !');
        }
      },
      events: requests.map(request => ({
        title: request.status === 'approved' ? 'Accepté' : request.status === 'rejected' ? 'Refusé' : 'En attente',
        start: request.date,
        color: request.status === 'approved' ? 'green' : request.status === 'rejected' ? 'red' : 'orange'
      }))
    });
  
    // Charger les utilisateurs au démarrage
    loadUsers();
  
    // Afficher le calendrier
    calendar.render();
  });