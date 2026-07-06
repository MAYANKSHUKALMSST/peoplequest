import http from 'node:http';
import server from './dist/server/server.js';

const PORT = process.env.PORT || 3000;

http.createServer(async (req, res) => {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${host}`);

    // Read request body for POST/PUT/etc.
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
    }

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        for (const val of value) {
          headers.append(key, val);
        }
      } else {
        headers.set(key, value);
      }
    }

    const webRequest = new Request(url.href, {
      method: req.method,
      headers: headers,
      body: body,
      duplex: body ? 'half' : undefined,
    });

    const webResponse = await server.fetch(webRequest);

    res.statusCode = webResponse.status;
    webResponse.headers.forEach((val, key) => {
      // In Node.js http, setHeader can take array for multiple headers (like set-cookie)
      if (key.toLowerCase() === 'set-cookie') {
        const existing = res.getHeader('set-cookie');
        if (existing) {
          const arr = Array.isArray(existing) ? existing : [existing];
          arr.push(val);
          res.setHeader('set-cookie', arr);
        } else {
          res.setHeader('set-cookie', val);
        }
      } else {
        res.setHeader(key, val);
      }
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error('Server error during request handling:', error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
