import fs from "fs/promises"

let a = await fs.readFile("harsh.txt2")

let b = await fs.appendFile("harsh.txt2", "\nthis is amzing promise")

console.log(a.toString(), b)