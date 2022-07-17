const express = require('express')

const router = express.Router()
const Blog = require('../models/Blog')


router.get('/add-blog',(req,res)=>{
    const blog = Blog({
        title:'2nd blog',
        snippet:'first blog for node',
        body:'Body for fist blog blah blah blah...'
    })

    blog.save()
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get('/blog/create',(req,res)=>{
    res.render('create',{title : 'Create a new blog'})
})
router.get('/blogs',(req,res)=>{
    Blog.find().sort({'createdAt':-1})
    .then((data)=>{
        res.render('blogs',{blogs:data,title:'Blogs'})
        // res.send(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get('/single-blog',(req,res)=>{
    Blog.findById('62c5c8187d940e073122246d')
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post('/blogs',(req,res)=>{
    console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
    .then((data)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
})


router.get('/blogs/:id',(req,res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then((data)=>{
        res.render('details',{title:'Blog',blog:data})
    })
})

router.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then((data)=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{
        console.log(err)
    })
})
module.exports = router