//load libraries
const http=require('http');
const express=require('express');
const path=require('path');
const cors=require('cors');
const hbs=require('express-handlebars');
const request=require('request');
const defaultLayout=require('Layouts');
const qs=require('querystring');
const bodyParser=require('body-parser');

//Create an instance of express
const app=express();
app.use(cors());
app.use(bodyParser.json());

// Config. express to use handlebars as the rendering engine
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir:__dirname + '/views/layouts/'
}));

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','hbs');

//Define routes
//app.use(express.static(path.join(__dirname + "/public")));
    
/*
app.get('/', (req, resp) => {
    let qs  = req.query.term;
    let term = encodeURIComponent(qs);
    let url = 'https://api.giphy.com/v1/gifs/search?g=' + term + '&api_key=9DpO8151e4NRN7DfRPySwC0Xeo4XVtqW';
        res.status(200);
        res.send('I am in SG!');
      });

          http.get(url, (response) = {
          response.setEncoding('utf8');
          let body = '';
          and stream
            response.on('data, (d) => {
                body += d;
            }
*/ 

app.get("/api/search",(req,res,next)=>{
   const params = {
        api_key: '9DpO8151e4NRN7DfRPySwC0Xeo4XVtqW',
        qs:'',
        limit : 5
    };

    const fixedWidthUrls = [];
    const giflist=[];

    res.status(200);
    console.log(params);
    request.get('https://api.giphy.com/v1/gifs/search?api_key=9DpO8151e4NRN7DfRPySwC0Xeo4XVtqW&q=unicorn&limit=5',
           
                (err, respond, body)=>{ 

                    const fixedWidthUrls = [];

                    let parsed = JSON.parse(body);
                    console.log('Parsed data:', parsed.data);

                    const data = JSON.parse(body).data;
                    for (let d of data) //this is the one complained by terminal
                        fixedWidthUrls.push(d.images.fixed_width.url); // is there a syntax wrong here? see *images* its in white
                        console.log(fixedWidthUrls);     
                        res.render('search', { gifs: fixedWidthUrls });
                }
                );
        console.log(">>>",giflist, fixedWidthUrls);
});

app.get((req,res)=>{
    res.status(404);
    res.type('text/html');
    res.type('gif')
    res.send('<h1>Not Found</h1>');
    end;
})

//Start web server
//start server on port 3000 if undefined on command line
const PORT=parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});