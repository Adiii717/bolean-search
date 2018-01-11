var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var inArray = require('in-array');
var index1 = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs');
var elasticlunr = require('elasticlunr')
var app = express();
var core = require('cores')
_ = require('lodash')
var hasValue = require('has-value');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4300');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});;
app.use('/public', express.static(path.join(__dirname + '/public')));

var tm = require('text-miner');
var fs = require('fs');
var fs1 = require('fs');
var doc_1 = fs.readFileSync('./removestopandstem.txt', "utf8");
var doc_2 = fs1.readFileSync('./public/node-dev1.txt', "utf8");
var doc_3 = fs1.readFileSync('./public/ck-10-problems.txt', "utf8");
var doc_4 = fs1.readFileSync('./public/computer-secuirty-in-real-word.txt', "utf8");
var doc_5 = fs1.readFileSync('./public/using nodejs to build application.txt', "utf8");
var doc_6 = fs1.readFileSync('./public/Trust in government’s social media service and citizen’s patronage behavior.txt', "utf8");
var doc_7 = fs1.readFileSync('./public/writingResearchPapers.txt', "utf8");
var doc_8 = fs1.readFileSync('./public/communication.txt', "utf8");
var doc_8 = fs1.readFileSync('./public/invertedindex.json', "utf8");



app.get('/inverted', function(req, res) {



    var fs = require('fs');
    var obj;
    fs.readFile('./public/invertedindex.json', 'utf8', function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.json(obj)
    });

    console.log(doc_8)
    console.log(obj)


})
app.get('/persons', function(req, res) {
    var filePath = "./public/researh_paper/"; // Or format the path using the `id` rest param
    var fileName = req.params.name + ".txt"; // The default name the browser will use

    res.download(filePath, fileName);
})
app.get('/download/file/:name', function(req, res, next) {
    var filePath = "./public/researh_paper/"; // Or format the path using the `id` rest param
    var fileName = req.params.name + ".txt"; // The default name the browser will use

    res.download(filePath, fileName);
});
app.get('/bolean/search/:text', function(req, res) {


})
app.use('/:qtext', function(req, res) {

    var index = elasticlunr(function() {
        this.addField('title');
        this.addField('body');
        this.setRef('id');
        this.saveDocument(false);
    });
    var doc1 = {
        "id": 1,
        "title": "Information system",
        "body": doc_1
    }

    var doc2 = {
        "id": 2,
        "title": "Computer interaction",
        "body": doc_2
    }
    var doc3 = {
        "id": 3,
        "title": "Computer secuirty",
        "body": doc_3
    }
    var doc4 = {
        "id": 4,
        "title": "Computer application using nodejs",
        "body": doc_4
    }
    var doc5 = {
        "id": 5,
        "title": "human computer interaction",
        "body": doc_5
    }
    var doc6 = {
        "id": 6,
        "title": "nodejs in large scale application",
        "body": doc_6
    }

    var doc7 = {
        "id": 7,
        "title": "trust in e govt",
        "body": doc_7
    }
    var doc8 = {
        "id": 7,
        "title": "communication",
        "body": doc_8
    }





    index.addDoc(doc1);
    index.addDoc(doc2);
    index.addDoc(doc3);
    index.addDoc(doc4);
    index.addDoc(doc5);
    index.addDoc(doc6);
    index.addDoc(doc7);
    index.addDoc(doc8)
    elasticlunr.clearStopWords();
    const cleanDeep = require('clean-deep');
    ress = index.search(req.params.qtext)
    result_term = []
    _.forEach(ress, function(value, key) {
        console.log(value.ref)
        if (value.ref == 0) {
            result_term[0] = { url: "http://127.0.0.1:3001/public/node-dev.txt", title: "Information system", author: "adil", score: value.score }
        }
        if (value.ref == 1) {
            result_term[1] = { url: "http://127.0.0.1:3001/public/node-dev.txt/node-dev1.txt", title: "computer interaction", author: "Ali", score: value.score }
        }
        if (value.ref == 2) {
            result_term[3] = { url: "http://127.0.0.1:3001/public/Trust in government’s social media service and citizen’s patronage behavior.txt", title: "E govt", author: "Ali", score: value.score }
        }
        if (value.ref == 4) {
            result_term[4] = { url: "http://127.0.0.1:3001/public/Trust in government’s social media service and citizen’s patronage behavior.txt", title: "Computer secuitry", author: "stev hension", score: value.score }
        }
        if (value.ref == 7) {
            result_term[4] = { url: "http://127.0.0.1:3001/public/communication.pdf", title: "Information communication", author: "International Labour Office", score: value.score }
        }

    });

    cleanres = cleanDeep(result_term);
    res.json(cleanres)













    var searchTerm = req.params.qtext;
    q_array = searchTerm.split(' ');


    if (q_array.length >= 1)

    {

        if (q_array[1] == "or") {



            stopword_token(searchTerm, function(data) {


                index.addDoc(doc1);
                index.addDoc(doc2);
                index.addDoc(doc3);
                index.addDoc(doc4);
                index.addDoc(doc5);
                index.addDoc(doc6);
                index.addDoc(doc7);


                ress = index.search(q_array[0], {
                    fields: {

                        body: { boost: 2 }
                    },
                    bool: "OR"
                });
                res.json({ "ans": ress })
                res.end();
                exit();

            })



        }
    }
    if (q_array[1] == "and") {


        stopword_token(searchTerm, function(data) {
            var doc1 = {
                "id": 1,
                "title": "Information system",
                "body": doc_1
            }

            var doc2 = {
                "id": 2,
                "title": "Computer interaction",
                "body": doc_2
            }
            var doc3 = {
                "id": 3,
                "title": "Computer secuirty",
                "body": doc_3
            }
            var doc4 = {
                "id": 4,
                "title": "Computer application using nodejs",
                "body": doc_4
            }
            var doc5 = {
                "id": 5,
                "title": "human computer interaction",
                "body": doc_5
            }
            var doc6 = {
                "id": 6,
                "title": "nodejs in large scale application",
                "body": doc_6
            }

            var doc7 = {
                "id": 7,
                "title": "trust in e govt",
                "body": doc_7
            }
            index.addDoc(doc1);
            index.addDoc(doc2);
            index.addDoc(doc3);
            index.addDoc(doc4);
            index.addDoc(doc5);
            index.addDoc(doc6);
            index.addDoc(doc7);
            elasticlunr.clearStopWords();
            ress = index.search(req.params.qtext)
            result_term = []
            _.forEach(ress, function(value, key) {

                if (key == 0) {
                    result_term[0] = { url: "http://127.0.0.1:3001/public/node-dev.txt", title: "Information system", author: "adil", score: value.score }
                }
                if (key == 1) {
                    result_term[1] = { url: "http://127.0.0.1:3001/public/node-dev.txt/node-dev1.txt", title: "computer interaction", author: "Ali", score: value.score }
                }
                if (key == 3) {
                    result_term[3] = { url: "http://127.0.0.1:3001/public/Trust in government’s social media service and citizen’s patronage behavior.txt", title: "E govt", author: "Ali", score: value.score }
                }
                if (key == 4) {
                    result_term[4] = { url: "http://127.0.0.1:3001/public/Trust in government’s social media service and citizen’s patronage behavior.txt", title: "Computer secuitry", author: "stev hension", score: value.score }
                }


            });
            res.json(result_term)

        })



    }



    // stopword_token(searchTerm, function(data) {
    //     ress = index.search(req.params.qtext)
    //     result_term = []
    //     _.forEach(ress, function(value, key) {

    //         if (key == 0) {
    //             result_term[0] = { url: "http://127.0.0.1:3000/public/node-dev.txt", title: "Information system", author: "Jcob ", score: value.score }
    //         }
    //         if (key == 1) {
    //             result_term[1] = { url: "http://127.0.0.1:3000/public/node-dev.txt/node-dev1.txt", title: "computer interaction", author: "Ali", score: value.score }
    //         }
    //         // if (key == 3) {
    //         //     result_term[3] = { url: "http://127.0.0.1:3000/public/Trust in government’s social media service and citizen’s patronage behavior.txt", title: "E govt", author: "Ali", score: value.score }
    //         // }
    //         // if (key == 4) {
    //         //     result_term[4] = { url: "http://127.0.0.1:3000/public/Trust in government’s social media service and citizen’s patronage behavior.txt", title: "Computer secuitry", author: "stev hension", score: value.score }
    //         // }

    //     });
    //     res.json(result_term)
    //     console.log(result_term);

    // })
});



app.use('/inverted_index', function(req, res) {

    res.json({ hi: "hi" })

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});






// stop word removal section
var nlp = require('nlp-toolkit');
var fs = require('fs');
var es = require('event-stream');
var data = '';
// get an array of english stopwords
require('stopwords').english;

var stopwords = require('stopwords').english;
var natural = require('natural');
sw = require('stopword')
var natural = require('natural'),
    stemmer = natural.PorterStemmer;

//conver_doc('./public/researh_paper/node-dev1.txt')




// var dir = require('node-dir');

// console.log(__dirname)
// dir.readFiles(__dirname + '/public/', {
//         match: /.txt$/,
//         exclude: /^\./
//     }, function(err, content, next) {
//         if (err) throw err;
//         //console.log('content:', content);
//         // process.exit()
//     },
//     function(err, files) {
//         if (err) throw err;
//         console.log('finished reading files:', files);
//     });

// conver_doc('./public/ck-10-problems.txt')
// conver_doc('./public/doc2.txt')
// conver_doc('./public/computer-secuirty-in-real-word.txt')
// conver_doc('./public/Trust in government’s social media service and citizen’s patronage behavior.txt')
// conver_doc('./public/doc3.txt')
// conver_doc('./public/using nodejs to build application.txt')
// conver_doc('./public/writingResearchPapers.txt')



//method section
//document conversion section
function conver_doc(file_url) {
    var readStream = fs.createReadStream(file_url, 'utf8');
    readStream.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {

        var stopwords = require('stopwords').english;
        var natural = require('natural');

        var stemmedAndNoStopwords =
            data.split(/\W+/)
            // stopwords filtering
            .filter((w) => {
                return stopwords.indexOf(w.toLowerCase()) < 0
            })
            // stemming
            .map((word) => {


                return natural.PorterStemmer.stem(word)
            })
            .join(" ")

        console.log("STEM", stemmedAndNoStopwords)
            //  include the Keyword Extractor 
        var keyword_extractor = require("keyword-extractor");


        var extraction_result = keyword_extractor.extract(stemmedAndNoStopwords, {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: true

        });

        console.log("KEY WORD", extraction_result)
        var string_val = extraction_result.join();

        var formattedString = string_val.split(",").join(" ")
        var parts = file_url.split('/');
        var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
        fs.writeFile(lastSegment + '.json', extraction_result, (err) => {
            // throws an error, you could also catch it here
            if (err) {


            } else {
                console.log(extraction_result)

            }

            // success case, the file was saved
            // console.log('Lyric saved!');

        });


        // const oldString = data.split(' ');
        // console.log(oldString)
        // const newString = sw.removeStopwords(oldString)
        // console.log(newString);
    });
}


//query term cleaner section 
function stopword_token(qterm, text) {

    var stopwords = require('stopwords').english;
    var natural = require('natural');


    //  include the Keyword Extractor 
    var keyword_extractor = require("keyword-extractor");


    var extraction_result = keyword_extractor.extract(qterm, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true

    });

    console.log(extraction_result)
    var string_val = extraction_result.join();

    var formattedString = string_val.split(",").join(" ")
    console.log("resut is")
    console.log(formattedString)
    text(formattedString)

}













// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;