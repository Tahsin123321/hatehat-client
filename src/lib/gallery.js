// Static gallery. Swap these URLs for your own photos from past events.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const GALLERY = [
  { src: u("photo-1593113598332-cd288d649433"), caption: "Winter clothes handed out in Mirpur" },
  { src: u("photo-1532629345422-7515f3d16bb6"), caption: "Lakeside cleanup crew" },
  { src: u("photo-1542601906990-b4d3fb778b09"), caption: "Planting saplings along the canal" },
  { src: u("photo-1488521787991-ed7bbaae773c"), caption: "Reading hour with children" },
  { src: u("photo-1559027615-cd4628902d4a"), caption: "Volunteers before a health camp" },
  { src: u("photo-1469571486292-0ba58a3f068b"), caption: "Packing food for flood-hit families" },
];
