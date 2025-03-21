document.addEventListener('DOMContentLoaded', function () {
    // Charger les utilisateurs depuis le fichier JSON
    let users = [];
  
    async function loadUsers() {
      try {
        const response = await fetch('data/users.json'); // Chemin vers le fichier JSON
        if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');
        users = await response.json();
        console.log('Utilisateurs chargés :', users); // Affiche les utilisateurs dans la console
      } catch (error) {
        console.error(error);
      }
    }
  
    // Fonction pour vérifier si l'email est valide (domaine @laplateforme.io)
    function isValidEmail(email) {
      const isValid = email.endsWith('@laplateforme.io');
      console.log('Email valide ?', isValid); // Affiche si l'email est valide
      return isValid;
    }
  
    // Gestion du formulaire de connexion
    const connexionForm = document.getElementById('connexionForm');
    if (connexionForm) {
      connexionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('emailConnexion').value;
        const password = document.getElementById('passwordConnexion').value;
        console.log('Email saisi :', email); // Affiche l'email saisi
        console.log('Mot de passe saisi :', password); // Affiche le mot de passe saisi
  
        // Vérifier si l'utilisateur existe
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          alert('Connexion réussie !');
          // Stocker l'email de l'utilisateur dans le localStorage
          localStorage.setItem('loggedInUser', email);
          console.log('Utilisateur connecté :', email); // Affiche l'email dans la console
          // Rediriger en fonction du rôle
          if (user.role === 'admin') window.location.href = 'admin.html';
          else if (user.role === 'moderateur') window.location.href = 'moderateur.html';
          else if (user.role === 'user') window.location.href = 'rdv.html';
        } else {
          alert('Email ou mot de passe incorrect.');
        }
      });
    }
  
    // Gestion du formulaire d'inscription
    const inscriptionForm = document.getElementById('inscriptionForm');
    if (inscriptionForm) {
      inscriptionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('emailInscription').value;
        const password = document.getElementById('passwordInscription').value;
  
        // Vérifier si l'email est valide
        if (!isValidEmail(email)) {
          alert('Seules les adresses @laplateforme.io sont autorisées.');
          return;
        }
  
        // Vérifier si l'utilisateur existe déjà
        const emailExists = users.some(u => u.email === email);
        if (emailExists) {
          alert('Cet email est déjà utilisé.');
          return;
        }
  
        // Ajouter le nouvel utilisateur (pour l'instant en mémoire)
        const newUser = {
          email: email,
          password: password, // À hasher plus tard
          role: 'user' // Par défaut, un nouvel utilisateur a le rôle 'user'
        };
        users.push(newUser);
        console.log('Nouvel utilisateur ajouté :', newUser);
  
        // Rediriger vers la page de connexion
        alert('Inscription réussie !');
        window.location.href = 'connexion.html';
      });
    }
  
    // Charger les utilisateurs au démarrage
    loadUsers();
  });