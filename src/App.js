import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //State para tomar input de Formulario
  const [ busqueda, guardarBusqueda ] = useState('');
  
  const [ imagenes, guardarImagenes ] = useState([]);

  //Paginacion
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas ] = useState(1);

  useEffect(() => {
    
    const consultarAPI = async () => {
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '21414296-eee0c6c229777aad2a4563e71';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      
      guardarImagenes(resultado.hits);

      //Calcular el total de paginas a crear
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover imagen hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'})
    }

    consultarAPI();
  }, [busqueda, paginaactual]);

  //Definir pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //Definir pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">

      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>

        <Formulario
          guardarBusqueda={ guardarBusqueda }
        />
      </div>
      <div className="row justify-content-center ">
        <ListadoImagenes
          imagenes={ imagenes }
        />

        { (paginaactual === 1)
          ? null :
          (<button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={ paginaAnterior }
          >&laquo; Anterior</button>)
        }

        { (paginaactual === totalpaginas)
          ? null :
          (<button
            type="button"
            className="bbtn btn-info ml-1"
            onClick={ paginaSiguiente }
          >Siguiente &raquo;</button>)
        }
      </div>

    </div>
  );
}

export default App;
