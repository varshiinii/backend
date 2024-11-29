import express from "express";
const app=express()
app.use(express.json());
app.use(cors());

app.listen(8080, ()=>{
    console.log("Server started at port 8080")
})

//app.get("/",(req,res)=>{
//    res.send("Hello World")
//})

import { MongoClient, ObjectId } from "mongodb";
import cors from "cors"
//const uri = "mongodb://127.0.0.1:27017"
const uri = "mongodb+srv://varshiinii:Varshin!23@cluster0.zjqfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri)
const db = client.db("ecomm1")

app.get("/", async (req, res) => {
    const items = await db.collection("product").find().toArray()
    res.status(200).json(items);
});

app.post("/", async (req, res) => {
    const { name, price, desc, url } = req.body;
    const data = {
      name: name,
      price: price,
      desc: desc,
      url: url
    };
    const newProduct = await db.collection("product").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("product").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });