const { Schema, model } = require('mongoose');

const inventarioSchema = new Schema({
    
    nombre: { type: String},
    precio: { type: Number},
    marca : { type: String},
    
})

module.exports = model('inventarios', inventarioSchema);