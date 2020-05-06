const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var DB = {
	games: [
			{
				id:10,
				title: "TFT",
				year: 2019
			},
			{
				id: 20,
				title: "lolzinho",
				year: 2008

			},
			{
				id: 30,
				title: "cs GO",
				year: 2014
			}
			
	]
}

//endpoint
app.get("/games",(req, res) => {
	res.statusCode = 200;
	res.json(DB.games);
});

app.get("/game/:id",(req, res) => {

	//validação
	if(IsNaN(req.params.id)){
		res.sendStatus(400);
	}else{

		var id = parserInt(req.params.id);

		var game = DB.games.find(g => g.id == id);

		if(game!= undefined){
			res.statusCode = 200;
			res.json(game);
		}else{
			res.sendStatus(404);
		}
	}

});


app.post("/game",(req, res) => {
	//destructor
	var {title, year} = req.body;

	DB.games.push({
		id:500,
		title,
		year
	});

	res.sendStatus(200);
});

app.delete("/game/:id",(req, res) => {

	if(IsNaN(req.params.id)){
		res.sendStatus(400);
	}else{
		var id = parseInt(req.params.id);
		var index = DB.games.findIndex(g => g.id == id);

		if(index == -1){
			res.sendStatus(404);
		}else{
			DB.games.splice(index,1);
			res.sendStatus(200);
		}
	}

});

app.put("/game/:id",(req, res) =>{

	if(IsNaN(req.params.id)){
		res.sendStatus(400);
	}else{
		var id = parseInt(req.params.id);
		var game = DB.games.find(g => g.id == id);

		if(game != undefined){
			

			var {title, year} = req.body;

			if(title != undefined){
				game.title = title;
			}

			if(year != undefined){
				game.year = year;
			}

			res.sendStatus(200);

		}else{
			res.sendStatus(404);
		}
	}
});


app.listen(8000, () => {
	console.log("API rodando");
})