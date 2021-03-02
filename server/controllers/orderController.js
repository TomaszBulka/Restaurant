const Order = require('../models/Order')

exports.createOrder = function(req, res){
    console.log(req.body)
    if(req.session.user){
        let order = new Order(req.body, req.session.user._id)
    order.create().then(function(){
        res.send("There are no erros")
    }).catch(function(){
        res.send("There are erros")
    })
    }else{
        let order = new Order(req.body)
        order.create().then(function(){
            res.send("There are no erros")
        }).catch(function(){
            res.send("There are erros")
        })
    }  
}

exports.findUsersOrders = function(req, res){
    Order.findOrdersById(req.session.user._id).then(function(result){
        res.send(result)
    }).catch(function(error){
        res.send(error)
    })
}

exports.getSumOfUsersOrders = function(req, res){
    Order.sumOfUsersOrders(req.session.user._id).then(function(result){
        res.json({ 'result': result})
    }).catch(function(error){
        res.send(error)
    })
}
