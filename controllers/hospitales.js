const { response } = require('express');
const bcrypt = require('bcryptjs');

const Hospital = require('../models/Hospital');

const getHospitales = async(req, res = response) => {

   const hospitales = await Hospital.find()
                                    .populate( 'usuario', 'nombre img' );

   res.json({
      ok: true,
      hospitales
   });
 }


 const crearHospital = async(req, res = response) => {    
      const uid = req.uid;
      
      const hospital = new Hospital( {
         usuario: uid,
         ...req.body
      });
      
      try {              
         
         // Guardar hospital
         const hospitalDB = await hospital.save();

         res.json({
            ok: true,    
            hospital: hospitalDB
         });

      } catch (error) {
         console.log(error);
         res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs'
         });
      }
 }

 const actualizarHospital = async (req, res = response) => {
      res.json({
         ok: true,         
         msg: 'Modificando hospitales'
      });
 }

 const borrarHospital = async(req, res = response) => {
    res.json({
        ok: true,    
        msg: 'Eliminando hospitales'
    });
}
 module.exports = {
     getHospitales,
     crearHospital,
     actualizarHospital,
     borrarHospital
 }