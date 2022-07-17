const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blogRoutes')


// express app
const app = express()

// connection to mongoDB
const dbURI = 'ABC' //MONGO URI
mongoose.connect(dbURI)
.then((result)=>{
    console.log('db is connected')
    console.log(result)
})
.catch((err)=>{
    console.log('db has error')
    console.log(err)

})


// express.static is for adding static files
// it will also act as a middleware

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
// middleware : It is act as a constructor to the request(depends on where we put it).
// In our case we are using it initially so it will act like constrctor.
//      we will use next() functon for middle ware.

// app.use((req,res,next)=>{
//     console.log('a new request hit')
//     console.log('host',req.hostname);
//     console.log('path',req.path);
//     console.log('method',req.method);
//     next()
// })

// app.use(morgan('common'))//::1 - - [05/Jul/2022:17:05:37 +0000] "GET / HTTP/1.1" 200 437
app.use(morgan('tiny'))//GET / 304 - - 18.016 ms




app.set('view engine','ejs')


// listen for requests
app.listen(3000)



// ejs render

// blog routes
app.use(blogRouter)

app.get('/',(req,res)=>{
    res.render('index',{title : 'Home'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title : 'About'})
})

app.use((req,res)=>{
    res.status(404).render('404',{title : '404 Not found'})
})



// 
app.get('/',(req,res)=>{
    // res.send('<p>hello this is express app</p>');
    res.sendFile('./view/index.html',{root:__dirname})
})

app.get('/about',(req,res)=>{
    res.send('<p>hello this is express app</p>');
})

// redirects
app.get('/about-us',(req,res)=>{
    res.redirect('./about');
})

// 404 page 
app.use((req,res)=>{
    res.status(404).sendFile('/404.html',{root:__dirname})
})


