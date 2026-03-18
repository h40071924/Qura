const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { send } = require("process");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const uuid = require('uuid-random');


let posts =[
    {   id:uuid(),
        title:"First Post",
        content:"This is the content of the first post."},
        {
        id:uuid(),
        title:"Second Post",
        content:"This is the content of the second post."},
        {
        id:uuid(),
        title:"Third Post",
        content:"This is the content of the third post."
        }
]
// main page

app.get('/', (req, res) => {
  res.send('<h1>Qura Project is Live!</h1><p>The server is running successfully.</p>');
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
// new post page
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
// new post get reflect
app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {title,content} = req.body;
    posts.push({title:title,content:content,id:uuid()});
    res.redirect("/posts");
})
// see in detail
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> post.id ==id);
    res.render("show.ejs",{post});
})
app.get("/posts/:id/edit",(req,res)=>{
      let {id} = req.params;
      let post = posts.find((post)=>post.id ==id);
      res.render("edit.ejs",{post});
})
app.put("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=>post.id ==id);
    let {content} = req.body;
    post.content = content;
    res.redirect("/posts");
}) 
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((post)=>post.id !=id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})