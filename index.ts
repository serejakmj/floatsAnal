import { getDataFromTable } from "./api";
import { createState, runStatServe, writeStats } from "./fetchPik";

runStatServe()
Bun.serve({
  port: 8080,
  //hostname: "hatyhaty.com", 
  fetch(req) {
    const url = new URL(req.url);
    //const sp: URLSearchParams = url.searchParams;
    if (url.pathname === "/kavk") {
      return new Response(JSON.stringify(getDataFromTable("KAVK")));
    }
    if (url.pathname === "/amur") {
      return new Response(JSON.stringify(getDataFromTable("AMUR")));
    }
    if (url.pathname === "/sign") {
      return new Response(JSON.stringify(getDataFromTable("SIGN")));
    }
    return new Response(Bun.file("www/index.html"));
  }
})
