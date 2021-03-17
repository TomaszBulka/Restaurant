const User = require('../models/User')

exports.createUser = function(req, res){
    let user = new User(req.body)
    user.create().then( function(){
            res.send('There are no errors')   
    }).catch(function(errors){
            res.send(errors)
    })
}

exports.login = function(req, res){
        let user = new User(req.body)
        user.login().then(function(result){
                req.session.user = { username: user.data.username, _id: user.data._id, address: user.data.address }
                req.session.save()
                res.send(result)
                
        }).catch(function(error){
                res.send(error)
        })          
}


exports.getUser = function(req, res){
        let user = req.session.user
        res.send(user)
}

exports.logout = function(req, res){
        req.session.destroy()
        res.send(" You are logged out")
}

