const PALETTE = ['0a3d78', '155ba6', '128807', '0d6605', 'cc7a29', '062a54'];

function svgDataUri(fromHex, toHex) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#${fromHex}"/><stop offset="1" stop-color="#${toHex}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><path d="M170 110h60v40h40v20h-40v40h-60v-40h-40v-20h40z" fill="white" opacity="0.18"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Deterministic two-tone gradient placeholder image (data URI) for the i-th item in a list,
 *  used where the original site has no real photo asset. `offset` staggers the palette
 *  start index between different sections so adjacent cards don't repeat the same pair. */
export function placeholderImageFor(i, offset = 0) {
  const from = PALETTE[(i + offset) % PALETTE.length];
  const to = PALETTE[(i + offset + 2) % PALETTE.length];
  return svgDataUri(from, to);
}
