const KNOWN: Record<string, { img: string; tag: string }> = {
  jakarta: {
    img: "https://images.unsplash.com/photo-1506158669146-619067262a00?auto=format&fit=crop&w=800&q=80",
    tag: "CAPITAL & FINANCIAL HUB",
  },
  bali: {
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    tag: "CANGGU & SEMINYAK",
  },
  bandung: {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Gedung_Sate_Bandung.jpg/1280px-Gedung_Sate_Bandung.jpg",
    tag: "DAGO & HERITAGE HILLS",
  },
  surabaya: {
    img: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80",
    tag: "WEST SURABAYA & GUBENG",
  },
  jogja: {
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    tag: "HERITAGE & CREATIVE HUB",
  },
  yogyakarta: {
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    tag: "HERITAGE & CREATIVE HUB",
  },
  semarang: {
    img: "https://images.unsplash.com/photo-1584441405886-bc91be61e56a?auto=format&fit=crop&w=800&q=80",
    tag: "CENTRAL JAVA PORT CITY",
  },
  malang: {
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tag: "HIGHLAND WORKSPACE SANCTUARY",
  },
};

export const CITY_PHOTO_PLACEHOLDER =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";

export function cityTag(cityName: string): string {
  const key = cityName.trim().toLowerCase();
  return KNOWN[key]?.tag || `${cityName.trim().toUpperCase()} WORKSPACE HUB`;
}

export function knownCityImage(cityName: string): string | null {
  const key = cityName.trim().toLowerCase();
  return KNOWN[key]?.img || null;
}

/** Wikipedia/Wikimedia city landmark photo. No API key. */
export async function fetchCityLandmarkPhoto(cityName: string): Promise<string> {
  const known = knownCityImage(cityName);
  if (known) return known;

  const q = cityName.trim();
  if (!q) return CITY_PHOTO_PLACEHOLDER;

  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `${q} city Indonesia landmark`,
      gsrlimit: "1",
      prop: "pageimages",
      piprop: "thumbnail",
      pithumbsize: "800",
      format: "json",
      origin: "*",
    }).toString();

  try {
    const res = await fetch(url);
    if (!res.ok) return CITY_PHOTO_PLACEHOLDER;
    const data = await res.json();
    const pages = data?.query?.pages;
    const first = pages ? Object.values(pages)[0] as { thumbnail?: { source?: string } } : null;
    return first?.thumbnail?.source || CITY_PHOTO_PLACEHOLDER;
  } catch {
    return CITY_PHOTO_PLACEHOLDER;
  }
}
