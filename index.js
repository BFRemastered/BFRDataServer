const express = require('express');
const fileUpload = require('express-fileupload');
const crypto = require('crypto');
const fs = require('fs')
const app = express();

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/skin/:id", (req, res) => {
  try {
    if (fs.existsSync(__dirname+"/files/skins/"+req.params.id)) {
      res.sendFile(__dirname+"/files/skins/"+req.params.id);
    }
    else{
      console.log("skin not found");
      res.sendStatus(404);
      res.send("not found");
    }
  } catch(err) {
    console.log("skin not found");
    res.sendStatus(404);
    res.send("not found");
  }
});
app.get("/", (req, res) => {
 res.json({"res": "Successful connection to BFR"});
});
app.post('/upload-skin', async (req, res) => {
    try {
        if(!req.files) {
            res.json({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.files.image;
            let name = crypto.randomUUID();
            avatar.mv(__dirname+'/files/skins/' + name);
            res.send(name);
        }
    } catch (err) {
      console.log(err);
        res.status(500).send(err);
    }
});

app.listen(3000);