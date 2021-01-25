const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () =>{
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data,(err) =>{
        if(err){
            throw new Error('No se puedo grabar');
        }
    });
}

const cargarDB = () => {

    try {
        
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) =>{

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push( porHacer );

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) =>{

    cargarDB();
    
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion); 
    
    if( index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;

    }else{
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();
    
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);
    
    let lista = listadoPorHacer;
    listadoPorHacer = [];
    
    if(index >= 0 ){
        

        for(let i=0; i<lista.length; i++){
            if( i != index ){
                listadoPorHacer.push(lista[i]);
            }
        }

        guardarDB();
        return true;

    }else return false;



}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}