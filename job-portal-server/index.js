const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()
// middleWare
app.use(express.json())
app.use(cors())


//user:abdulrasheedbello338
//pass:t9qQyDEhY6txbEO2


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-database.httqs.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-database`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //create db
    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demojobs");

    // post a job
    app.post("/post-job", async(req, res) =>{
        const body = req.body;
        body.createAt = new Date();
        const result = await jobsCollections.insertOne(body);
        if (result.insertedId){
            returnres.status(200).send(result);
        }else{
            return res.status(404).send({
                message: "can not insert! try again later",
                status: false
            })
        }

    })

    // get all jobs
    app.get("/all-jobs", async(req, res) =>{
        const jobs = await jobsCollections.find({}).toArray()
        res.send(jobs);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello developer!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})