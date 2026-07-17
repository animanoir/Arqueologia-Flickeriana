import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { countries } from "./territories";
import "./App.css";

const PARAM_DATE = "date";
const PARAM_COUNTRY = "country";
const PARAM_TERRITORY = "territory";
// Pre-translation param names, kept working so already-shared URLs don't break
const LEGACY_PARAM_DATE = "fecha";
const LEGACY_PARAM_TERRITORY = "territorio";
const END_OF_DAY_SECONDS = 86399;

const API_KEY =
  import.meta.env.VITE_FLICKR_API_KEY ??
  import.meta.env.REACT_APP_API_KEY ??
  "";

// "2010-05-01" → local Date; null if the text is not a valid date
function parseDate(text) {
  if (!text || !/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const [year, month, day] = text.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function findByLabel(options, label) {
  const wanted = (label ?? "").toLowerCase();
  return options.find((option) => option.label.toLowerCase() === wanted);
}

function readInitialSelection() {
  const params = new URLSearchParams(window.location.search);
  const country =
    findByLabel(countries, params.get(PARAM_COUNTRY)) ?? countries[0];
  const territory =
    findByLabel(
      country.territories,
      params.get(PARAM_TERRITORY) ?? params.get(LEGACY_PARAM_TERRITORY),
    ) ?? country.territories[0];
  return {
    date: parseDate(params.get(PARAM_DATE) ?? params.get(LEGACY_PARAM_DATE)),
    country,
    territory,
  };
}

const App = () => {
  const [date, setDate] = useState(() => readInitialSelection().date);
  const [country, setCountry] = useState(() => readInitialSelection().country);
  const [territory, setTerritory] = useState(
    () => readInitialSelection().territory,
  );
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState(null);

  // Mirror the selection into the URL so the view can be shared by copying it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (date) {
      params.set(PARAM_DATE, formatDate(date));
    } else {
      params.delete(PARAM_DATE);
    }
    params.set(PARAM_COUNTRY, country.label);
    params.set(PARAM_TERRITORY, territory.label);
    params.delete(LEGACY_PARAM_DATE);
    params.delete(LEGACY_PARAM_TERRITORY);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params}`,
    );
  }, [date, country, territory]);

  useEffect(() => {
    let cancelled = false;
    setMessage("Fetching images from Flickr's servers...");
    setPhotos([]);

    const params = new URLSearchParams({
      method: "flickr.photos.search",
      api_key: API_KEY,
      tags: territory.value,
      page: "1",
      format: "json",
      nojsoncallback: "1",
    });
    if (date) {
      const startOfDay = Math.floor(date.getTime() / 1000);
      params.set("min_taken_date", String(startOfDay));
      params.set("max_taken_date", String(startOfDay + END_OF_DAY_SECONDS));
    }

    fetch(`https://api.flickr.com/services/rest/?${params}`)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        const found = data.photos?.photo ?? [];
        if (found.length === 0) {
          setMessage(
            `No Flickr photos of ${territory.label} taken on this date were found. Try earlier times.`,
          );
        } else {
          setMessage(null);
          setPhotos(found);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMessage("Couldn't fetch photos from Flickr. Try again later.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [date, territory]);

  return (
    <div className="App">
      <div className="foreground" />
      <div className="sidebar-der blanco">
        <p style={{ marginTop: "0", fontSize: "1.3rem" }}>
          <b>
            Stories are captured at every instant — fragments of eternity meant
            to be shared. They are unique, incomparable, unrepeatable. Time and
            place combine to conjure the perfect shot.
          </b>
        </p>
        <p>
          Arqueología Flickeriana invites us to rediscover and find inspiration
          in nearly forgotten photographs hosted on Flickr, the once-popular
          platform. This piece reveals images taken on the very same day in any
          corner of the world. What was happening in the days before an
          earthquake? Which politician was showered with praise while the
          neediest cried out for food? What art was emerging while other art
          faded into oblivion? This project also encourages us to reflect on
          today's platforms, such as Instagram, whose focus prioritizes
          consumption and ad personalization, pushing the quality of content
          into the background. What if we promoted services designed to enrich
          every human experience, instead of shaping it to commercial interest?
        </p>
        <p className="autor">
          by{" "}
          <a
            style={{ color: "rgba(243, 243, 243, 0.574)" }}
            target="_blank"
            rel="noreferrer"
            href="https://www.animanoir.xyz/"
          >
            Óscar A. Montiel
          </a>{" "}
          | 2021 | Selected for exhibition at{" "}
          <a
            style={{ color: "rgba(243, 243, 243, 0.574)" }}
            href="https://cecriticc.org/tierrayterritorio/"
          >
            Encuentro de Imagen MMXXI: tierra y territorio (October 2021)
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
          locale="en-US"
          minDate={new Date(2004, 1, 10)}
          maxDate={new Date()}
          onChange={(value) => {
            if (value instanceof Date) setDate(value);
          }}
          value={date}
        />
        <div>
          <Select
            className="select-custom"
            aria-label="Country"
            options={countries}
            getOptionValue={(option) => option.label}
            placeholder="Select country"
            value={country}
            onChange={(option) => {
              setCountry(option);
              setTerritory(option.territories[0]);
            }}
          />
        </div>
        <div>
          <Select
            className="select-custom"
            aria-label="Territory"
            options={country.territories}
            placeholder="Select territory"
            value={territory}
            onChange={(option) => setTerritory(option)}
          />
        </div>
        <div>
          <p className="blanco" style={{ marginBottom: ".5rem" }}>
            Current territory:
          </p>
          <p className="texto-zona blanco">{territory.label}</p>
        </div>
      </div>
      <div className="photo-timeline blanco">
        {message}
        {photos.map((photo) => (
          <div key={photo.id} className="photo-timeline-item fade-in">
            <a
              href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="photo-timeline-img"
                alt={photo.title}
                src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
              />
            </a>
            <div className="info-foto-contenedor">
              <small className="photo-timeline-title">
                {photo.title || ""}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
