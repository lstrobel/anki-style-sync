import fs from 'fs';
import http from 'http';

async function invoke(
  action: string,
  version: number,
  params: Record<string, any>
) {
  const data = JSON.stringify({ action, version, params });
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 8765,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          const json = JSON.parse(body);
          if (json.error) reject(new Error(json.error));
          resolve(json.result);
        });
      }
    );

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  const modelName = process.argv[2];
  if (!modelName) {
    console.error('Usage: npm run watch -- <modelName>');
    process.exit(1);
  }

  try {
    const cssContent = fs.readFileSync('./dist/style.css', 'utf8');
    console.log(`Updating styling for model "${modelName}"...`);

    await invoke('updateModelStyling', 6, {
      model: {
        name: modelName,
        css: cssContent,
      },
    });
    console.log('Stylesheet updated successfully.');
  } catch (err) {
    console.error('Failed to sync style:', err);
    process.exit(1);
  }
})();
