import sharp from "sharp";

// Per-pixel logic:
// - Near-white (background): transparent
// - Green pixels (leaf): keep original color
// - Everything else (dark strokes): invert to white
async function processLogo(inputFile, size) {
  const { data, info } = await sharp(inputFile)
    .resize(size)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

    if (r > 220 && g > 220 && b > 220) {
      // White background → transparent
      pixels[i + 3] = 0;
    } else if (g > r + 20 && g > b + 20 && g > 80) {
      // Green leaf pixels → keep as-is
    } else {
      // Dark strokes → invert to white
      pixels[i]     = 255 - r;
      pixels[i + 1] = 255 - g;
      pixels[i + 2] = 255 - b;
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).png();
}

(async () => {
  await (await processLogo("final.jpeg", 512)).toFile("logo.png");
  await (await processLogo("final.jpeg", 512)).toFile("logo-mark.png");
  await (await processLogo("final.jpeg", 180)).toFile("apple-touch-icon.png");
  await (await processLogo("final.jpeg", 32)).toFile("favicon.png");

  const logoBuffer = await (await processLogo("final.jpeg", 400)).toBuffer();
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  })
    .composite([{ input: logoBuffer, gravity: "center" }])
    .png()
    .toFile("og-image.png");

  console.log("Assets generated.");
})();
