const { json } = require('express')

const opinionsCollection = require('../db').db().collection("opinions")

let Opinion = function(data){
    this.data = data
    this.errors = []
}

Opinion.prototype.cleanUp = function(){
    if(typeof(this.data.content) !="string"){this.data.content = ""}

    this.data = {
        content:  this.data.content.trim()
    }
}

Opinion.prototype.validate = function(){
    if(this.data.content ==""){this.errors.push("Twoja opinia jest pusta !")}
}

Opinion.prototype.create = function() {
return new Promise((resolve, reject) => {
    this.cleanUp()
    this.validate()
    if(!this.errors.length){
        opinionsCollection.insertOne(this.data).then(() => {
            resolve()
        }).catch(() => {
            this.errors.push("Please try again later.")
            reject(this.errors)
        })
    }else{
        reject(this.errors)
    }
})
    
}

Opinion.findOpinions = function(){
    
   return new Promise(async function(resolve, reject){
       let opinions = await opinionsCollection.find().toArray()
       if(opinions){
           resolve(opinions)
       }else{
           reject()
       }
   })
   
}

module.exports = Opinion