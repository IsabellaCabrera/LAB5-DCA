// Este lo que hace es tener el estado global y maneja las actualizaciones del estadoglobal, osea los cambios que le hace y como se hacen.
// importo el reducer y el storage porque:
import { reducer } from './reducer'  // porque cuando disparo una accion se la envio al reducer
import Storage from '../utils/storage'; // mira la acccion y mira como cmabiar el estado global y le dice al reducer como cambiar esta accion.


// Función para cargar el estado desde el localStorage al iniciar
const loadStateFromStorage = () => {
    const storedState = Storage.get('STORE', 'DASHBOARD'); // Intenta obtener el estado guardado
    if (storedState) {
        return storedState;  // Si existe un estado guardado, retorna ese estado
    } else {
        return {
            screen: 'DASHBOARD',
            shoppingList: [],
        };  // Si no hay nada guardado, retorna el estado inicial
    }
};

// Inicializa el estado global cargando desde el localStorage si existe
export let appState = loadStateFromStorage();

const persistStore = (state: any) => { 

	Storage.set('STORE', state); 
};

export const dispatch = (action: any) => { 
// El dispatch lo que hace es es lanzar una accion para actulizar el estado.
// me clona el estado global del appstate y me lo pasa como parametro al reducer.
    
    const clone = JSON.parse(JSON.stringify(appState)); //clona el estado actual

    appState = reducer(action, clone); // pasa el clon y la accion al reducer como parametro para crear el nuevo estado.

    persistStore(appState); // Guarda el nuevo estadoo en localstorage

    observers.forEach((o) => o.render()); // le dice a los observadores que se actualizen.
};


let observers: any[] = [] 
// agrego componentes que deban cambiar el estado global, cuando el estDO cambia se hacen los cambios y depsues se cambian.
export const addObserver = (ref: any) =>  {
    observers = [...observers, ref];
};