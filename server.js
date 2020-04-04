const express = require('express')
const app = express()

app.use(express.static("./dist"))
app.all("*", (req, res) => {
        res.sendFile(__dirname + "/dist/index.html")
})

app.listen(3000, () => {
        console.log('Server is running')
})