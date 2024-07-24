import { appendFile } from "node:fs/promises";
import { Database } from "bun:sqlite";

export const fetchPikKavk = async (rooms = 1) => {
  return (await fetch(
    `https://flat.pik-service.ru/api/v1/filter/flat-by-block/1421?type=1,2&location=2,3&rooms=${rooms}&flatLimit=16&onlyFlats=1&sortBy=price&orderBy=asc&select=data`
  )
  .then((res) => {
    const a = res.json()
    return a}
  )
  .then((res) => {
    //console.log(res)
    const {count, priceMin, priceMax} = res.data.stats
    return {count, priceMin, priceMax}}
  )
.catch(()=>console.log("Some wrong")))
}

export const fetchPikAmur = async (rooms = 1) => {
  return (await fetch(
    `https://flat.pik-service.ru/api/v1/filter/flat-by-block/481?type=1,2&location=2,3&rooms=${rooms}&flatLimit=16&onlyFlats=1&sortBy=price&orderBy=asc&select=data`
  )
  .then((res) => {
    const a = res.json()
    return a}
  )
  .then((res) => {
    //console.log(res)
    const {count, priceMin, priceMax} = res.data.stats
    return {count, priceMin, priceMax}})
    .catch(()=>console.log("Some wrong ")))
}

export const fetchPikSign = async (rooms = 1) => {
  return (await fetch(
    `https://flat.pik-service.ru/api/v1/filter/flat-by-block/464?type=1,2&location=2,3&rooms=${rooms}&flatLimit=16&onlyFlats=1&sortBy=price&orderBy=asc&select=data`
  )
  .then((res) => {
    const a = res.json()
    return a}
  )
  .then((res) => {
    //console.log(res)
    if(rooms === 2)
      console.log(res.data.stats)
    const {count, priceMin, priceMax} = res.data.stats
    return {count, priceMin, priceMax}})
    .catch(()=>console.log("Some wrong ")))
}

export const createState = async () => {
  const kavk1 = await fetchPikKavk(1)
  const kavk2 = await fetchPikKavk(2)
  const kavk3 = await fetchPikKavk(3)
  const amur1 = await fetchPikAmur(1)
  const amur2 = await fetchPikAmur(2)
  const amur3 = await fetchPikAmur(3)
  const sign1 = await fetchPikSign(1)
  const sign2 = await fetchPikSign(2)
  const sign3 = await fetchPikSign(3)
  const date = new Date().toISOString().slice(0, 19);

  //let day = date.getDate();
  //let month = date.getMonth() + 1;
  //let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  //let currentDate = `${day + 1}-${month}-${year}`;
  console.log(date)
  if(!!!kavk1 || !!!kavk2 || !!!kavk3 || !!!amur1 || !!!amur2 || !!!amur3 || !!!sign1 || !!!sign2 || !!!sign3)
    return undefined
  return {
    date: date, 
    kavk: {
      oneRoom: kavk1,
      twoRooms: kavk2,
      threeRooms: kavk3
    },
    amur: {
      oneRoom: amur1,
      twoRooms: amur2,
      threeRooms: amur3
    },
    sign: {
      oneRoom: sign1,
      twoRooms: sign2,
      threeRooms: sign3
    }
  }
}

export const writeStats = async () => {
  const state = await createState();
  const db = new Database("mydb.sqlite", { create: true });
  db.query(`CREATE TABLE IF NOT EXISTS KAVK (
    date datetime,
    oneRoomCount int,
    oneRoomMin int,
    oneRoomMax int,
    twoRoomCount int,
    twoRoomMin int,
    twoRoomMax int,
    threeRoomCount int,
    threeRoomMin int,
    threeRoomMax int
  )`).run();
  db.query(`CREATE TABLE IF NOT EXISTS AMUR (
    date datetime,
    oneRoomCount int,
    oneRoomMin int,
    oneRoomMax int,
    twoRoomCount int,
    twoRoomMin int,
    twoRoomMax int,
    threeRoomCount int,
    threeRoomMin int,
    threeRoomMax int
  )`).run();
  db.query(`CREATE TABLE IF NOT EXISTS SIGN (
    date datetime,
    oneRoomCount int,
    oneRoomMin int,
    oneRoomMax int,
    twoRoomCount int,
    twoRoomMin int,
    twoRoomMax int,
    threeRoomCount int,
    threeRoomMin int,
    threeRoomMax int
  )`).run();
  if (state !== undefined) {
    db.query(`INSERT INTO KAVK (date, oneRoomCount, oneRoomMin, oneRoomMax, twoRoomCount, twoRoomMin, twoRoomMax, threeRoomCount, threeRoomMin, threeRoomMax) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`)
  .run({
    $1: state.date,
    $2: state.kavk.oneRoom.count,
    $3: state.kavk.oneRoom.priceMin,
    $4: state.kavk.oneRoom.priceMax,
    $5: state.kavk.twoRooms.count,
    $6: state.kavk.twoRooms.priceMin,
    $7: state.kavk.twoRooms.priceMax,
    $8: state.kavk.threeRooms.count,
    $9: state.kavk.threeRooms.priceMin,
    $10: state.kavk.threeRooms.priceMax
  });
  db.query(`INSERT INTO AMUR (date, oneRoomCount, oneRoomMin, oneRoomMax, twoRoomCount, twoRoomMin, twoRoomMax, threeRoomCount, threeRoomMin, threeRoomMax) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`)
  .run({
    $1: state.date,
    $2: state.amur.oneRoom.count,
    $3: state.amur.oneRoom.priceMin,
    $4: state.amur.oneRoom.priceMax,
    $5: state.amur.twoRooms.count,
    $6: state.amur.twoRooms.priceMin,
    $7: state.amur.twoRooms.priceMax,
    $8: state.amur.threeRooms.count,
    $9: state.amur.threeRooms.priceMin,
    $10: state.amur.threeRooms.priceMax
  });
  db.query(`INSERT INTO SIGN (date, oneRoomCount, oneRoomMin, oneRoomMax, twoRoomCount, twoRoomMin, twoRoomMax, threeRoomCount, threeRoomMin, threeRoomMax) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`)
  .run({
    $1: state.date,
    $2: state.sign.oneRoom.count,
    $3: state.sign.oneRoom.priceMin,
    $4: state.sign.oneRoom.priceMax,
    $5: state.sign.twoRooms.count,
    $6: state.sign.twoRooms.priceMin,
    $7: state.sign.twoRooms.priceMax,
    $8: state.sign.threeRooms.count,
    $9: state.sign.threeRooms.priceMin,
    $10: state.sign.threeRooms.priceMax
  });
  }
  
}

export const runStatServe = async () => {
  await writeStats();
  setInterval(writeStats, 33200000)
}

