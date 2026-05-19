"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db, type Product } from "../_lib/db"

type ProductRecord = Product & { id: number }

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
})

function ProductRow({ product }: { product: ProductRecord }) {
  return (
    <tr className="border-t border-zinc-200 align-top">
      <td className="px-4 py-4 text-sm font-medium text-zinc-950">{product.id}</td>
      <td className="px-4 py-4 text-sm text-zinc-700">{product.name}</td>
      <td className="px-4 py-4 text-sm text-zinc-700">
        {product.description || "No description provided."}
      </td>
      <td className="px-4 py-4 text-sm font-semibold text-zinc-950">
        {currencyFormatter.format(product.price)}
      </td>
    </tr>
  )
}

function ProductCard({ product }: { product: ProductRecord }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Product #{product.id}
          </p>
          <h3 className="mt-2 text-base font-semibold text-zinc-950">{product.name}</h3>
        </div>
        <p className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-medium text-white">
          {currencyFormatter.format(product.price)}
        </p>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-600">
        {product.description || "No description provided."}
      </p>
    </article>
  )
}

export function ProductTable() {
  const products = useLiveQuery(
    () => db.products.orderBy("id").toArray(),
    [],
  ) as ProductRecord[] | undefined

  const items = products ?? []

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Product Table</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Live product records from IndexedDB.
            </p>
          </div>

          <div className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
            {items.length} items
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-sm text-zinc-600">
          No products yet. Add one using the form to the left.
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((product) => (
                    <ProductRow key={product.id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 p-4 md:hidden">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}