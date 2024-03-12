// import express from 'express'
// import jwt from 'jsonwebtoken'
const express=require('express')
const jwt= require('jsonwebtoken')
const app = express();
// port = 8000
app.get('/api',(req,res)=>{
    res.json({
        message: "hey there, welcome to my server"
    });
});
app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token, "secretkey", (err,authData)=>{
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Posts created...',
                authData,
            })
        }
    })
    
})
app.post('/api/login', (req,res)=>{
    const user = {
        id:1,
        username: "Jason",
        email: "jason@example.com"
    }

    jwt.sign({user: user}, 'secretkey',(err,token)=>{
        res.json({
            token,
        })
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
       return next();
    } else {
        res.sendStatus(403)
    }
}

// app.listen( (req,res)=>{
//     console.log(`http://localhost:${port}`);
// })

app.listen(3000, (req,res)=>{
    console.log('server started on port 3000');
})