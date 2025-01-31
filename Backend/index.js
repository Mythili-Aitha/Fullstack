import express from "express";
import cors from "cors";
import { getNotifications, pool } from "./notifications.js";
import items from "./items.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server ready");
});

app.get("/api/items", (req, res) => {
    res.send(items);
});

app.get("/api/notifications", async (req, res) => {
    try {
        const notifi = await getNotifications();
        res.json({ data: notifi });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { uid, pid } = req.body;
    const sql = "SELECT usid,psid FROM register WHERE usid =?";
    try {
        const [result] = await pool.query(sql, [uid, pid]);
        if(result.length ===0){
            return res.status(401).json({error:"Invalid Username or password"})
        }
        const ress = result[0];
        if (pid !== ress.psid){
            return res.status(401).json({error:"Invalid Username or password"})
        }
        res.json({ message: "Logged in successfully!", uid: ress.uid });
    } catch (error) {
        console.error("Insert error:", error);
        res.status(500).json({ error: "Database Insert Failed" });
    }
});

app.post("/api/register", async (req, res) => {
    const { name,usid, psid,num } = req.body;
    const sql = "INSERT INTO register (name,usid, psid,num) VALUES (?, ?, ?, ?)";
    try {
        const [result] = await pool.query(sql, [name,usid, psid,num]);
        console.log("Insert Result:", result);
        res.json({ message: "User inserted successfully!", usid: result.insertId });
    } catch (error) {
        console.error("Insert error:", error);
        res.status(500).json({ error: "Database Insert Failed" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
