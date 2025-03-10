function jourTravaille(date) {
    
    const joursFeries2024 = [
        "01-01", 
        "04-01", 
        "05-01", 
        "05-08", 
        "05-30", 
        "06-10", 
        "07-14", 
        "08-15", 
        "11-01",
        "11-11", 
        "12-25"  
    ];


    const jour = date.getDate();
    const mois = date.getMonth() + 1; 
    const annee = date.getFullYear();

    const dateStr = `${mois.toString().padStart(2, '0')}-${jour.toString().padStart(2, '0')}`;

 
    if (joursFeries2024.includes(dateStr)) {
        console.log(`Le ${jour} ${mois} ${annee} est un jour férié.`);
    } 
    else if (date.getDay() === 0 || date.getDay() === 6) {
        console.log(`Non, ${jour} ${mois} ${annee} est un week-end.`);
    } 

    else {
        console.log(`Oui, ${jour} ${mois} ${annee} est un jour travaillé.`);
    }
}

jourTravaille(new Date(2024, 0, 1));  
