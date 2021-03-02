const bcrypt = require('bcryptjs')
let usersCollection = require('../db').db().collection('users')
const validator = require('validator')

let User = function(data){
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function(){
    
    if(typeof(this.data.username) !="string"){this.data.username = ""}
    if(typeof(this.data.firstName) !="string"){this.data.firstName = ""}
    if(typeof(this.data.lastName) !="string"){this.data.lastName = ""}
    if(typeof(this.data.email) !="string"){this.data.email = ""}
    if(typeof(this.data.password) !="string"){this.data.password = ""}
    if(this.data.address != null && typeof(this.data.address.city) !="string"){this.data.address.city = ""}
    if(this.data.address != null && typeof(this.data.address.street) !="string"){this.data.address.street = ""}
    if(this.data.address != null && typeof(this.data.address.housenumber) !="number"){this.data.address.housenumber = ""}
    

    this.data = {
        username: this.data.username.trim().toLowerCase(),
        firstName: this.data.firstName.trim(),
        lastName: this.data.lastName.trim(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password,
        address: this.data.address
    }
    
}

User.prototype.validate = function(){
    if(this.data.username == ""){this.errors.push("You must provide an username")}
    if(this.data.username !=="" && !validator.isAlphanumeric(this.data.username)){this.errors.push("Username can only contain letters and numbers")}
    if(this.data.firstName == ""){this.errors.push("You must provide your first name")}
    if(this.data.username !=="" && !validator.isAlpha(this.data.firstName, 'pl-PL', {ignore: "-",ignore: " "})){this.errors.push("Name can only contain letters, spaces and - ")}
    if(this.data.firstName == ""){this.errors.push("You must provide your last name")}
    if(this.data.username !=="" && !validator.isAlpha(this.data.lastName, 'pl-PL', {ignore: "-", ignore: " "})){this.errors.push("Name can only contain letters, spaces and - ")}
    if(this.data.email == ""){this.errors.push("You must provide an email")}
    if(this.data.email !=="" && !validator.isEmail(this.data.email)){this.errors.push("You must provide a valid email")}
    if(this.data.password == ""){this.errors.push("You must provide a password")}
    if(this.data.password.length >0 && this.data.password.length < 8){this.errors.push("Password must be at least 8 characters")}
    if(this.data.password.length > 50){this.errors.push("Password can not exceed 50 characters")}
    if(this.data.password.username >0 && this.data.password.username < 5){this.errors.push("Username must be at least 5 characters")}
    if(this.data.password.length > 20){this.errors.push("Username can not exceed 20 characters")}
    if(this.data.address.city == ""){this.errors.push("Please provide the city name")}
    if(this.data.address.street == ""){this.errors.push("Please provide the name of the street")}
    if(this.data.address.housenumber == ""){this.errors.push("Please provide your house number")}

}

User.prototype.create = function() {
    
    return new Promise( async (resolve, reject) => {
        console.log(this.data.address)
        await this.validate()
        this.cleanUp()
        if(!this.errors.length){
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync( this.data.password, salt)
            await usersCollection.insertOne(this.data)
            resolve()
        }else{
            reject(this.errors)
        }
    })
    }


    User.prototype.login = function(){
        return new Promise((resolve, reject) => {
            
            this.cleanUp()
            usersCollection.findOne({username: this.data.username}).then((attemptedUser) =>{
                if(attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)){
                    this.data = attemptedUser
                    resolve("Congrats !")
                }else{
                    reject("Invalid username/password")
                }
            }).catch(function() {
                reject("Please try again later.")
            })
        })
       
    }

    
    


module.exports = User