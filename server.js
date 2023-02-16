const express = require('express')
const fs = require('fs')
const cors = require('cors')
let path = require('path');


const server = express()
let public = path.join(__dirname, 'public');
server.use(
  cors({
    origin : "*"
  })
)

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use('/', express.static(public));

server.all("/",(req,res)=>{
  res.sendFile(path.join(public, 'index.html'));
  res.send("Bot is running!");
})


const PORT = 3000
server.listen(PORT,()=>{
    console.log(`Server is ready. http://localhost:${PORT}`)
})