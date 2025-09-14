let calcy = localStorage.getItem('calcy') || '';

displayCalculation();

function updateCalcy(value){
    calcy += value;
    // console.log(calcy);
    displayCalculation();
    localStorage.setItem('calcy', calcy );
}

//     function saveCalculation() {
//     localStorage.setItem('calcy', calcy);
//   }

function displayCalculation(){
    document.querySelector('.js-calculation')
   .innerHTML = calcy;
}
