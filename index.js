import  express from 'express';
import cors from 'cors';
import{ MongoClient, ServerApiVersion } from 'mongodb';
const app = express();
const port =process.env.PORT ||5000;
//middleware
app.use(cors());
app.use(express.json());
//home page for server
//Gizmo-Tech-World-server
//Ng7RpN8TqCbKxDU2
app.get('/', (req, res) => {
    res.send("Welcome to  my server!");
})
// connect to mongodb server


const uri = "mongodb+srv://Gizmo-Tech-World:pzdryf73R3zx2GuC@cluster0.fo1holf.mongodb.net/?retryWrites=true&w=majority";

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
    //create a database
  const database =  client.db( 'Gizmo-Tech-World-server'  );
  const  BrandCollection = database.collection("brands");
  const  AppleCollection = client.db( 'Gizmo-Tech-World-server' ).collection("apple-products");
  const  SamsungCollection = client.db( 'Gizmo-Tech-World-server').collection("samsung-products");
  //brands api
//insert data into database
app .post ("/brands", async(req, res) =>{
    const brand = req.body;
    const result = await  BrandCollection.insertOne(brand);
    res.send(result);
})
//show all data in sever site
app.get ("/brands", async(req, res) =>{
    const result = await  BrandCollection .find().toArray();
    res.send(result);
    //Apple products api
    //insert data into database
    app.post("/apple-products", async(req, res) =>{
        const appleProduct =req.body;
        const result =  await AppleCollection.insertOne(appleProduct)
        res.send(result);
    });
    //show all data in sever site
    app.get ("/apple-products", async(req, res) =>{
        const result = await  AppleCollection .find().toArray();
        res.send(result);
    })
})    //samsung products api 
      //insert data into database
      app.post("/samsung-products", async(req, res) =>{
        const samsungProduct =req.body;
        const result =  await SamsungCollection.insertOne(samsungProduct)
        res.send(result);
    });
    //show all data in sever site
    app.get ("/samsung-products", async(req, res) =>{
        const result = await  SamsungCollection .find().toArray();
        res.send(result);
    })
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

// exceed the server
app.listen(port,()=>{console.log(`server is listening on ${port}`)});