// estan las acciones que van a modificar e codigo, actualizan cosas del estado global.


export const addProductsList  = (payload: any) => { //la actualización de la variable
    // addProductsList  = (payload: any) una accion que me agrega un producto a la lista de compra, 
    return  {
        action: 'ADDPRODUCT', // ADDPRODUCT = tipo de accion 
        payload, // payload la informacion que retorna.
    }
    // return me devuelve un objeto con la accion y la actualizacion.
}

export const screen  = (payload: any) => { 
    //screen  = (payload: any), funcion que me permite cambiar la pantalla cuando esta activa.
    return  {
        action: 'DASHBOARD',
        payload,
    }
}