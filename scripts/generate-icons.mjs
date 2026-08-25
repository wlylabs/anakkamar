/**
 * Generates the raster icons the SVG conventions can't cover: the iOS
 * home-screen icon (needs PNG) and favicon.ico (fetched directly by
 * scrapers that never look at <link rel="icon">). Same "AK" stamp mark
 * as components/logo.tsx and app/icon.svg — an ink square with an accent
 * card peeking out behind it — rasterised from signed distance fields so
 * no image toolchain is needed.
 *
 *   node scripts/generate-icons.mjs
 */

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP_DIR = join(ROOT, "app");

const INK = [0x20, 0x1a, 0x12];
const ACCENT = [0xff, 0x5a, 0x36];
const CANVAS = [0xf6, 0xf0, 0xe2];

function sdRoundedRect(px, py, cx, cy, halfW, halfH, r) {
  const qx = Math.abs(px - cx) - halfW + r;
  const qy = Math.abs(py - cy) - halfH + r;
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  return Math.min(Math.max(qx, qy), 0) + outside - r;
}

/** Matches the 32-unit rects in components/logo.tsx. */
const GLYPH_SHAPES = [
  { sdf: (x, y) => sdRoundedRect(x, y, 18, 18, 12, 12, 5), color: ACCENT },
  { sdf: (x, y) => sdRoundedRect(x, y, 14, 14, 12, 12, 5), color: INK },
  { sdf: (x, y) => sdRoundedRect(x, y, 11, 15, 3, 7, 1), color: CANVAS },
  { sdf: (x, y) => sdRoundedRect(x, y, 19.5, 10.5, 2.5, 2.5, 1), color: CANVAS },
  { sdf: (x, y) => sdRoundedRect(x, y, 19.5, 19, 2.5, 3, 1), color: CANVAS },
];

function coverage(distance) {
  return Math.min(Math.max(0.5 - distance, 0), 1);
}

function overlay(base, ink, alpha) {
  return Math.round(base * (1 - alpha) + ink * alpha);
}

function render(size, { cornerRadius, glyphScale }) {
  const pixels = Buffer.alloc(size * size * 4);
  const unit = (size * glyphScale) / 32;
  const origin = (size - size * glyphScale) / 2;
  const radiusPx = cornerRadius * size;
  const half = size / 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const px = x + 0.5;
      const py = y + 0.5;
      const backdrop = coverage(sdRoundedRect(px, py, half, half, half, half, radiusPx));
      const lx = (px - origin) / unit;
      const ly = (py - origin) / unit;

      let r = INK[0];
      let g = INK[1];
      let b = INK[2];
      for (const shape of GLYPH_SHAPES) {
        const cov = coverage(shape.sdf(lx, ly) * unit);
        if (cov <= 0) continue;
        r = overlay(r, shape.color[0], cov);
        g = overlay(g, shape.color[1], cov);
        b = overlay(b, shape.color[2], cov);
      }

      const offset = (y * size + x) * 4;
      pixels[offset] = r;
      pixels[offset + 1] = g;
      pixels[offset + 2] = b;
      pixels[offset + 3] = Math.round(backdrop * 255);
    }
  }
  return pixels;
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng(size, pixels) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  const stride = size * 4;
  const raw = Buffer.alloc(size * (stride + 1));
  for (let y = 0; y < size; y += 1) {
    raw[y * (stride + 1)] = 0;
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

mkdirSync(APP_DIR, { recursive: true });

const applePng = encodePng(180, render(180, { cornerRadius: 0.22, glyphScale: 1.3 }));
writeFileSync(join(APP_DIR, "apple-icon.png"), applePng);
process.stdout.write(`apple-icon.png  180×180  ${(applePng.length / 1024).toFixed(1)} kB\n`);

function encodeIco(frames) {
  const dir = Buffer.alloc(6 + frames.length * 16);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(frames.length, 4);

  let offset = dir.length;
  const images = [];
  frames.forEach(({ size, png }, i) => {
    const entry = 6 + i * 16;
    dir[entry] = size >= 256 ? 0 : size;
    dir[entry + 1] = size >= 256 ? 0 : size;
    dir[entry + 2] = 0;
    dir[entry + 3] = 0;
    dir.writeUInt16LE(1, entry + 4);
    dir.writeUInt16LE(32, entry + 6);
    dir.writeUInt32LE(png.length, entry + 8);
    dir.writeUInt32LE(offset, entry + 12);
    offset += png.length;
    images.push(png);
  });

  return Buffer.concat([dir, ...images]);
}

const FAVICON_SIZES = [16, 32, 48];
const faviconFrames = FAVICON_SIZES.map((size) => ({
  size,
  png: encodePng(size, render(size, { cornerRadius: 0.19, glyphScale: 1 })),
}));
const ico = encodeIco(faviconFrames);
writeFileSync(join(APP_DIR, "favicon.ico"), ico);
process.stdout.write(`favicon.ico  ${FAVICON_SIZES.join("/")}  ${(ico.length / 1024).toFixed(1)} kB\n`);
