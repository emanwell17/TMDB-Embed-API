import { Container, getContainer } from '@cloudflare/containers';

export class EmbedApi extends Container {
  defaultPort = 8787;
  sleepAfter = '2m';
}

export default {
  fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (request.method !== 'GET' || !/^\/api\/(?:health|streams\/vixsrc\/(?:movie|series)\/\d+)$/.test(path)) {
      return new Response('Not found', { status: 404 });
    }
    return getContainer(env.EMBED_API).fetch(request);
  },
};
