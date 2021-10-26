const { response } = require('express');
const bcrypt = require('bcryptjs');

const Medico = require('../models/Medico');

const getMedicos = async(req, res = response) => {
   const medicos = await Medico.find()
                              .populate( 'usuario', 'nombre img' )
                              .populate( 'hospital', 'nombre img' );

   res.json({
      ok: true,
      medicos
   });
 }


 const crearMedico = async(req, res = response) => {    

   const uid = req.uid;
   
   const medico = new Medico( {
      usuario: uid,
      ...req.body
   });
   
   try {              
      
      // Guardar hospital
      const medicoDB = await medico.save();

      res.json({
         ok: true,    
         medico: medicoDB         
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado. Revisar logs'
      });
   }
 }

 const actualizarMedico = async (req, res = response) => {
      res.json({
         ok: true,         
         msg: 'Modificando Medicos'
      });
 }

 const borrarMedico = async(req, res = response) => {
    res.json({
        ok: true,    
        msg: 'Eliminando Medicos'
    });
}
 module.exports = {
     getMedicos,
     crearMedico,
     actualizarMedico,
     borrarMedico
 }