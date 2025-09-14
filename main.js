const express = require('express')
const blog = require('./routes/blog')
const app = express()
const port = 3000


app.use(express.static("private"))//in this we are using middleware
app.use('/blog', blog)

app.get('/', (req, res) => {
    console.log("Hey its a get request")
    res.send('Hello World!5')
})

app.post('/', (req, res) => {
    console.log("Hey its a post request")
    res.send('Hello World post2!')
})

app.delete('/', (req, res) => {
    console.log("Hey its a delete request")
    res.send('Hello World delete!')
})

app.get("/index", (req, res)=>{
    console.log("Hey its Index")
    res.sendFile('templates/index.html', {root:__dirname})
})

app.get("/api", (req, res)=>{
    res.json({a: 1, b: 2, c: 3, d: 4, name: ["Harsh", "Harshu"] })
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})