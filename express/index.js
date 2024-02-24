const express = require("express")
const app = express()

var users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json())

app.get("/",function(req, res){
    const johnKidneys = users[0].kidneys; // [ { healthy: false } ]
    const numberOfKidneys = johnKidneys.length; // 1
    let numberOfHealthyKidneys = 0; // let's say there is no healthy kidneys at starting
    for(let i = 0; i < numberOfKidneys; i++){ 
        if(johnKidneys[i].healthy){ // false
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys; // 1 = 1 - 0
    res.json ({
        numberOfKidneys, // 1
        numberOfHealthyKidneys, // 0
        numberOfUnHealthyKidneys // 1
    })

})

app.post("/",function(req, res){
    const isHealthy = req.body.isHealthy; // input to add kidneys (healthy or unhealthy)
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Ho Gya"
    })

})

app.put("/",function(req, res){
    for(let i = 0; i < users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true
    }
    res.json({})
})

app.delete("/",function(req, res){
    if(isAtleastOneUnHealthyKidney()){
        let newKidneys = []
        for(let i = 0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })   
            }
        }
        users[0].kidneys = newKidneys
        res.json({msg: "done"})
    }else{
        res.status(411).json({
            msg: "You have no Unhealthy Kidneys"
        })
    }
})

function isAtleastOneUnHealthyKidney(){
    let atleastOneUnHealthyKidney = false;
    for(let i = 0; i < users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnHealthyKidney = true;
        }
    }
    return atleastOneUnHealthyKidney
}
app.listen(3000)