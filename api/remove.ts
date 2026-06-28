declare const process: { env: { REMOVE_BG_API_KEY?: string } };
declare const Buffer: any;

export const config = {
  runtime: 'nodejs',
};

const REMOVE_BG_ENDPOINT = 'https://api.remove.bg/v1.0/removebg';

function readBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk.toString('utf8');
      if (body.length > 16 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Request body is too large.'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'REMOVE_BG_API_KEY is not configured.' });
  }

  try {
    const rawBody = typeof req.body === 'string' ? req.body : req.body ? JSON.stringify(req.body) : await readBody(req);
    const { image } = JSON.parse(rawBody || '{}');

    if (typeof image !== 'string' || !image.startsWith('data:image/')) {
      return res.status(400).json({ error: 'A base64 image data URL is required.' });
    }

    const base64Image = image.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');
    const formData = new FormData();
    formData.append('image_file_b64', base64Image);
    formData.append('size', 'auto');
    formData.append('format', 'png');

    const startedAt = Date.now();
    const response = await fetch(REMOVE_BG_ENDPOINT, {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey },
      body: formData,
    });

    if (!response.ok) {
      const message = await response.text();
      return res.status(response.status).json({ error: message || 'Background removal failed.' });
    }

    const result = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Processing-Time', ((Date.now() - startedAt) / 1000).toFixed(2));
    return res.status(200).send(result);
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Background removal failed.' });
  }
}
