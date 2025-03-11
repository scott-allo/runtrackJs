// Créez une fonction “jourTravaille” qui prend en paramètre une date au
// format Date. Si la date correspond à un jour férié de l’année 2024, la fonction
// affiche “Le jour mois année est un jour férié”. Si elle correspond à un samedi

// _3

// ou un dimanche, alors le message affiché est “Non, jour mois année est un
// week-end”, sinon afficher “Oui, jour mois année est un jour travaillé” ou jour,
// mois et année correspond aux paramètres passés à la fonction.

console.clear();
function jourTravaille(date) { 
    console.log("coucou")
    const joursFeries2024 = [
        "01-01", "04-01", "05-01", "05-08", "05-30", 
        "06-10", "07-14", "08-15", "11-01", "11-11", "12-25"
    ];

    const jour = date.getDate().toString().padStart(2, '0');
    const mois = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const annee = date.getFullYear();

    const dateStr = `${mois}-${jour}`; 
    console.log("Date générée:", dateStr); 

    const nomsMois = [
        "janvier", "février", "mars", "avril", "mai", "juin", 
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
    
    const moisTexte = nomsMois[date.getMonth()]; 

    if (joursFeries2024.includes(dateStr)) {
        console.log(`Le ${jour} ${moisTexte} ${annee} est un jour férié.`);
    } 
    else if (date.getDay() === 0 || date.getDay() === 6) {
        console.log(`Non, le ${jour} ${moisTexte} ${annee} est un week-end.`);
    } 
    else {
        console.log(`Oui, le ${jour} ${moisTexte} ${annee} est un jour travaillé.`);
    }
}


jourTravaille(new Date(2024, 5, 16));
