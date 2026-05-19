import { AddProductForm } from "./add_product"
import { ProductTable } from "./product-table"

export default function ProductPage() {
    return (
        <main className="flex-1 bg-zinc-50 px-4 py-8 text-zinc-900 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                    <div className="border-b border-zinc-200 px-6 py-5">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                            Inventory
                        </p>
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                            Product Page
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">
                            Add new products and review the live product table below.
                        </p>
                    </div>

                    <div className="grid gap-6 px-6 py-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                        <AddProductForm defaultPrice={100} />
                        <ProductTable />
                    </div>
                </section>
            </div>
        </main>
    )
}