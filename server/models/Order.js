let ordersCollection = require('../db').db().collection('orders')
const ObjectID = require('mongodb').ObjectID

let Order = function(data, clientId){
    this.data = data
    this.errors = []
    this.clientId = clientId
}

Order.prototype.cleanUp = function(){
    if(this.clientId){
        this.data = {
            orderedPositions: this.data.orderedPositions,
            sum:  this.data.getSumOfPrices || this.data.getDiscountedPrice,
            dateOfOrder: new Date(),
            client: ObjectID(this.clientId),
            isRealized: false
            
        }
    }else {
        this.data = {
            orderedPositions: this.data.orderedPositions,
            sum:  this.data.getSumOfPrices || this.data.getDiscountedPrice,
            dateOfOrder: new Date(),
            client: 'Client unregistered',
            isRealized: false
    }
}
    
}

Order.prototype.create = function(){
    return new Promise(async (resolve, reject) =>{
        if(!this.errors.length){
            this.cleanUp()
            await ordersCollection.insertOne(this.data).then(() =>{
                resolve()
            }).catch(() =>{

                this.errors.push("Try again later")
                reject(this.errors)
            })
            
        }else{
            reject("Please try again")
        }
    })
}

Order.findOrdersById = function(id){
    return new Promise(async function(resolve, reject){
        let orders = await ordersCollection.aggregate([
            {$match: {client: new ObjectID(id)}},
            {$sort: {dateOfOrder: -1}},
            {$project: {
                _id: 1,
                sum: 1,
                orderedPositions: 1    
            }}
        ]).toArray()

        // filtrujemy co chcemy przekazać do orderControllera
        orders = orders.map(function(order){
            order = order.orderedPositions.map(function(position){
                position = {
                    name: position.name,
                    price: position.price
                }
                return position
            })
            return order
        })
        if(orders.length){
            resolve(orders)
        }else{
            reject("Nie złożyłes jeszcze żadnych zamówień")
        }
    })
}

Order.sumOfUsersOrders = function(id){
    return new Promise(async function(resolve, reject){
        let orders = await ordersCollection.aggregate([
            {$match: {client: new ObjectID(id)}},
            {$project: {
                _id: 0,
                sum: 1   
            }}
        ]).toArray()
        if(orders.length){
            let sum = 0
            orders.forEach(function(order){
            sum += order.sum
        })
        resolve(sum)  
        }else{
            reject()
        }
    })
}


Order.currentOrder = function(id){
    return new Promise(async function(resolve, reject){
        let order = ordersCollection.aggregate([
            {$match: {_id: new ObjectID(id)}}
        ]).toArray()
        
        if(order){
            resolve(order)}else{

            this.errors.push('Try again later')
            reject(this.errors)} 
    })
}


Order.addCurrentOrdersAddress = async function(address, id){
    return new Promise(async(resolve, reject) =>{
        if(typeof(address.city) == "string" && typeof(address.street) == "string" && typeof(address.housenumber) == "number"){
        ordersCollection.findOneAndUpdate({_id: new ObjectID(id)}, {$set: {address}})
        resolve('success')
        }else{
        
        reject('Something is wrong. Please try again')
        }
    })
}

Order.findLatestOrders = async function(){
    return new Promise(async (resolve, reject) => {
        let latestOrders = await ordersCollection.aggregate([
            {$sort: {dateOfOrder: -1}},
            {$project: {
                client: 0
            }}
        ]).toArray()
       latestOrders =  latestOrders.map(function(order) {
            order.orderedPositions = order.orderedPositions.map(function(position){
                position = position.name
                return position
            })
            return order
        })
        latestOrders= latestOrders.splice(0, 10)
        if(latestOrders.length){
            resolve(latestOrders)
        }else{
            reject("Niestety nie ma jeszcze żadnych zamówień")
        }
    })
}

Order.realizeOrder = async function(order){
        let orderId= order._id
        await ordersCollection.findOneAndUpdate({_id: new ObjectID(orderId)}, {$set: {isRealized: true}})    
}

module.exports = Order