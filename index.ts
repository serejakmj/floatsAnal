import { processingApiRequests } from "./api";
import { createState, runStatServe, writeStats } from "./fetchPik";

//runStatServe()
Bun.serve({
  port: 8080,
  fetch(req): Response {
    const url = new URL(req.url);
    if(url.pathname.includes("/api/v1")) {
      return processingApiRequests(url.pathname);
      
    }
    //const sp: URLSearchParams = url.searchParams;
    return new Response(Bun.file("www/index.html"));
  }
})
