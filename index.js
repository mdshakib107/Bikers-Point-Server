const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
        const productCollection = database.collection('products');
        const ordersCollection = database.collection("orders");
        const reviewsCollection = database.collection("reviews");
        const blogsCollection = database.collection("blogs");
        console.log('ok cunct')
        // GET API FOR LODE ALL Products
        app.get('/allproduct', async (req, res) => {
            const cursor = productCollection.find({});
            const product = await cursor.toArray();
            res.send(product);
        });

        // GET API Single Service 
        app.get('/singleProduct/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const package = await productCollection.findOne(query);
            res.json(package);
        })

        // POST API FOR ADD A PACKAGE 
        app.post('/addproduct', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.json(result)
        });

        // POST PLACE ORDER API
        app.post('/placeorder', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.json(result)
        });

        // GET  API FOR MY ORDERS 
        app.get("/myOrders/:email", async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const product = await ordersCollection.find(query).toArray();
            res.json(product);
        });

        // DELETE API FOR MY ORDER
        app.delete('/deleteProduct/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        })

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
        /*--------------------------------------
                 Manage All Order Section
        --------------------------------------- */
        // GET API FOR LODE ALL Orders
        app.get('/allorder', async (req, res) => {
            const cursor = ordersCollection.find({});
            const order = await cursor.toArray();
            res.send(order);
        });


        /*--------------------------------------
                 Blogs Section
        --------------------------------------- */
        // POST API FOR ADDDING BLOG 
        app.post('/addBlog', async (req, res) => {
            const product = req.body;
            const result = await blogsCollection.insertOne(product);
            res.json(result)
        });

        // GET API FOR LODE ALL BLOG
        app.get('/allBlog', async (req, res) => {
            const cursor = blogsCollection.find({});
            const blog = await cursor.toArray();
            res.send(blog);
        });

        // GET API Blog Details
        app.get('/singleblog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const blog = await blogsCollection.findOne(query);
            res.json(blog);
        })

        /*--------------------------------------
                    Review Section
        --------------------------------------- */
        //  POST API FOR ADDING Review
        app.post("/addReview", async (req, res) => {
            const result = await reviewsCollection.insertOne(req.body);
            res.send(result);
        });

        // GET API FOR LODE ALL Review
        app.get('/allreview', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const review = await cursor.toArray();
            res.send(review);
        });

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