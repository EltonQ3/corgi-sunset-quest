import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, '.asset-parts/manifest.json'), 'utf8'));
for (const item of manifest) {
  const data = Buffer.concat(await Promise.all(item.parts.map(part => readFile(resolve(root, part)))));
  if (createHash('sha256').update(data).digest('hex') !== item.sha256) {
    throw new Error('Asset checksum mismatch: ' + item.target);
  }
  const target = resolve(root, item.target);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, data);
  console.log('Restored ' + item.target + ' (' + data.length + ' bytes)');
}
