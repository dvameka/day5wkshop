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
    layoutsDir:__dirname + 'views/layouts/'
}));

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','hbs');

//Define routes
app.use(express.static(path.join(__dirname + "/public")));
    
const gsearch = [ ];

app.get('/', (req, resp) => {
    let qs  = req.query.term;
    let term = encodeURIComponent(qs);
    let url = 'https://api.giphy.com/v1/gifs/search?g=' + term + '&api_key=9DpO8151e4NRN7DfRPySwC0Xeo4XVtqW';
        resp.status(200);
        resp.xssend('I am in SG!');
      });

   /*   http.get(url, (response) = {
          response.setEncoding('utf8');
          let body = '';
          and stream
            response.on('data, (d) => {
                body += d;
            }
      });
   */
app.get("/api/search",(req,res,next)=>{
    const params = {
        api_key: '9DpO8151e4NRN7DfRPySwC0Xeo4XVtqW',
        q: 'cat'
    };

    resp.status(200);
    console.log(params);
    
    request.get('https://api.giphy.com/v1/gifs/search?api_key=9DpO8151e4NRN7DfRPySwC0Xeo4XVtqW', 
           
                (err,res, body)=>{

                    //console.log(body);
                    let parsed = JSON.parse(body);
                    console.log('Parsed data:', parsed.data);

                }
                );
                
//    res.send(`<h1>${parsed}</h1>`);
    
});

app.get((req,res)=>{
    res.status(404);
    res.type('text/html');
    res.end('<h1>Not Found</h1>');
})

//Start web server
//start server on port 3000 if undefined on command line
const PORT=parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});