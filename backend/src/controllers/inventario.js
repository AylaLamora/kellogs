const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let inventario  = require('../models/inventario');

router.post('/', async (req, res) => {
    let inventarioModel = new inventario ({
        nombre:req.body.nombre,     
        precio:req.body.precio,  
        marca:req.body.marca,      
    });

    
   await inventarioModel.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos del inventarioModel' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let inventarioModel =  ({
            nombre:req.body.nombre,     
            precio:req.body.precio,  
            marca:req.body.marca,      
        });

    let ID = req.params.id;
    inventario.findByIdAndUpdate(ID, {$set: inventarioModel}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar la inventarioModel: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    inventario.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el inventarioModele: `+ JSON.stringify(err, undefined, 2));}
    });
});


router.get('/', (req,res) => {
    inventario.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos de inventario' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;
