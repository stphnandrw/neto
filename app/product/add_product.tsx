"use client"

import { type FormEvent, useState } from "react"
import { db } from "../_lib/db"

export function AddProductForm({ defaultPrice = 0 }: { defaultPrice?: number }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(defaultPrice)
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) {
      setStatus("Please provide a product name.")
      return
    }

    try {
      setIsSaving(true)
      const id = await db.products.add({
        name: name.trim(),
        price,
        description: description.trim(),
      })

      setStatus(`Product ${name} successfully added. Got id ${id}`)
      setName("")
      setPrice(defaultPrice)
      setDescription("")
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form
      onSubmit={addProduct}
      className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">Add Product</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Store product details in the local Dexie database.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <label className="block space-y-1 text-sm font-medium text-zinc-700">
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Healthy Salad"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 outline-none transition focus:border-zinc-400"
            required
          />
        </label>

        <label className="block space-y-1 text-sm font-medium text-zinc-700">
          <span>Price</span>
          <input
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={(ev) => setPrice(Number(ev.target.value))}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 outline-none transition focus:border-zinc-400"
            required
          />
        </label>

        <label className="block space-y-1 text-sm font-medium text-zinc-700">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Short product description"
            rows={4}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 outline-none transition focus:border-zinc-400"
          />
        </label>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Adding..." : "Add Product"}
        </button>

        {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
      </div>
    </form>
  )
}