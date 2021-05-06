const ObjectID = require('mongodb').ObjectID
const positionsCollection = require('../db').db().collection('positions')

let Position = function(data){
    this.data = data
    this.errors  = []
}

Position.prototype.cleanUp = function(){
    if(typeof(this.data.name) != "string"){ this.data.name ="" }
    if(typeof(this.data.description) != "string"){ this.data.description ="" }
    if(typeof(this.data.price) != "number"){ this.data.price = null }
}

Position.prototype.validate = function(){
    if(this.data.name == ""){this.errors.push('Dodaj nazwę pozycji')}
    if(this.data.description ==""){this.errors.push('Dodaj opis pozycji')}
    if(this.data.price == null){this.errors.push('Dodaj cenę pozycji')}
}

Position.prototype.createPosition = function(){
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        this.validate()
        if(!this.errors.length){
            await positionsCollection.insertOne(this.data)
            resolve('Pozycja dodana !')

        }else{
            reject(this.errors)
        }
        
    })

}

Position.prototype.updatePosition = function(){
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        this.validate()
        if(!this.errors.length){
            await positionsCollection.findOneAndUpdate({_id: new ObjectID(this.data._id)},
            {$set: {name: this.data.name, description: this.data.description, price: this.data.price}})
            resolve('Pozycja została zedytowana')
        }else{
            reject(this.errors)
        }
    })
}

Position.findPositions = function(){

    return new Promise(async function(resolve, reject){
        let positions = await positionsCollection.find().toArray()
        if(positions){
            resolve(positions)
        }else{
            reject()
        }
    })
}

Position.findById = function(id){
    
    return new Promise(async function(resolve, reject){
        try{
            let foundPosition = await positionsCollection.findOne({_id: new ObjectID(id)})
            resolve(foundPosition)
        }catch{
            reject()
        }
        
    })
}

Position.deletePosition = function(id){

    return new Promise(async function(resolve, reject){
        try{
            await positionsCollection.deleteOne({_id: new ObjectID(id) })
            resolve()
        }catch{
            reject()
        }
        
    })
    
}

module.exports = Position