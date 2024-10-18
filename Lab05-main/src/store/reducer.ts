// El reducer lo que hace es esuchar la acccion y hace que el estado global cambie teniendo encuenta lo que le dijo.

export const reducer = (currentAction: any, currentState: any) => { 
    //reducer = (currentAction: any, currentState: any), recibe dos parametros, currectAction que es la accion que se quiere hacer,
    //current state es el estado actual, que es una copia acutal del Appstate.

    const {action, payload} = currentAction; 
    //payload es para la nueva acción que se va a lanzar, la actualización. action es el nombre de la accion ""

    switch (action) { // el switch lo usamos para validar la accion que recibio.

        case 'ADDPRODUCT': // aca la accion es añadir un producto si se le da esta lo agregra
            return  {
                ...currentState, // mantiene el estado global o esa copia que se hizo. Desgloza cada propiedad 
                shoppingList: [...currentState.shoppingList, payload] // solo agrega el producto a la shoppingList.
            };
    
        case 'DASHBOARD': //actualizamos la screen.
            return {
                ...currentState, 
                screen: payload
            }
        default:
            return currentState; //retorna el appState como está, en caso tal de que no entre en ninguno de los casos.
    }
}