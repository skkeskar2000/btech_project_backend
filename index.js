const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = 5000;

app.listen(port,()=>{
    console.log(`It is listening on port : ${port}`);
});

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database Connected");
}).catch((error)=>console.log(error));

app.get('/',async(req,res)=>{
    res.status(200).send('Server Started');
});


app.use('/auth',require("./routers/userRoute"));
app.use('/form',require("./routers/formRoute"));
app.use('/admin',require("./routers/createFormRoute"));

app.use('/auth', require("./routers/userRoute"));
app.use('/form', require("./routers/formRoute"));
app.use('/admin', require("./routers/createFormRoute"));
app.use('/defaultform', require("./routers/defaultFormRoute"));
app.use('/defaultformsubmission', require("./routers/defaultFormSubmissionRoute"))
app.use('/temproute', require("./routers/temproute"))
app.use('/dailychekin', require("./routers/dailyChekinRoute"))