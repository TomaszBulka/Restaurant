const positionsCollection = require('../db').db().collection('positions')

let Position = function(data){
    this.data = data
    this.errors  = []
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

module.exports = Position