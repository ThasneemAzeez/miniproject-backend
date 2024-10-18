const Mongooose = require("mongoose")
const Express = require("express")
const Cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginModel = require("./models/admin")
const formModel = require("./models/form")
const base64 = require('base64-js');
const { default: mongoose } = require("mongoose")



let app = Express()
app.use(Express.json())
app.use(Cors())
Mongooose.connect("mongodb+srv://thasneemazeez:thasneem38@cluster0.uk9okno.mongodb.net/eventmanagementapp?retryWrites=true&w=majority&appName=Cluster0")



app.post("/adminSignup", (req, res) => {
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    input.password=hashedpassword
    let result = new loginModel(input)
    result.save()
    res.json({ status: "success" })
})

app.post("/adminSignIn",async (req, res) => {
    let input = req.body
    let result = loginModel.find({ email: req.body.email }).then(
        (response) => {
            if (response.length > 0) {
                const validator = bcrypt.compareSync(req.body.password, response[0].password)
                if (validator) {
                    jwt.sign({ email: req.body.email }, "event-app", { expiresIn: "1d" },
                        (error, token) => {
                            if (error) {
                                res.json({ "status": "Token credentials fails" })

                            } else {
                                res.json({ status: "success", "token": token, "adminId": response[0]._id });

                            }
                        }
                    )
                } else {
                    res.json({ "status": "wrong password" })
                }
            } else {
                res.json({ "status": "email doesnot exist" })
            }
        }
    ).catch()
})

app.post("/event_details", (req, res) => {
    const input = req.body;
    let token = req.headers.token

    jwt.verify(token,"event-app",async(error,decoded)=>{
        if(decoded && decoded.email){
            let result= new formModel(input)
            await result.save()
            res.json({"status":"success"})
        }
        else{
            res.json({"status":"invalid authentication"})
        }
    })
  
   
  });

  
  
 

app.get("/test", (req, res) => {
    res.json({ "status": "success" })
})

app.listen(3030, () => {
    console.log("server started")
})


app.post("/event-details",async(req,res)=>{
    let input = req.body
    let result = new formModel(input)
    await result.save()
    res.json({"status":"success"})
})