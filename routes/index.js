// Full Documentation - https://docs.turbo360.co
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const url = "mongodb+srv://demo:demo.ayg777@cluster0-mjcb5.azure.mongodb.net/demo?retryWrites=true&w=majority";
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	const data = {
		greeting: "Welcome to the Demo",
		description: "This is a description"
	}
	res.render('index', data)
})

router.get('/data_reader', (req, res)=>{
	MongoClient.connect(url,(err,client)=>{
		if(err){
			console.log("Unable to connect to Mongo")
		} else {
			var db = client.db("demo")
			var collection = db.collection("entries")
			collection.find({}).toArray((err,result)=>{
				if(err){
					console.log("Error obtaining entries")
				} else {
					//console.log(result);
					res.render('data_reader', {"entries":result});
				}
				db.close;
			})
		}
	})
	
})

router.get("/delete_entry/:id", (req, res)=>{
	var id = new mongodb.ObjectID(req.params.id);
	console.log(id)
	MongoClient.connect(url,(err,client)=>{
		if(err){
			console.log("Unable to connect to Mongo")
		} else{
			var db = client.db("demo")
			var collection = db.collection("entries")
			console.log(id);
			collection.deleteOne({"_id" : id}, (err,result) =>{
				if (err){
					console.log("Error deleting entry")
				} else{
					res.redirect("/data_reader");
				}
				db.close;
			})
			
		}
	});

})

router.post("/",(req,res) => {
	var MongoClient = mongodb.MongoClient;
	MongoClient.connect(url,(err,client) => {
		if(err){
			console.log("Unable to connect to Mongo")
		} else {
			console.log("Connected to Mongo from index.js")
			var db = client.db("demo");
			var collection = db.collection("entries");
			var entry = {	employee: req.body.employee
							,plant: req.body.plant
							,field1: req.body.field1
							,field2: req.body.field2
							,field3: req.body.field3
						};
	
			collection.insert([entry], (err,result)=>{
				if(err){
					console.log(err);
				} else {
					console.log("Inserted: ",[entry]);
					res.redirect("/");
				}
				db.close;
			})
			
		};			
		
	});
})


module.exports = router
