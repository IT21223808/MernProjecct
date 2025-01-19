require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
require("./db/connection")
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const admindb = require("./model/adminSchema")
const clientid = ""
const clientsecret = ""
const Student = require('./model/schemaData');

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials: true
}));
app.use(express.json());

app.use(session({
    secret: "15672983hakdhfjkjdsd",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile)
            try {
                let admin = await admindb.findOne({ googleId: profile.id });
                if (!admin) {
                    admin = new admindb({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        Image: profile.photos[0].value,
                    });
                    await admin.save();
                }
                return done(null, admin)
            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((admin, done) => {
    done(null, admin);
})
passport.deserializeUser((admin, done) => {
    done(null, admin);
});

// initial google ouath
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login"
}))

app.get("/login/sucess", async (req, res) => {
    console.log("reqq", req.user)

    if (req.admin) {
        res.status(200).json({ message: "Login", admin: req.user })
    } else {
        res.status(200).json({ message: "Not Authorized", admin: req.user })
    }
})

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect("http://localhost:8080")
    })
})
//crud opration
//read
app.get("/",async(req,res)=>{
    const data = await Student.find({})
        res.json({success :true, data:data})
    });

//create data
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new Student(req.body)
    await data.save()
    res.send({success:true, message:"data save successfully",data :data})
})
//update 
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body

    console.log(rest)
    const data = await Student.updateOne({_id :req.body.id},rest)
    res.send({success:true,message:"data will updated",data : data})
})

//Delete
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id 
    console.log(id)
    const data = await Student.deleteOne({ _id: id });
    res.send({success:true,message:"data will deleted",data : data})
})

//app.get("/",(req,res)=>{
//    res.status(200).json("server start")
//});

app.listen(PORT, () => {
    console.log(`server start at port no ${PORT}`)
})