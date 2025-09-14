// let obj = {
//     a: 1,
//     b: "harsh"
// }

// console.log(obj)

// let animal ={
//     eats: true,
// };

// let rabbit = {
//     jumps: true,

// }

// rabbit.__proto__ =  animal;

class Animal{
    constructor(name){
        this.name = name;
        console.log("object is created...")
}
eats(){
    console.log("kha rha hun")
}
jumps(){
    console.log("kood rha hun")
  }
}

class Lion extends Animal {
    constructor(name){
        super(name)
        console.log("Object is created and he is a lion...")
    }

    eats(){
        super.eats()
        console.log("kha rha hun roar")
    }
}

let a =  new Animal("bunny");
console.log(a)

let l = new Lion("Shera")
console.log(l)