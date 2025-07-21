import { serve } from "bun";
const server = serve({
  port: 3032,
  development: false,
  fetch(req) {
    return new Response("hello world", { status: 200 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);