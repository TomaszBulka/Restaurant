const Opinion = require('../models/Opinion')

exports.create  = function(req, res){
    let opinion = new Opinion(req.body)
    opinion.create().then(function(){
      res.send("New post created")
    }).catch(function(errors){
      res.send(errors)
    })
}

exports.getOpinions =  async function(req, res){
  let opinions = await Opinion.findOpinions()
  res.send(opinions)
  
    
}