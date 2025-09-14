let a = 4;

function facFor(number){
    let fac = 1;
    for(let index = 1; index <= number; index++){
        fac = fac*index
    }
    return fac
}
console.log(facFor(a));