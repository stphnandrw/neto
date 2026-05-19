import { Dexie, type EntityTable } from "dexie"

interface Product {
  id?: number
  name: string
  price: number
  description: string
}

const db = new Dexie("neto_db") as Dexie  & {
  products: EntityTable<
  Product,
  "id"
  >
}

db.version(1).stores({
  products: "++id, name, price, description",
})


export type { Product }
export {db}