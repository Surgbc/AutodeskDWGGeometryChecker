var Promise = require('promise');
var express = require('express');
var app = express();

/*var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : ''
});

*/

//path to other pages & files
app.use(express.static('public'));


function saveData(data)
{
/*console.log(data);*/
var post={RECEIVED:data, TTIME: h+":"+m+":"+s};
/*console.log(post);*/
/*connection.connect();*/
	connection.query('INSERT INTO cgps SET ?',post, function (error, results, fields) {
  if (error) throw error;
/*console.log(query.sql);*/
});


/*connection.end();*/

}

function fetch1(ttime)
{
var get = {TTIME:ttime};
var result;
connection.query('SELECT Ind FROM cgps WHERE ?', get, function(error, results, fields)
{
});
console.log("POINT2");
console.log(result);
return result;
}

function fetch(ttime)
{
var promise = new Promise(
function(resolve, reject) {
	var get = {TTIME:ttime};
connection.query('SELECT Ind FROM cgps WHERE ?', get, function(error, results, fields)
{
if(results.length == 0)
{
connection.query('SELECT * FROM cgps WHERE 1', function(error, results, fields)
{
/*show the first entry*/
var tmp1=results[0];
var tmp = {0:results[0].TTime,1:results[0].RECEIVED};
resolve(tmp);
});

}else
{
var ind = results[0].Ind;
var get ={"Ind":++ind};
connection.query('SELECT * FROM cgps WHERE ?',get, function(error, results, fields)
{
if(results.length == 0)resolve({});
else
{
var tmp = {0:results[0].TTime,1:results[0].RECEIVED};
resolve(tmp);
}
});
}
});
});
return promise;

}

function checkTime(i) {
        return (i < 10) ? "0" + i : i;
}



var h=0;
var m=0;
var s=0;
function thisTime() {
        var today = new Date();
	    h = checkTime(today.getHours());
            m = checkTime(today.getMinutes());
            s = checkTime(today.getSeconds());

}

app.get('/', function (req, res) {
	thisTime();
	query = req.query;
	res.send(query);
	/*console.log(query.data);*/
	data = query.data;
	query = JSON.stringify(query);
	if(data != undefined)
	{
	saveData(data);
	console.log(h+":"+m+":"+s+"  "+data);
	}
else
{
console.log(h+":"+m+":"+s+"  "+query);
}
});


app.get('/fetch',function(req, res)
{
	query = req.query;
	console.log(query);
	tmp = {};
	ttime=query.ttime;
	if(ttime == undefined)res.send(JSON.stringify(tmp));
	else 
	{
		fetch(ttime).then(function(response){
		console.log(response);
		res.send(JSON.stringify(response));
		});	
	}

});

app.listen(3000, function () {
  console.log('CGPS listening on port 3000!')
})

