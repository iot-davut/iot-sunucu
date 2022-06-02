const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(express.static(__dirname + "/dosyalar"));
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
var ObjectId = require("mongodb").ObjectId;
app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: "GET,HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);
mongoose.connect("mongodb+srv://davut:1234@davut-iot.k4v49.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true , useUnifiedTopology : true});

var kilit = new Schema(
  {
    bolum : String,
	durum : Boolean,
	isim : String
  },
  { timestamps: true }
);
var Kilit = mongoose.model("Kilit", kilit);

var lokasyon = new Schema(
  {
    latitude : String,
	longitude : String,
	altitude : String
  },
  { timestamps: true }
);
var Lokasyon = mongoose.model("Lokasyon", lokasyon);

var veritabani = new Schema(
  {
    table : Object
  },
  { timestamps: true }
);
var VeriTabani = mongoose.model("VeriTabani", veritabani);


var kullanici = new Schema(
  {
    username : String,
	password : String
  },
  { timestamps: true }
);
var Kullanici = mongoose.model("Kullanici", kullanici);

app.post("/api/kullanici-ekle", async function(req, res){
	//asdf
	try{
		var kullanici = new Kullanici({
		  username : req.body.username,
		  password : req.body.password
		});

		  
		  const kayit = await kullanici.save();
		  res.json(kayit);
	}catch(e){
		res.status(500).json({sonuc : e})
	}

});

var veritabani = new Schema(
  {
    table : Object
  },
  { timestamps: true }
);
var VeriTabani = mongoose.model("VeriTabani", veritabani);

app.post("/api/veritabani-ekle", async function(req, res){
	try{
		var veritabani = new VeriTabani({
		  table : req.body.table
		});

		  
		  const kayit = await veritabani.save();
		  res.json(kayit);
	}catch(e){
		res.status(500).json({sonuc : e})
	}

});

app.post("/api/lokasyon-ekle", async function(req, res){
	//asdf
	try{
		var lokasyon = new Lokasyon({
		  ...req.body
		});

		  
		  const kayit = await lokasyon.save();
		  res.json(kayit);
	}catch(e){
		res.status(500).json({sonuc : false})
	}

});


app.get("/api/kilit-listesi", async function(req, res) {
    try{
		const veriler  = await	Kilit.find({});
		res.status(200).json(veriler);
	}catch(e){
		res.status(500).json({sonuc : false})
	}
});

app.post("/api/kilit-ekle", async function(req, res){
	//asdf
	try{
		var kilit = new Kilit({
		  ...req.body
		});

		  
		  const kayit = await kilit.save();
		  res.json(kayit);
	}catch(e){
		res.status(500).json({sonuc : false})
	}

});

app.post("/api/kilit-guncelle", async function(req, res){
	try {
		
	  const object = req.body;
	  
      const kilit = await Kilit.updateOne(
        { _id: object.id},
        {
          $set: {
            durum: object.durum,
          },
        }
      );
	  res.status(202).json(kilit);
    } catch (err) {
      res.status(500).json(err);
    }
});

app.post("/api/kilit-sil", async function(req, res){
    
	try{
		var dokumanID = req.body.id;

		const silinenVeri = await Kilit.deleteOne({
			_id: dokumanID		
		});
		
		res.status(200).json(silinenVeri);
	}catch(e){
		res.status(500).json({sonuc : false})
	}

});


let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}

app.listen(port, function(){
  console.log("port numarasi : " + port);
});
