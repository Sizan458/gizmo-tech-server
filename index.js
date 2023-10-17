import  express from 'express';
import cors from 'cors';
const app = express();
const port =process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());
//home page for server
app.get('/', (req, res) => {
    res.send("Welcome to  my server!");
})
// exceed the server
app.listen(port,()=>{console.log(`server is listening on ${port}`)});