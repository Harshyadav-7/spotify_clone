console.log('This is promises');

let prom1 = new Promise((resolve, reject)=>{

    let a = Math.random();
    if(a < 0.5){
        reject("No random Number was not supporting you")
    }
    else{
    setTimeout(() => {
        console.log("Yes I am done")
        resolve("Harsh")
    }, 4000);
    }
})


let prom2 = new Promise((resolve, reject)=>{

    let a = Math.random();
    if(a < 0.5){
        reject("No random Number was not supporting you 2")
    }
    else{
    setTimeout(() => {
        console.log("Yes I am done 2")
        resolve("Harsh 2")
    }, 1000);
    }
})

let prom3 = new Promise((resolve, reject)=>{

    let a = Math.random();
    if(a < 0.5){
        reject("No random Number was not supporting you 3")
    }
    else{
    setTimeout(() => {
        console.log("Yes I am done 3")
        resolve("Harsh 3")
    }, 3000);
    }
})

let prom4 = new Promise((resolve, reject)=>{

    let a = Math.random();
    if(a < 0.5){
        reject("No random Number was not supporting you 4")
    }
    else{
    setTimeout(() => {
        console.log("Yes I am done 4")
        resolve("Harsh 4")
    }, 2000);
    }
})

let p3 = Promise.any([prom1, prom2])
p3.then((a)=>{
    console.log(a);
}).catch(err=>{
    console.log(err);
})