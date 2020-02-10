// import express from 'express'; // ES2015 modules 
const express = require('express'); // CommonJS modules //<<<<<<< npm i express

const Hubs = require('./data/hubs-model');//<< new line

const server = express();

server.use(express.json()); //needed for Post and Put/Patch

server.get('/', (req, res)=> { //homies always go into order
 res.json ({ hello: "Web 26"})
})

// view a list of hubs
server.get('/api/hubs', (req,res)=>{
   
    Hubs.find().then(hubs => {
        res.status(200).json(hubs);
    }).catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'oops'})
    });
})

//add a hub
server.post('/api/hubs', (req,res)=>{
    const hubInfo = req.body;
    
    console.log('body', req.body)
   
    Hubs.add(hubInfo).then(hub =>{
        res.status(201).json(hub);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops'})
    });
})

//delete
server.delete('/api/hubs/:id', (req, res)=>{
    Hubs.remove(req.params.id).then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops'})
    });
})

const port = 5000;
server.listen(port,() => console.log(`\n** Api on port ${port} \n`));

// npm i express------