import Dexie from "dexie";

export const db = new Dexie("miniInstaDB");

db.version(1).stores({
  bio: ",name, about",
  gallery: "++id, url",
});
