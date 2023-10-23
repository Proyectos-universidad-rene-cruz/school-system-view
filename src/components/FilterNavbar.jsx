import axios from "axios";
import { useEffect, useState } from "react";

const FilterNavbar = () => {
    //? data
    const [calificaciones, setCalificaciones] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [tipo_examenes, setTipo_examenes] = useState([]);
    const [profesor_filtro, setProfesor_filtro] = useState(
      "Todos los profesores"
    );
    const [periodo_filtro, setPeriodo_filtro] = useState("Todos los periodos");
    const [materia_filtro, setMateria_filtro] = useState("Todas las materias");
    const [tipo_examen_filtro, setTipo_examen_filtro] = useState(
      "Todos los tipo de examen"
    );
    const [url_calificacion, set_url_calificacion] = useState(generatePath(profesor_filtro, periodo_filtro, materia_filtro, tipo_examen_filtro));
  
 
  function generatePath(profesor, periodo, materia, tipo_examen) {
    let nombre = "";
    let apellido_paterno = "";
    let apellido_materno = "";
    if (profesor !== "Todos los profesores") {
      const nombre_completo = profesor.split(" ");
      nombre = nombre_completo[0];
      apellido_paterno = nombre_completo[1];
      apellido_materno = nombre_completo[2];
    } 
    if (periodo === "Todos los periodos") {
      periodo = "";
    } 
    if (materia === "Todas las materias") {
      materia = "";
    }

    if (tipo_examen === "Todos los tipo de examen") {
      tipo_examen = "";
    } 
    console.log(
      `http://localhost:8080/alumno?profesor_nombre=${nombre}?profesor_apellido_paterno=${apellido_paterno}?profesor_apellido_materno=${apellido_materno}?periodo=${periodo}?materia=${materia}?tipo_examen=${tipo_examen}`
    );
    // load_calificaciones();
    return `http://localhost:8080/alumno?profesor_nombre=${nombre}?profesor_apellido_paterno=${apellido_paterno}?profesor_apellido_materno=${apellido_materno}?periodo=${periodo}?materia=${materia}?tipo_examen=${tipo_examen}`;
  }

  function SelectedFilter() {
    console.log(profesor_filtro);
    console.log(periodo_filtro);
    console.log(materia_filtro);
    console.log(tipo_examen_filtro);
    set_url_calificacion(generatePath(
      profesor_filtro,
      periodo_filtro,
      materia_filtro,
      tipo_examen_filtro
    ));

  }


  //? load profesores
  useEffect(() => {
    load_profesores();
    load_materias();
    load_periodos();
    load_tipo_examenes();
    load_calificaciones();
  }, []);

  //? API GET connection
  const load_profesores = async () => {
    const result = await axios.get("http://localhost:8080/profesor");
    setProfesores(result.data);
  };
  const load_periodos = async () => {
    const result = await axios.get("http://localhost:8080/periodo");
    setPeriodos(result.data);
  };

  const load_materias = async () => {
    const result = await axios.get("http://localhost:8080/materia");
    setMaterias(result.data);
  };

  const load_tipo_examenes = async () => {
    const result = await axios.get("http://localhost:8080/tipo-examen");
    setTipo_examenes(result.data);
  };

  const load_calificaciones = async () => {
    const result = await axios.get(
      // generatePath(
      //   profesor_filtro,
      //   periodo_filtro,
      //   materia_filtro,
      //   tipo_examen_filtro
      // )
      url_calificacion
    );
    setCalificaciones(result.data);
  };

  let onProfesorValue = () => {
    setProfesor_filtro(event.target.value);
  };

  let onPeriodoValue = () => {
    setPeriodo_filtro(event.target.value);
  };
  let onMateriaValue = () => {
    setMateria_filtro(event.target.value);
  };
  let onTipoExamenValue = () => {
    setTipo_examen_filtro(event.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Califificación Alumnos
          </a>
          <div className="filter-profesor">
            <select name="profesor" onChange={onProfesorValue}>
              <option value="Todos los profesores">Todos los profesores</option>
              {profesores.map((profesor, index) => (
                <option
                  key={index}
                  value={`${profesor.nombre} ${profesor.apellido_paterno} ${profesor.apellido_materno}`}
                >{`${profesor.nombre} ${profesor.apellido_paterno} ${profesor.apellido_materno}`}</option>
              ))}
            </select>
          </div>

          <div className="filter-periodo">
            <select name="periodo" onChange={onPeriodoValue}>
              <option value="all">Todos los periodos</option>
              {periodos.map((periodo, index) => (
                <option key={index} value={periodo.descripcion}>
                  {periodo.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-materia">
            <select name="materia" onChange={onMateriaValue}>
              <option value="all">Todas las materias</option>
              {materias.map((materia, index) => (
                <option key={index} value={materia.nombre}>
                  {materia.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-tipo-examen">
            <select name="tipo_examen" onChange={onTipoExamenValue}>
              <option value="all">Todos los tipo de examen</option>
              {tipo_examenes.map((tipo_examen, index) => (
                <option key={index} value={tipo_examen.descripcion}>
                  {tipo_examen.descripcion}
                </option>
              ))}
            </select>
          </div>

          <form className="d-flex" role="search">
            <button
              className="btn btn-outline-success"
              onClick={SelectedFilter}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>alumno</th>
            <th>Profesor</th>
            <th>Materia</th>
            <th>Periodo</th>
            <th>Tipo examen</th>
            <th>Calificacion</th>
          </tr>
        </thead>
        <tbody>
          {calificaciones.map((calificacion, index) => (
            <tr key={index}>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{`${calificacion.alumno_nombre} ${calificacion.alumno_apellido_paterno} ${calificacion.alumno_apellido_materno}`}</td>
              <td>{`${calificacion.profesor_nombre} ${calificacion.profesor_apellido_paterno} ${calificacion.profesor_apellido_materno}`}</td>
              <td>{calificacion.materia}</td>
              <td>{calificacion.periodo}</td>
              <td>{calificacion.tipo_examen}</td>
              <td>{calificacion.calificacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FilterNavbar;
