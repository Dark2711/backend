const express = require("express")
const app = express()
const zod = require("zod")

function userMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;
    if(username != "prince" || password != "1234"){
        res.status(403).json({"msg": "User does not exist"})        
    }else {
        next();
    }
}
function kindneyMiddleware(req, res, next){
    const kidneyId = req.query.kidneyId
    if(kidneyId != 1 && kidneyId != 2){
        res.status(403).json({"msg": "Something is wrong with your input"}) 
    }else {
        next();
    }
}


app.get("/health-checkup",userMiddleware, kindneyMiddleware, function(req, res){

    res.send("Your heart is fine!")
})

// ZOD

const schema = zod.array(zod.number());
//
//{
//  email : string => email
//  password: atleast 8 letters
//  country: "IN", "US"
// }

const schema2 = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    // country: zod.literal("IN").or(zod.literal("US")) 
})


app.use(express.json());

// app.post("/health-checkup",function(req, res){
//     const kidneys = req.body.kidneys;
//     const response = schema.safeParse(kidneys)
//     // const kidneysLength = kidneys.length;
//     // res.send("You have " + kidneysLength + " Kidneys");
//     if(!response.success){
//         res.status(403).json({
//             msg: "Input is invalid"
//         })
//     }
//     res.send({
//         response
//     })
// });

// global catch
// app.use(function(err, req, res, next){
//     res.json({
//         msg: "Something is up with our server"
//     })
// })


app.post("/login",function(req, res){
    const inputs = req.body;
    const response = schema2.safeParse(inputs);
    console.log(response)
    if(!response.success){
        res.json({
            msg: "Invalid inputs"
        })
        return;
    }
    res.send({
        response
    })
})
app.listen(3000)
