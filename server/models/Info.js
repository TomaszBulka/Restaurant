const infoCollection =require('../db').db().collection('info')
const validator = require('validator')

let Info = function(data){
    this.data = data
    this.errors =[]
}

Info.prototype.cleanUpDescription = function(){
    if(typeof(this.data.description) !="string"){this.data.description = ""}
   
    this.data = {
        description:  this.data.description.trim()
    }
}

Info.prototype.cleanUpContact = function(){
    console.log(typeof(this.data.phone))
    if(typeof(this.data.phone) !="number"){this.data.phone =""}
    if(typeof(this.data.email) !="string"){this.data.email=""}
    if(this.data.address != null && typeof(this.data.address) !="string"){this.data.data.address = ""}
    console.log(this.data)

    this.data = {
        phone: this.data.phone,
        email: this.data.email.trim(),
        address: this.data.address.trim()
    }
}

Info.prototype.validateDescription = function(){
    if(this.data.description ==""){this.errors.push("Twój opis jest pusty !")}
}

Info.prototype.validateContact = function(){
    if(this.data.email == ""){this.errors.push("You must provide an email")}
    if(this.data.email !=="" && !validator.isEmail(this.data.email)){this.errors.push("You must provide a valid email")}
    if(this.data.phone == ""){this.errors.push("Podaj numer telefonu")}
    if(this.data.address == ""){this.errors.push("Podaj adres kontaktu")}
}

Info.prototype.updateInfo = function(){
    
    return new Promise(async (resolve, reject) =>{
        if(this.data.description || this.data.description == ""){
            this.cleanUpDescription()
            this.validateDescription()
            
            if(!this.errors.length){
                await infoCollection.updateOne({}, {$set: {description: this.data.description}})
               resolve('Description updated')
            }else{
                reject(this.errors)
            }
            }
        else{
            this.cleanUpContact()
            this.validateContact()
            if(!this.errors.length){
                await infoCollection.updateOne({}, {$set: {phone: this.data.phone, email: this.data.email, address: this.data.address}})  
                resolve('Contact updated')
            }else{
                reject(this.errors)
            }
        }   
    })    
}

Info.getInfo = function(){
    return new Promise(async (resolve, reject) => {
       let info = await infoCollection.find().toArray()
       if(info){
           resolve(info[0])
       }else{
           reject('No info yet')
       }
    })
}

module.exports = Info