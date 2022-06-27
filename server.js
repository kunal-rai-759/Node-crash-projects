const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req,res)=>{
    // console.log('request made')
    // console.log(req.url,req.method)

    // set header
    res.setHeader('Content-Type','text/html')
    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusMessage = 'All working fine'
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html'
            res.statusMessage = 'All working fine'
            res.statusCode = 200
            break;
        case '/about-me':

            res.statusMessage = 'All working fine'
            res.statusCode = 301
            res.setHeader('Location','/about')
            res.end()
            break;
    
        default:
            path += '404.html'
            res.statusMessage = 'Not found'
            res.statusCode = 404
            break;
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err)
            res.end()
        }
        res.end(data+'hello/njhghgj')
    })
    // set response
    // res.write('<p>Hello world, This is kunal.</p>')
    // res.write('<p>I am from Rohtak.</p>')
    // res.write('<p>and I am an Engineer</p>')

    // res end
})

server.listen(3000,'localhost',()=>{
    console.log('listening on 3000')
})