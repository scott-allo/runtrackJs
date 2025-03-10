function estNombrePremier(nombre) {
    if (nombre <= 1) return false; 
    if (nombre === 2) return true; 
    if (nombre % 2 === 0) return false;


    for (let i = 3; i <= Math.sqrt(nombre); i += 2) {
        if (nombre % i === 0) return false;
    }
    return true;
}


function sommeNombresPremiers(nombre1, nombre2) {
    if (estNombrePremier(nombre1) && estNombrePremier(nombre2)) {
        return nombre1 + nombre2;
    } else {
        return false;
    }
}

console.log(sommeNombresPremiers(3, 5));   
console.log(sommeNombresPremiers(4, 7));   
console.log(sommeNombresPremiers(11, 13)); 
console.log(sommeNombresPremiers(1, 2));