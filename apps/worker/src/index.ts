import { createClient } from "redis";

const client = createClient({
    url: 'redis://cicd-test-redis:6379'  // Use Redis container name
});

// client.on('error', (err) => console.error("Redis client error", err));

async function startWorker() {
    try{
        await client.connect();
        console.log("Worker - redis connection success");

        while(1){
            const response = await client.brPop("Submissions", 0);
            console.log(response)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Processed user submissions");
        }
    
    }catch(e){
        console.error("Worker - redis connection failure");
    }
    
    
}

startWorker()