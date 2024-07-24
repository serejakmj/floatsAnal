import { Database } from "bun:sqlite";

export const processingApiRequests = (pathname: string) : Response => {
  if (pathname === "/api/v1/kavk") {
    return new Response(JSON.stringify(getDataFromTable("KAVK")));
  }
  if (pathname === "/api/v1/amur") {
    return new Response(JSON.stringify(getDataFromTable("AMUR")));
  }
  if (pathname === "/api/v1/sign") {
    return new Response(JSON.stringify(getDataFromTable("SIGN")));
  }
  return new Response("Not found", { status: 404 });
}

export const getDataFromTable = (table: string, 
  //searchParams: URLSearchParams
) => {
  const db = new Database("mydb.sqlite", { readonly: true });
  let query = `SELECT * FROM ${table}`;
  const data = db.query(query).all();
  return data;
}