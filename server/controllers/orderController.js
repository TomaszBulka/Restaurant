const Order = require('../models/Order')


exports.createOrder = function(req, res){
    if(req.session.user){
        let order = new Order(req.body, req.session.user._id)
    order.create().then(function(){
        req.session.order = {_id: order.data._id}
        res.send("There are no erros")
    }).catch(function(){
        res.send("There are erros")
    })
    }else{
        let order = new Order(req.body)
        order.create().then(function(){
            req.session.order = {_id: order.data._id}
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


exports.findCurrentOrder =  function(req, res){
        Order.currentOrder(req.session.order._id).then(function(result){
            res.send(result)
        }).catch(function(error){
            res.send(error)
        })
    
    
}


exports.addAddress = function(req, res){
    
    Order.addCurrentOrdersAddress(req.body, req.session.order._id).then(function(){
        res.send('There are no errors')
    }).catch(function(){
        res.send('There are errors')
    })

}

exports.payAndRefresh = function(req, res){
    req.session.order = null

    res.send('Thank you for your payment !')
}

exports.latestOrders = function(req, res){

   
    Order.findLatestOrders().then(function(result){
        
        res.send(result)
    }).catch(function(error){
        res.send(error)
    })
}

exports.markAsRealized = function(req, res){
    Order.realizeOrder(req.body).then(function(){
        res.send('Order has been realized !')
    }).catch(function(){
        res.send('Something went wrong')
    })
}