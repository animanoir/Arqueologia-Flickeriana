import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

const flickrResponse = (photos, pages = 1) =>
  Promise.resolve({
    json: () => Promise.resolve({ photos: { photo: photos, pages } }),
  });

const samplePhoto = {
  id: "1234",
  owner: "99@N00",
  secret: "abcd",
  server: "65535",
  farm: 66,
  title: "Sample photo",
};

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  vi.stubGlobal(
    "fetch",
    vi.fn(() => flickrResponse([])),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const searchUrl = () => new URL(fetch.mock.calls.at(-1)[0]);
const currentTerritory = (label) =>
  screen.getByText(label, { selector: ".texto-zona" });

it("renders with Querétaro, Mexico as the default", async () => {
  render(<App />);
  expect(screen.getByText("Current territory:")).toBeInTheDocument();
  expect(currentTerritory("Querétaro")).toBeInTheDocument();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const params = searchUrl().searchParams;
  expect(params.get("tags")).toBe(
    "querétaro,queretaro,santiagodequerétaro,santiagodequeretaro,qro",
  );
  expect(params.get("per_page")).toBe("30");
  // No day filter until a date is picked
  expect(params.get("min_taken_date")).toBeNull();
});

it("reads date, country, and territory from a shared URL", async () => {
  window.history.replaceState(
    null,
    "",
    "/?date=2010-05-01&country=Japan&territory=Kyoto",
  );
  render(<App />);
  expect(currentTerritory("Kyoto")).toBeInTheDocument();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const params = searchUrl().searchParams;
  const startOfDay = new Date(2010, 4, 1).getTime() / 1000;
  expect(params.get("tags")).toBe(
    "kyoto,kioto,京都,京都府,gion,祇園,arashiyama,嵐山,fushimiinari,伏見稲荷,kinkakuji,金閣寺",
  );
  expect(params.get("min_taken_date")).toBe(String(startOfDay));
  expect(params.get("max_taken_date")).toBe(String(startOfDay + 86399));
});

it("still understands legacy Spanish URLs (fecha/territorio)", async () => {
  window.history.replaceState(null, "", "/?fecha=2010-05-01&territorio=Oaxaca");
  render(<App />);
  expect(currentTerritory("Oaxaca")).toBeInTheDocument();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  expect(searchUrl().searchParams.get("min_taken_date")).not.toBeNull();
  // The URL gets rewritten to the new English params
  await waitFor(() => {
    expect(window.location.search).toContain("territory=Oaxaca");
    expect(window.location.search).not.toContain("territorio=");
  });
});

it("ignores invalid params without breaking", async () => {
  window.history.replaceState(
    null,
    "",
    "/?date=not-a-date&country=Atlantis&territory=Nowhere",
  );
  render(<App />);
  expect(currentTerritory("Querétaro")).toBeInTheDocument();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  expect(searchUrl().searchParams.get("min_taken_date")).toBeNull();
});

it("switching country resets the territory and updates the URL", async () => {
  render(<App />);
  fireEvent.keyDown(screen.getByRole("combobox", { name: "Country" }), {
    key: "ArrowDown",
  });
  fireEvent.click(screen.getByText("United States"));
  expect(currentTerritory("New York")).toBeInTheDocument();
  await waitFor(() => {
    expect(window.location.search).toContain("country=United+States");
    expect(window.location.search).toContain("territory=New+York");
  });
  await waitFor(() =>
    expect(searchUrl().searchParams.get("tags")).toBe(
      "newyork,newyorkcity,nyc,ny,brooklyn,manhattan,queens,bronx,harlem,statenisland,longisland",
    ),
  );
});

it("updates the URL when picking a territory", async () => {
  render(<App />);
  fireEvent.keyDown(screen.getByRole("combobox", { name: "Territory" }), {
    key: "ArrowDown",
  });
  fireEvent.click(screen.getByText("Sinaloa"));
  await waitFor(() =>
    expect(window.location.search).toContain("territory=Sinaloa"),
  );
  await waitFor(() =>
    expect(searchUrl().searchParams.get("tags")).toBe(
      "sinaloa,culiacán,culiacan,mazatlán,mazatlan,losmochis",
    ),
  );
});

it("updates the URL when picking a date in the calendar", async () => {
  render(<App />);
  // Go to the previous month so day 15 can never fall in the future (maxDate)
  fireEvent.click(screen.getByText("‹"));
  fireEvent.click(screen.getByText("15"));
  const today = new Date();
  const expected = new Date(today.getFullYear(), today.getMonth() - 1, 15);
  const pad = (n) => String(n).padStart(2, "0");
  const expectedDate = `${expected.getFullYear()}-${pad(expected.getMonth() + 1)}-${pad(expected.getDate())}`;
  await waitFor(() =>
    expect(window.location.search).toContain(`date=${expectedDate}`),
  );
});

it("shows the photos Flickr returns, lazily and responsively", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => flickrResponse([samplePhoto])),
  );
  render(<App />);
  const image = await screen.findByAltText("Sample photo");
  expect(image).toHaveAttribute(
    "src",
    "https://live.staticflickr.com/65535/1234_abcd.jpg",
  );
  expect(image).toHaveAttribute("loading", "lazy");
  expect(image).toHaveAttribute(
    "srcset",
    "https://live.staticflickr.com/65535/1234_abcd_m.jpg 240w, https://live.staticflickr.com/65535/1234_abcd.jpg 500w",
  );
  expect(image.closest("a")).toHaveAttribute(
    "href",
    "https://www.flickr.com/photos/99@N00/1234",
  );
  // A single page of results shows no pagination button
  expect(screen.queryByRole("button", { name: "Load more photos" })).toBeNull();
});

it("loads more photos on demand", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn((url) => {
      const pageNumber = new URL(url).searchParams.get("page");
      return flickrResponse(
        [
          {
            ...samplePhoto,
            id: `id-${pageNumber}`,
            title: `Photo ${pageNumber}`,
          },
        ],
        3,
      );
    }),
  );
  render(<App />);
  await screen.findByAltText("Photo 1");
  fireEvent.click(screen.getByRole("button", { name: "Load more photos" }));
  await screen.findByAltText("Photo 2");
  // Page 1 stays on screen; page 2 was appended
  expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
  expect(new URL(fetch.mock.calls.at(-1)[0]).searchParams.get("page")).toBe(
    "2",
  );
});
