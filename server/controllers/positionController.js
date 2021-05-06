const Position = require('../models/Position')

exports.getPositions = async function(req, res){
    let positions = await Position.findPositions()
   res.send(positions)
}


exports.findPositionById = async function(req, res){
    await Position.findById(req.params._id).then(function(result){
        res.send(result)
    }).catch(function(){
        res.send("Something went wrong")
    })
}

exports.deletePosition = async function(req,res){
    Position.deletePosition(req.body._id).then(function(){
        res.send('Position deleted')
    }).catch(function(){
        res.send('Try again')
    })
   
}

exports.createPosition = async function(req,res){
    let position = new Position(req.body)
    position.createPosition().then(function(result){
        res.send(result)
    }).catch(function(errors){
        res.send(errors)
    })
}

exports.updatePosition = function(req,res){
    let position = new Position(req.body)
    position.updatePosition().then(function(result){
        res.send(result)
    }).catch(function(errors){
        res.send(errors)
    })
}