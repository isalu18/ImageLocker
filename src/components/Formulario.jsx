import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({ guardarBusqueda }) => {

    //State del input
    const [ palabra, guardarPalabra ] = useState('');

    const [ error, guardarError ] = useState(false);

    //Al dar submit
    const buscarImagenes = e => {
        e.preventDefault();

        //Validar
        if(palabra.trim() === '') {
            guardarError(true);

            return;
        }

        guardarError(false);

        //Enviar al componente principal
        guardarBusqueda(palabra);
    }

    return ( 
        <form
            onSubmit={ buscarImagenes }
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen. Ejemplo: gatos"
                        onChange={ e => guardarPalabra(e.target.value) }
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            { error ? <Error mensaje="Agrega un termino de busqueda"/> : null }
        </form>
     );
}

Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired
}
 
export default Formulario;