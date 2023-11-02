const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const user = require("./models/user");
const product = require("./models/product");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = process.env.MongoDB_URI;
const app = express();
const Jwt = require('jsonwebtoken');
const jwtKey=process.env.JWT_KEY;
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


app.post("/new-user", async (req, res) => {
  console.log("New user in the making");
  const salt = await bcrypt.genSalt(10); 
  const bcryptPass = await bcrypt.hash(req.body.password, salt);
  const newuser = new user({
    name: req.body.name,
    email: req.body.email,
    password: bcryptPass
  });
  newuser
    .save()
    .then((result) => {
      Jwt.sign({result}, jwtKey, {expiresIn: "2h"}, (err, token)=>{
        if(err){
          res.send({result: "Something went wrong please try again later."})
        }
        res.send({result, auth:token});
      })
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  console.log("Login kar raha");
  if (req.body.password && req.body.email) {
    user.findOne({ email: req.body.email })
      .then((foundUser) => {
        if (foundUser) {
          bcrypt.compare(req.body.password, foundUser.password)
            .then((isMatch) => {
              if (isMatch) {
                Jwt.sign({ result: foundUser }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                  if (err) {
                    res.send({ result: "Something went wrong. Please try again later." });
                  } else {
                    res.send({ result: foundUser, auth: token });
                  }
                });
              } else {
                res.send("Invalid password");
              }
            })
            .catch((err) => {
              console.log(err);
            });
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


app.post("/add-event", verifyToken, upload.single('image'), (req, res) => {
  const newproduct = new product({
    event: req.body.event,
    MaxMem: req.body.MaxMem,
    address: req.body.address,
    entryFee: req.body.entryFee,
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

app.delete("/getAll/:id", verifyToken, (req, res)=>{
   product.deleteOne({_id: req.params.id})
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
});

app.get("/author/:id", verifyToken, (req, res)=>{
  user.findOne({_id: req.params.id})
   .then((result)=>{
     res.send(result);
     console.log(result);
   })
   .catch((err)=>{
     console.log(err);
   })
});

app.get("/update/:id", verifyToken, (req, res)=>{
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

app.get("/details/:id", verifyToken, (req, res)=>{
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

app.get("/event/:id", verifyToken, (req, res)=>{
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

app.put("/update/:id", verifyToken, (req, res)=>{
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

app.get("/search/:key", verifyToken, (req, res)=>{
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
});

function verifyToken(req, res, next){
  let token = req.headers['authorization'];
  if (token) {
    token=token.split(' ')[1];
    Jwt.verify(token, jwtKey, (err, valid)=>{
      if(err){
        res.status(401).send({result: "Invalid token"})
      }else{
        next();
      }
    })
  }else{
    res.status(403).send({result: "Invalid User"})
  }
}

app.put('/request/:id', (req, res) => {
  console.log(req.body);
  product.updateOne(
    {
      _id: req.params.id
    },
    {
      $push: {
        nivedan: { name: req.body.addname, email: req.body.addemail, userid: req.body.addID }
      }
    }
  )
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(422).json({ error: err });
    });
});

app.put('/accept/:id', (req, res) => {
  console.log(req.body);
  product.updateOne(
    {
      _id: req.params.id
    },
    {
      $push: {

        acc: { name: req.body.acceptname, email: req.body.acceptemail, userid: req.body.acceptuserid }
      },
      $pull:{
        nivedan: {userid: req.body.acceptuserid}
      }
    }
  )
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(422).json({ error: err });
    });
});

app.put('/remove/:id', (req, res) => {
  console.log(req.body);
  product.updateOne(
    {
      _id: req.params.id
    },
    {
      $push: {

        nivedan: { name: req.body.removename, email: req.body.removeemail, userid: req.body.removeuserid }
      },
      $pull:{
        acc: {userid: req.body.removeuserid}
      }
    }
  )
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(422).json({ error: err });
    });
});

app.put('/revert/:id', (req, res) => {
  console.log(req.body);
  product.updateOne(
    {
      _id: req.params.id
    },
    {
      $pull: {

        nivedan: { userid: req.body.revertuserid }
      },
    }
  )
    .then(result => {
      if (result) {
        res.send(result);
      } else {
        res.send("API hit to ho rha lekin pata nhi")
      }
    })
    .catch(err => {
      res.status(422).json({ error: err });
    });
});

