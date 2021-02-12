/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://admin:admin-pass@details-dwexy.gcp.mongodb.net/testDB?authSource=admin&replicaSet=Details-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

const doc = {
    id:{
      $gte: 10,
      $lte: 15,
    },
  };


/*MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("testDB");
  dbo.collection("College").find(doc).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
  dbo.collection("Student").find(doc).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  }); 
});*/


var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})


app.get('/student', function (req, res) {
   const id = parseInt(req.query.id);
   //res.send(id);
   const stud = {
   		id: id,
   };
   MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("Student").find(stud).toArray(function(err, result) {
			    if (err) throw err;
			    //console.log(result);
			    //res.json(result);
			    res.render('student',{student: result, title : 'Student'});
			    db.close();
			});
	});   
})

app.get('/country', function (req, res) {
   const id = req.query.id;
   //res.send(id);
   const stud = {
   		Country: id,
   };
   MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("College").find(stud).toArray(function(err, result) {
			    if (err) throw err;
			    //console.log(result);
			    //res.json(result);
			    res.render('data',{collegeList: result, title : 'Country'});
			    db.close();
			});
	});   
})

app.get('/college', function (req, res) {
   const id = parseInt(req.query.id);
   //res.send(id);
   const stud = {
   		id: id,
   };
   const col = {
      CollegeID: id,
   }
   MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("College").find(stud).toArray(function(err, result) {
			    if (err) throw err;
          if(result.length!=0){
          dbo.collection("Student").find(col).toArray(function(errs, resu) {
          if (err) throw err;
          //console.log(result.length)
          const simi = {
              Country: result[0].Country,
          }
          dbo.collection("College").find(simi).toArray(function(errss, resul) {
          if (err) throw err;
			    //console.log(result);
			    //res.json(result);
			    res.render('college',{collegeList: result, title : 'College', student: resu, simcollegeList: resul});
			    db.close();
			    }); }); }
          else{
            res.render('notfound');
          }

      });
	});   
})

app.get('/course/0', function (req, res) {
   const stud = {
   		"Courses.0": 1,
   };
   MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("College").find(stud).toArray(function(err, result) {
			    if (err) throw err;
			    //console.log(result);
			    //res.json(result);
			    res.render('data',{collegeList: result, title : 'Course'});
			    db.close();
			});
	});   
})

app.get('/course/1', function (req, res) {
   const stud = {
   		"Courses.1": 1,
   };
   MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("College").find(stud).toArray(function(err, result) {
			    if (err) throw err;
			    //console.log(result);
			    //res.json(result);
			    res.render('data',{collegeList: result, title : 'Course'});
			    db.close();
			});
	});   
})
app.get('/course/2', function (req, res) {
   const stud = {
   		"Courses.2": 1,
   };
   MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("College").find(stud).toArray(function(err, result) {
			    if (err) throw err;
			    //console.log(result);
			    //res.json(result);
			    res.render('data',{collegeList: result, title : 'Course'});
			    db.close();
			});
	});   
})
app.get('/course/3', function (req, res) {
   const stud = {
   		"Courses.3": 1,
   };
   MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("College").find(stud).toArray(function(err, result) {
			    if (err) throw err;
			    //console.log(result);
			    //res.json(result);
			    res.render('data',{collegeList: result, title : 'Course'});
			    db.close();
			});
	});   
})
app.get('/course/4', function (req, res) {
   const stud = {
   		"Courses.4": 1,
   };
   MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("College").find(stud).toArray(function(err, result) {
			    if (err) throw err;
			    //console.log(result);
			    //res.json(result);
			    res.render('data',{collegeList: result, title : 'Course'});
			    db.close();
			});
	});   
})

app.get('/streams', function(req,res){
	var arr = [0,0,0,0,0];
	const stud = {
   		"Courses.0": 1,
   	};
   	const stud1 = {
   		"Courses.1": 1,
   	};
   	const stud2 = {
   		"Courses.2": 1,
   	};
   	const stud3 = {
   		"Courses.3": 1,
   	};
   	const stud4 = {
   		"Courses.4": 1,
   	};
	 MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       var dbo = db.db("testDB");
	   dbo.collection("College").find(stud).toArray(function(err, result) {
			    if (err) throw err;
			    arr[0] = result.length;
			    dbo.collection("College").find(stud1).toArray(function(err, result) {
			    	if (err) throw err;
			    	arr[1] = result.length;
			    	dbo.collection("College").find(stud2).toArray(function(err, result) {
			    		if (err) throw err;
			    		arr[2] = result.length;
			    		dbo.collection("College").find(stud3).toArray(function(err, result) {
			    			if (err) throw err;
			    			arr[3] = result.length;
			    			dbo.collection("College").find(stud4).toArray(function(err, result) {
			    				if (err) throw err;
			    				arr[4] = result.length;

			    	res.render('stream',{c1: arr[0], c2: arr[1], c3: arr[2], c4: arr[3], c5: arr[4], title : 'Courses'});
			    	db.close();
			});});});});});
	});   
	
})

app.get('/location', function(req,res) {
	res.render('map',{title : 'Locations'});
})

app.get('/data', function (req, res) {

	  MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("testDB");
        /*dbo.collection("College").findOne({
            id:{
		      $gte: 10,
		      $lte: 15,
		    },
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        }); */
        dbo.collection("College").find(doc).toArray(function(err, result) {
		    if (err) throw err;
		    //console.log(result);
		    res.render('data',{collegeList: result});

		    db.close();
		});

    });

})

// get the app environment from Cloud Foundry
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
