const Position = require('../models/Position')

exports.getPositions = async function(req, res){
    let positions = await Position.findPositions()
   res.send(positions)
}