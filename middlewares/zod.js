const express = require("express")
const app = express()
const zod = require("zod")

app.use(express.json());

const schema2 = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

app.post("/login", function(req, res){
    const inputs = req.body;
    const response = schema2.safeParse(inputs);
    if(!response.success){
        res.json({
            msg: "Galat email password mat daal"
        })
    }
    else{
        res.send({
            response
        })
    }
})

app.listen(3000)