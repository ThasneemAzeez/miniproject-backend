const Mongooose = require("mongoose")
const Express = require("express")
const Cors = require("cors")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginModel = require("./models/admin")
const formModel = require("./models/form")
const base64 = require('base64-js');
const { default: mongoose } = require("mongoose")
const userfeedbackModel = require("./models/userfeedback")
const registrationform = require("./models/registrationform")
const Registration = require("./models/registrationform")



let app = Express()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(Express.json())
app.use(Cors())
Mongooose.connect("mongodb+srv://thasneemazeez:thasneem38@cluster0.uk9okno.mongodb.net/eventmanagementapp?retryWrites=true&w=majority&appName=Cluster0")



app.post("/adminSignup", (req, res) => {
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    input.password = hashedpassword
    let result = new loginModel(input)
    result.save()
    res.json({ status: "success" })
})

app.post("/adminSignIn", async (req, res) => {
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

app.post("/event_details", async (req, res) => {
    console.log(req.body)
    try {
        const { name, details, venue, date, poster, registrationlink } = req.body;
        const token = req.headers.token;

        // Verify authentication (optional)
        if (token) {
            const decoded = await jwt.verify(token, "event-app");
            if (!decoded || !decoded.email) {
                return res.status(401).json({ status: "invalid authentication" }); // Send 401 for unauthorized access
            }
        }

        // Save data to MongoDB, including base64 image data
        const result = await formModel.create({ name, details, venue, date, image: poster, registrationlink });

        res.status(201).json({ status: "success" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "error" }); // Send a generic error response with status code 500
    }
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend origin
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    next();
});




app.get("/test", (req, res) => {
    res.json({ "status": "success" })
})

app.listen(3030, () => {
    console.log("server started")
})


app.post("/userfeedback", async (req, res) => {
    let input = req.body;
    let result = new userfeedbackModel(input);
    await result.save();
    res.json({ status: "Success" });
});


app.post("/Viewuserfeedback", async (req, res) => {
    try {
        const feedbackData = await userfeedbackModel.find();
        res.json(feedbackData); // Send all feedback data as JSON
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Error fetching feedback" }); // Send error message on failure
    }
});

app.get("/getevent_detail", async (req, res) => {
    try {
        const formData = await formModel.find();
        res.json(formData); // Send all feedback data as JSON
    } catch (error) {
        console.error("Error fetching eventData:", error);
        res.status(500).json({ message: "Error fetching event data" }); // Send error message on failure
    }
});


app.get("/getevent_detail/:id", async (req, res) => {
    const { id } = req.params; // Get the ID from the URL

    try {
        const event = await formModel.findById(id); // Query the database for the specific event by ID
        if (!event) {
            return res.status(404).json({ message: "Event not found" }); // Return 404 if no event is found
        }
        res.json(event); // Send the specific event details as JSON
    } catch (error) {
        console.error("Error fetching event data by ID:", error);
        res.status(500).json({ message: "Error fetching event data" }); // Send error message if something goes wrong
    }
});

app.post("/delete", (req, res) => {
    let input = req.body
    formModel.findByIdAndDelete(input).then(
        (response) => {
            res.json({ "status": "success" })
        }
    ).catch(
        (error) => {
            res.json(error)
        }

    )
})

app.post("/register", async (req, res) => {
    console.log("Incoming request body:", req.body); // Log incoming request data
    let input = req.body;
    let registration = new Registration(input);
    try {
        await registration.save();
        res.json({ status: "success" });
    } catch (error) {
        console.error("Error saving registration:", error); // Log the full error
        res.status(500).json({ status: "error", message: "Registration failed", error: error.message });
    }
});

app.post("/search",(req,res)=>{
    let input=req.body
    Registration.find(input).then(
        (data)=>{
            res.json(data)
        }
    ).catch((error)=>{
        res.json(error)
    })
})

