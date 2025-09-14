/*
Key Functions of fs
fs.readFile() – Read a file.
fs.writeFile() – Write data to a file.
fs.appendFile() – Append data to a file.
fs.unlink() – Delete a file.
fs.mkdir() – Create a new directory.
*/

var fs = require("fs") 

console.log("starting")
// fs.writeFileSync("harsh.txt", "Harsh is a good boy")
fs.writeFile("harsh.txt2", "Harsh is a good boy2", ()=>{
    console.log("done") // yeh callback function se chalne ke liye schedule  ho jayega or hoone ke baad done print ho jayega
    fs.readFile("Harsh.txt", (error, data)=>{
        console.log(error, data.toString())
    })
})


fs.appendFile("harsh.txt2", "harshsde", (e, d)=>{
    console.log(d)
})
console.log("ending")