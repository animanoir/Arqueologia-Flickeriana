import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

const respuestaFlickr = (fotos) =>
  Promise.resolve({
    json: () => Promise.resolve({ photos: { photo: fotos } }),
  });

const fotoDeMuestra = {
  id: "1234",
  owner: "99@N00",
  secret: "abcd",
  server: "65535",
  farm: 66,
  title: "Foto de prueba",
};

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  vi.stubGlobal(
    "fetch",
    vi.fn(() => respuestaFlickr([])),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const urlDeBusqueda = () => new URL(fetch.mock.calls.at(-1)[0]);

it("renderiza con Querétaro como territorio por defecto", async () => {
  render(<App />);
  expect(screen.getByText("Territorio actual:")).toBeInTheDocument();
  expect(
    screen.getByText("Querétaro", { selector: ".texto-zona" }),
  ).toBeInTheDocument();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const params = urlDeBusqueda().searchParams;
  expect(params.get("tags")).toBe("querétaro,queretaro");
  // Sin fecha elegida no se filtra por día
  expect(params.get("min_taken_date")).toBeNull();
});

it("lee fecha y territorio desde la URL compartida", async () => {
  window.history.replaceState(null, "", "/?fecha=2010-05-01&territorio=Oaxaca");
  render(<App />);
  expect(
    screen.getByText("Oaxaca", { selector: ".texto-zona" }),
  ).toBeInTheDocument();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const params = urlDeBusqueda().searchParams;
  const inicioDelDia = new Date(2010, 4, 1).getTime() / 1000;
  expect(params.get("tags")).toBe("oaxaca");
  expect(params.get("min_taken_date")).toBe(String(inicioDelDia));
  expect(params.get("max_taken_date")).toBe(String(inicioDelDia + 86399));
});

it("ignora parámetros inválidos sin romperse", async () => {
  window.history.replaceState(
    null,
    "",
    "/?fecha=no-es-fecha&territorio=Atlantis",
  );
  render(<App />);
  expect(
    screen.getByText("Querétaro", { selector: ".texto-zona" }),
  ).toBeInTheDocument();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  expect(urlDeBusqueda().searchParams.get("min_taken_date")).toBeNull();
});

it("actualiza la URL al elegir otro territorio", async () => {
  render(<App />);
  fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
  fireEvent.click(screen.getByText("Sinaloa"));
  await waitFor(() =>
    expect(window.location.search).toContain(
      `territorio=${encodeURIComponent("Sinaloa")}`,
    ),
  );
  await waitFor(() =>
    expect(urlDeBusqueda().searchParams.get("tags")).toBe(
      "sinaloa,culiacán,culiacan",
    ),
  );
});

it("actualiza la URL al elegir una fecha en el calendario", async () => {
  render(<App />);
  // Va al mes anterior para que el día 15 nunca caiga en el futuro (maxDate)
  fireEvent.click(screen.getByText("‹"));
  fireEvent.click(screen.getByText("15"));
  const hoy = new Date();
  const esperada = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 15);
  const pad = (n) => String(n).padStart(2, "0");
  const fechaEsperada = `${esperada.getFullYear()}-${pad(esperada.getMonth() + 1)}-${pad(esperada.getDate())}`;
  await waitFor(() =>
    expect(window.location.search).toContain(`fecha=${fechaEsperada}`),
  );
});

it("muestra las fotos que regresa Flickr", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => respuestaFlickr([fotoDeMuestra])),
  );
  render(<App />);
  const imagen = await screen.findByAltText("Foto de prueba");
  expect(imagen).toHaveAttribute(
    "src",
    "https://live.staticflickr.com/65535/1234_abcd.jpg",
  );
  expect(imagen.closest("a")).toHaveAttribute(
    "href",
    "https://www.flickr.com/photos/99@N00/1234",
  );
});
