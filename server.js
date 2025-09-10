const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static("../frontend"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/register", async (req,res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ success:true, message:"User registered successfully" });
});

app.post("/login", async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.json({ success:false, message:"User not found" });
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.json({ success:false, message:"Incorrect password" });
    req.session.user = user;
    res.json({ success:true, message:"Login successful" });
});

// Code validation API (JS basic for demo)
app.post("/validate", (req,res)=>{
    const { code, task } = req.body;
    try {
        let result = eval(code); 
        let correct = false;
        if(task==="print_name" && result==="Omkar") correct = true;
        if(task==="sum_2_numbers" && result===5) correct = true;
        res.json({ success: correct, result });
    } catch(err) {
        res.json({ success:false, error: err.message });
    }
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
