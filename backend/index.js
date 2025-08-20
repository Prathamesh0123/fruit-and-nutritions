const express = require('express');
const cors = require('cors');
const fruiteRouter = require('./router/frutes');
const app = express();
app.use(cors());
app.use(express.json())
const mongoose = require('mongoose');
const port = 3000;
const mongoDBConnectionString = "mongodb+srv://prathmeshbatane4:Jacks%40333@cluster0.hsoqrqv.mongodb.net/fruites?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoDBConnectionString,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Connection error:", err));

app.use('/api',fruiteRouter);


app.listen(port,()=>{
    console.log(`Server is runnnig on port ${port}`);
})
