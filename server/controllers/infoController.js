const Info = require('../models/Info')

exports.updateInfo= function(req,res){
    let info = new Info(req.body)
    info.updateInfo().then(function(result){
        console.log(result)
        res.send(result)
    }).catch(function(errors){
        console.log(errors)
        res.send(errors)
    })

}

exports.getInfo = function(req,res){
    Info.getInfo().then(function(result){
        res.send(result)
    }).catch(function(error){
        res.send(error)
    })
}