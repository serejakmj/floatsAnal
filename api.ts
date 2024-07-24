import { Database } from "bun:sqlite";

export const getDataFromTable = (table: string, 
  //searchParams: URLSearchParams
) => {
  const db = new Database("mydb.sqlite", { readonly: true });
  let query = `SELECT * FROM ${table}`;
  // if(searchParams.top !== undefined){ {
  //   query += 'LIMIT ' + searchParams.top;
  // }
  const data = db.query(query).all();
  return data;
}