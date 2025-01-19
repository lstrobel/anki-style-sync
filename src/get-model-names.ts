import http from 'http';

console.log('Fetching Anki model names...');

async function invoke(
  action: string,
  version: number,
  params: Record<string, any> = {}
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
          if (json.error) {
            reject(new Error(json.error));
          }
          resolve(json.result);
        });
      }
    );

    req.on('error', (err) => {
      reject(err);
    });
    req.write(data);
    req.end();
  });
}

(async () => {
  try {
    const models = await invoke('modelNames', 6);
    console.log('\nAvailable models:');
    console.log('─'.repeat(16));
    (models as string[]).forEach((model) => console.log(`• ${model}`));
  } catch (err) {
    console.error('Error: Failed to connect to Anki. Is it running?');
    process.exit(1);
  }
})();
