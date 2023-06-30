const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const user = require("./models/user");
const product = require("./models/product");
const cors = require("cors");
const db =
  "mongodb+srv://bhaisab:test1234@nodejs.xgp9aar.mongodb.net/NodeJS?retryWrites=true&w=majority";
const app = express();
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());
mongoose.connect(db).then((result) => {
  console.log("Database connected"), app.listen(3000);
});

/*Multer Middleware*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage })
app.get("/", (req, resp) => {
  resp.send("App is working well");
});


app.post("/new-product", (req, res) => {
  console.log("New user in the making");
  const newuser = new user(req.body);
  newuser
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  console.log("Login kar raha");
  if (req.body.password && req.body.email) {
    const exsit = user
      .findOne(req.body)
      .select("-password")
      .then((result) => {
        if (result) {
          res.send(result);
        } else {
          res.send("No user exists");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send("Invalid details");
  }
});

app.post("/add-product", upload.single('image'), (req, res) => {
  const newproduct = new product({
    name: req.body.name,
    category: req.body.category,
    company: req.body.company,
    price: req.body.price,
    userID: req.body.userID,
    discription: req.body.discription,
    image: req.body.image
  });
  newproduct
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getAll", (req, res)=>{
  product.find()
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
});

app.delete("/getAll/:id", (req, res)=>{
   product.deleteOne({_id: req.params.id})
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
});

app.get("/update/:id", (req, res)=>{
  product.findOne({_id:req.params.id})
  .then((result)=>{
    if (result) {
      res.send(result);
    }
    else{
      res.send("Nahi hai")
    }
  })
  .catch((err)=>{
    console.log(err);
  })
});

app.get("/product/:id", (req, res)=>{
  product.findOne({_id:req.params.id})
  .then((result)=>{
    if (result) {
      res.send(result);
      console.log(result);
    }
    else{
      res.send("Nahi hai")
    }
  })
  .catch((err)=>{
    console.log(err);
  })
});

app.put("/update/:id", (req, res)=>{
  product.updateOne(
    {
      _id: req.params.id
    },
    {
      $set : req.body
    }
  )
  .then((result)=>{
    res.send(result);
  })
})

app.get("/search/:key", (req, res)=>{
  product.find({
    "$or" : [
      {name: {$regex: req.params.key}},
      {company: {$regex: req.params.key}}
    ]
  })
  .then((result)=>{
    if (result) {
      res.send(result);
    }
    else
    {
      res.send("Kuch aur dekhle");
    }
  })
  .catch((err)=>{
    console.log(err);
  });
})
