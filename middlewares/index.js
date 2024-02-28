const express = require("express")

const app = express()

app.get("/health-checkup",function(req, res){
    const username = req.headers.username
    const password = req.headers.password
    const kidneyId = req.query.kidneyId
    if(username != "prince" || password != "pass"){
        res.status(400).json({msg:"Something wrong"})
        return
    }
    if(kidneyId != 1 && kidneyId != 2){
        res.status(400).json({msg:"Something wrong"})
        return
    }

    res.json({
        msg: "You are fine bro!"
    })
})
app.listen(3000)