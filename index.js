const express = require('express')
const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000;

//Midelewere
app.use(cors());
app.use(express.json());

// // Mongo canection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ns2tb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('allData');
        //         const packageCollection = database.collection('packages');
        //         const ordersCollection = database.collection("orders");
        console.log('ok cunct')
        //         // GET API FOR LODE ALL PACKAGE
        //         app.get('/package', async (req, res) => {
        //             const cursor = packageCollection.find({});
        //             const package = await cursor.toArray();
        //             res.send(package);
        //         });

        //         // GET API Single Service 
        //         app.get('/singlePackage/:id', async (req, res) => {
        //             const id = req.params.id;
        //             const query = { _id: ObjectId(id) };
        //             const package = await packageCollection.findOne(query);
        //             res.json(package);
        //         })

        //         // POST API FOR ADD A PACKAGE 
        //         app.post('/package', async (req, res) => {
        //             const package = req.body;
        //             const result = await packageCollection.insertOne(package);
        //             res.json(result)
        //         });

        //         // POST PLACE ORDER API
        //         app.post('/placeorder', async (req, res) => {
        //             const order = req.body;
        //             const result = await ordersCollection.insertOne(order);
        //             res.json(result)
        //         });

        //         // GET  API FOR MY ORDERS 
        //         app.get("/myOrders/:email", async (req, res) => {
        //             const email = req.params.email;
        //             const query = { userEmail: email };
        //             const package = await ordersCollection.find(query).toArray();
        //             res.json(package);
        //         });

        //         // DELETE API FOR MY ORDER
        //         app.delete('/deleteProduct/:id', async (req, res) => {
        //             const id = req.params.id;
        //             const query = { _id: ObjectId(id) };
        //             const result = await ordersCollection.deleteOne(query);
        //             res.json(result);
        //         })

        //         // GET API FOR LODE MANAGE ALL PACKAGE 
        //         app.get('/manageallpackage', async (req, res) => {
        //             const cursor = ordersCollection.find({});
        //             const package = await cursor.toArray();
        //             res.send(package);
        //         });

        //         //UPDATE STATUS APPROVED
        //         app.put("/updatestatus/:id", async (req, res) => {
        //             const id = req.params.id;
        //             const updatedStatus = req.body;
        //             const filter = { _id: ObjectId(id) };
        //             const options = { upsert: true };
        //             const updateDoc = {
        //                 $set: {
        //                     status: updatedStatus.status
        //                 },
        //             };
        //             const result = await ordersCollection.updateOne(filter, updateDoc, options)
        //             res.json(result)
        //         });

        //         // DELETE API FROM MANAGE ALL ORDER 
        //         app.delete('/admindelete/:id', async (req, res) => {
        //             const id = req.params.id;
        //             const query = { _id: ObjectId(id) };
        //             const result = await ordersCollection.deleteOne(query);
        //             res.json(result);
        //         })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})