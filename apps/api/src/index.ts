import express from "express";
import { createClient } from "redis";

// AGAIN AGAIN AGAIN AGAIN AGAIN AGAIN AGAIN - CICD/SECONDARY2

// GITHUB WORKFLOW --- DEPLOY.YML TESTING - CICD/SECONDARY2

// 2nd 2nd GITHUB WORKFLOW --- DEPLOY.YML TESTING - CICD/SECONDARY2

const app = express();
app.use(express.json());

const client = createClient({
    url: 'redis://cicd-test-redis:6379'  // Use Redis container name
});
// client.on('error', (err) => console.error("Redis client error", err));

app.get("/", (req, res) => {
    res.json({
        message: "Hello tabish"
    })
});

app.post("/submit", async (req, res) => {
    const {problemId, code} = req.body;

    console.log(problemId, code);

    try{
        await client.lPush("Submissions", JSON.stringify({problemId, code}))
        res.json({
            message: "Submission recieved!"
        })
    }catch(e){
        console.error("The error is: ", e)
        res.status(500).send("Failed submission");
    }
})

async function startServer() {
    try{
        await client.connect();
        console.log('Connected to redis');

        app.listen(8080, () => {
            console.log("listen on port 8080");
        });
    }catch(err){
        console.error("Failed to connect to redis", err);
    }
}

startServer();