function tri(numbers, order) {
 
    if (order !== "asc" && order !== "desc") {
        console.error("L'ordre doit être 'asc' ou 'desc'.");
        return numbers; 
    }

    if (order === "asc") {
        numbers.sort((a, b) => a - b); 
    } else {
        numbers.sort((a, b) => b - a); 
    }

    return numbers; 
}


const tableau = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log(tri(tableau, "asc"));  
console.log(tri(tableau, "desc")); 
console.log(tri(tableau, "invalid"));