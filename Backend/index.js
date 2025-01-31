import express from "express"
import cors from "cors";
import  { getNotifications } from "./notifications.js"
import items from "./items.js";

const app= express()
app.use(cors());
app.use(express.json());
app.get("/", (req,res) =>{
    res.send("Server ready")
})
app.get("/api/items", (req,res) =>{
    res.send(items)
})

app.get("/api/notifications", async (req,res) =>{
    try{
        const notifi = await getNotifications();
        res.json({ data: notifi }); 
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/login", (req,res)=>{
    console.log(req.body)
    res.json({"Button":"Clicked"})
})

//getNotifications().then(data => console.log("Fetched Notifications:", data));

const port=process.env.PORT||3000

app.listen(port,() =>{
    console.log(`server at  http://localhost:${port}`)
})