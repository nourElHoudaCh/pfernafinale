const express = require("express") //setting up an express serveur 
const router=express.Router()
const Article = require("../models/Article")
    router.post("/ajouter",(req,res)=>{
    const {codearticle,nomarticle,prixarticle}=req.body;
    Article.findOne({ CodeArticle:codearticle})
    .then((arti)=>{
        if (arti) {return res.sendStatus(409)}
        else {
            const art = new Article({
                CodeArticle:codearticle,Designation:nomarticle,Prix:prixarticle,Date:new Date(),VC:0,DegreEnfencement:0,
                Temperature:0,TAV:0 ,Densite:0,Coef:0,Quantite:0
            })
        art.save()
        .then ((data)=>{
        res.sendStatus(200);
        })
        .catch(err=>res.sendStatus(404))
    }  })
})
router.get("/all",(req,res)=>{
    Article.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})
router.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    Article.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))
})
router.put("/update/:id",(req, res)=>{
    const {CodeArticle,Designation,Prix}=req.body;

    if(!req.body){
        return res.status(400)
    }
    const id = req.params.id;
    Article.findOne({CodeArticle})
    .then((art)=>{
        if(art) return(res.sendStatus(409)); 
        else{Article.findByIdAndUpdate({_id:id}, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update article with ${id}. Maybe article not found!`})
            }
            else{ res.send(data) }
        })
        .catch(err =>{ res.status(500) })} })
})

router.put("/updatequantite/:id",(req, res)=>{
    const {Quantite}=req.body;
    const id = req.params.id;
    if(!req.body){
        return res.status(400)
    }
    else{
        Article.findByIdAndUpdate({_id:id}, req.body)
        .then(data => {
             res.send(data)
        })
        .catch(err =>{ res.sendStatus(500) })} 
    
})



module.exports=router;