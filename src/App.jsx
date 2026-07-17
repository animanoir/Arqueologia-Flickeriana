import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import "./App.css";

const opcionesZonas = [
  { value: "querétaro,queretaro", label: "Querétaro" },
  { value: "ciudaddeméxico,iztapalapa", label: "Ciudad de México" },
  { value: "aguascalientes", label: "Aguascalientes" },
  { value: "bajacalifornia", label: "Baja California" },
  { value: "campeche", label: "Campeche" },
  { value: "chiapas", label: "Chiapas" },
  { value: "Saltillo", label: "Saltillo" },
  { value: "Colima,manzanillo", label: "Colima" },
  { value: "Durango", label: "Durango" },
  { value: "Guanajuato", label: "Guanajuato" },
  { value: "Guerrero", label: "Guerrero" },
  { value: "Hidalgo", label: "Hidalgo" },
  { value: "Jalisco,Guadalajara", label: "Guadalajara" },
  { value: "estadodemexico,ecatepec,tolucadelerdo", label: "Estado De México" },
  { value: "michoacán,michoacan,morelia", label: "Michoacán" },
  { value: "morelos,cuernavaca", label: "Morelos" },
  { value: "nayarit,tepic", label: "Nayarit" },
  { value: "monterrey,nuevoleon", label: "Monterrey" },
  { value: "oaxaca", label: "Oaxaca" },
  { value: "puebla,puebladezaragoza", label: "Puebla" },
  { value: "quintanaroo,chetumal,cancún,cancun", label: "Quintana Roo" },
  { value: "sanluispotosi,sanluispotosí", label: "San Luis Potosí" },
  { value: "sinaloa,culiacán,culiacan", label: "Sinaloa" },
  { value: "sonora,hermosillo", label: "Sonora" },
  { value: "tabasco,villahermosa", label: "Tabasco" },
  { value: "tamaulipas,ciudadvictoria,reynosa", label: "Tamaulipas" },
  {
    value: "tlaxcala,tlaxcaladexicohténcatl,xicohténcatl,xicotencatl",
    label: "Tlaxcala",
  },
  { value: "veracruz", label: "Veracruz" },
  { value: "yucatán,yucatan,mérida,merida", label: "Yucatán" },
  { value: "zacatecas", label: "Zacatecas" },
];

const PARAM_FECHA = "fecha";
const PARAM_TERRITORIO = "territorio";
const SEGUNDOS_DE_UN_DIA = 86399;

const API_KEY =
  import.meta.env.VITE_FLICKR_API_KEY ??
  import.meta.env.REACT_APP_API_KEY ??
  "";

// "2010-05-01" → Date local; null si el texto no es una fecha válida
function parseFecha(texto) {
  if (!texto || !/^\d{4}-\d{2}-\d{2}$/.test(texto)) return null;
  const [año, mes, día] = texto.split("-").map(Number);
  const fecha = new Date(año, mes - 1, día);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function formatFecha(fecha) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())}`;
}

function leerSeleccionInicial() {
  const params = new URLSearchParams(window.location.search);
  const territorio = (params.get(PARAM_TERRITORIO) ?? "").toLowerCase();
  return {
    fecha: parseFecha(params.get(PARAM_FECHA)),
    zona:
      opcionesZonas.find((o) => o.label.toLowerCase() === territorio) ??
      opcionesZonas[0],
  };
}

const App = () => {
  const [fecha, setFecha] = useState(() => leerSeleccionInicial().fecha);
  const [zona, setZona] = useState(() => leerSeleccionInicial().zona);
  const [fotos, setFotos] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  // Refleja la selección en la URL para que la vista se pueda compartir con solo copiarla
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (fecha) {
      params.set(PARAM_FECHA, formatFecha(fecha));
    } else {
      params.delete(PARAM_FECHA);
    }
    params.set(PARAM_TERRITORIO, zona.label);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params}`,
    );
  }, [fecha, zona]);

  useEffect(() => {
    let cancelado = false;
    setMensaje("Obteniendo imágenes desde los servidores de Flickr...");
    setFotos([]);

    const params = new URLSearchParams({
      method: "flickr.photos.search",
      api_key: API_KEY,
      tags: zona.value,
      page: "1",
      format: "json",
      nojsoncallback: "1",
    });
    if (fecha) {
      const inicioDelDia = Math.floor(fecha.getTime() / 1000);
      params.set("min_taken_date", String(inicioDelDia));
      params.set("max_taken_date", String(inicioDelDia + SEGUNDOS_DE_UN_DIA));
    }

    fetch(`https://api.flickr.com/services/rest/?${params}`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        if (cancelado) return;
        const encontradas = datos.photos?.photo ?? [];
        if (encontradas.length === 0) {
          setMensaje(
            `No se encontraron fotos en Flickr de ${zona.label} tomadas en esta fecha. Intenta con tiempos anteriores.`,
          );
        } else {
          setMensaje(null);
          setFotos(encontradas);
        }
      })
      .catch(() => {
        if (!cancelado) {
          setMensaje(
            "No se pudieron obtener las fotos desde Flickr. Intenta de nuevo más tarde.",
          );
        }
      });

    return () => {
      cancelado = true;
    };
  }, [fecha, zona]);

  return (
    <div className="App">
      <div className="foreground" />
      <div className="sidebar-der blanco">
        <p style={{ marginTop: "0", fontSize: "1.3rem" }}>
          <b>
            Historias se capturan a cada instante, fragmentos de eternidad
            destinados a ser compartidos. Son únicas, inigualables,
            irrepetibles. Tiempo y lugar se combinan para conjurar la toma
            perfecta.
          </b>
        </p>
        <p>
          Arqueología Flickeriana nos invita a redescubrir y encontrar
          inspiración en fotografías casi olvidadas, alojadas en la otrora
          popular plataforma de Flickr. A través de esta propuesta, se revelan
          imágenes tomadas en un mismo día en cualquier rincón de México. ¿Qué
          sucedía en los días previos a un sismo? ¿Qué político recibía
          alabanzas mientras los más necesitados clamaban por alimento? ¿Qué
          arte emergía mientras otro quedaba en el olvido? Este proyecto también
          nos anima a reflexionar sobre las plataformas actuales, como
          Instagram, cuyo enfoque prioriza el consumo y la personalización de
          publicidad, relegando la calidad del contenido a un segundo plano. ¿Y
          si promovemos servicios diseñados para enriquecer cada experiencia
          humana, en lugar de moldearlas al interés comercial?
        </p>
        <p className="autor">
          por{" "}
          <a
            style={{ color: "rgba(243, 243, 243, 0.574)" }}
            target="_blank"
            rel="noreferrer"
            href="https://www.animanoir.xyz/"
          >
            Óscar A. Montiel
          </a>{" "}
          | 2021 | Seleccionado para exhibición en{" "}
          <a
            style={{ color: "rgba(243, 243, 243, 0.574)" }}
            href="https://cecriticc.org/tierrayterritorio/"
          >
            Encuentro de Imagen MMXXI: tierra y territorio (Octubre 2021)
          </a>
        </p>
        <img
          id="edm-logo"
          src="./encuentro-header-logo.png"
          alt="Encuentro de Imagen MMXXI Tierra y Territorio UAQ"
        />
      </div>
      <div className="sidebar-izq">
        <Calendar
          className="calendario"
          locale="es-MX"
          minDate={new Date(2004, 1, 10)}
          maxDate={new Date()}
          onChange={(valor) => {
            if (valor instanceof Date) setFecha(valor);
          }}
          value={fecha}
        />
        <div>
          <Select
            className="select-custom"
            options={opcionesZonas}
            placeholder="Seleccionar territorio"
            value={zona}
            onChange={(opcion) => setZona(opcion)}
          />
        </div>
        <div>
          <p className="blanco" style={{ marginBottom: ".5rem" }}>
            Territorio actual:
          </p>
          <p className="texto-zona blanco">{zona.label}</p>
        </div>
      </div>
      <div className="photo-timeline blanco">
        {mensaje}
        {fotos.map((foto) => (
          <div key={foto.id} className="photo-timeline-item fade-in">
            <a
              href={`https://www.flickr.com/photos/${foto.owner}/${foto.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="photo-timeline-img"
                alt={foto.title}
                src={`https://live.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}.jpg`}
              />
            </a>
            <div className="info-foto-contenedor">
              <small className="photo-timeline-title">{foto.title || ""}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
