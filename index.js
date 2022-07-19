const express = require('express');
const fileUpload = require('express-fileupload')
const app = express();

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.json({"sucess": true});
})

app.listen(3000);