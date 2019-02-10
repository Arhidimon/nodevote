var mysql = require('mysql');

var connection = mysql.createConnection(
{
	host		: 'localhost',
	user		: 'nodevoteuser',
	password	: 'password',
	database	: 'nodevote'
});

connection.connect(function(err) {
	if (err)
	{
		console.error('[connection error] ', err);
		process.exit(1);
	}
	else
		console.log("Connected!");
});


var express = require('express');
var app = express();
app.use(express.json());
var server = app.listen(3000);


// Root route

app.all('/', function (req, res) {
	res.status(404).send('Not Found');
});


// POST /theme method route

app.post('/theme', function (req, res) {
	const tname = req.body.name;
	if (tname == undefined)
		res.status(400).send('Bad Request');
	else if (tname.length > 1024)
		res.status(200).json({'error': "Name length cannot be greater than 1024"});
	else
	{
		connection.query('INSERT INTO themes SET ?', {'name' : tname}, function(err, result)
		{
			if (err)
			{
				res.status(500).send('Internal Server Error');
				console.error('[mysql error]', err);
				process.exit(1);
			}
			else
				res.status(200).json({'error': null,'themeId':result.insertId});
		});
	}
});


// GET /theme/{themeId} method route

app.get('/theme/(([0-9]+))', function (req, res) {

	connection.query('SELECT * FROM themes WHERE themeId = ' + mysql.escape(req.params[0]), function(err, result)
	{
		if (err)
		{
			console.error("[mysql error]", err);
			res.status(500).send('Internal Server Error');
			
		}
		else if (result == 0)
		{
			console.log("There is no theme with such {themeId}");
			res.status(404).send('Theme Not Found');
		}
		else
			res.status(200).json({'name': result[0].name,
				'votes' : {'yes' : result[0].yes, 'no' : result[0].no}});	
	});
});


// POST /theme/{themeId}/yes and /theme/{themeId}/no methods route

app.post('/theme/(([0-9]+)/((yes)|(no)))', function (req, res) {
	connection.query('SELECT * FROM themes WHERE themeId = ' + mysql.escape(req.params[0]), function(err, result)
	{
		if (err)
		{
			console.error("[mysql error]", err);
			res.status(500).send('Internal Server Error');
			
		}
		else if (result == 0)
			res.status(500).send('Internal Server Error');
		else if (req.params[1] == 'yes')
			connection.query('UPDATE themes SET yes = yes + 1 WHERE themeId = ' + mysql.escape(req.params[0]),
				function(err, result)
				{
					if (err)
					{
						console.error("[mysql error]", err);
						res.status(500).send('Internal Server Error');
					}
					else
						res.status(200).send("OK");
				});
		else
			connection.query('UPDATE themes SET no = no + 1 WHERE themeId = ' + mysql.escape(req.params[0]),
				function(err, result)
				{
					if (err)
					{
						console.error("[mysql error]", err);
						res.status(500).send('Internal Server Error');
					}
					else
						res.status(200).send("OK");
				});
	});
});
