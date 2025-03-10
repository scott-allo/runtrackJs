function bisextile(annee) {
 
    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}


let anneeTest = 2025;
console.log(`L'année ${anneeTest} est bissextile ? ${bisextile(anneeTest)}`);
