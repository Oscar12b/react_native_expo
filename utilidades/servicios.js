import { fetchData } from '../utilidades/componentes';
import { ESTUDIANTES_API } from '../utilidades/constantes';

// Se añade el parámetro navigation a la función
export const controlAcceso = async (navigation) => {
    const RESPONSE = await fetchData(ESTUDIANTES_API, 'getUser');

    // Control de acceso de las pantallas
    if (RESPONSE.status) {
        if (RESPONSE.session) {
            navigation.navigate('Main');
        } else {
            navigation.navigate('Login');
        }
    } else {
        navigation.navigate('Login');
    }
}

// CONTROL PARA SALIR DE LA SESSION 
export const cerrarSesion = async (navigation) => {
    const RESPONSE = await fetchData(ESTUDIANTES_API, 'logOut');

    if (RESPONSE.status === 1) {
        navigation.navigate('Login');
    } else {
        console.error('Error al cerrar sesión');
    }
}
