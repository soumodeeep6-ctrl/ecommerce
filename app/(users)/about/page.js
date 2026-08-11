import Link from "next/link";

const values = [
  {
    title: "Quality first",
    description:
      "Every product is selected with care, clear details, and reliable value in mind.",
  },
  {
    title: "Easy shopping",
    description:
      "We keep browsing, checkout, and delivery simple so customers can shop with confidence.",
  },
  {
    title: "Fair pricing",
    description:
      "Our catalog balances trusted essentials, fresh finds, and prices that make sense.",
  },
];

const Page = () => {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-blue-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.3),transparent_32%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 ring-1 ring-white/20">
              About Shopper
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
              We make everyday shopping feel simple, smart, and reliable.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Shopper brings useful products, honest prices, and a smoother
              buying experience together in one friendly online store.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href="/product"
                className="inline-flex justify-center rounded-lg bg-orange-500 px-7 py-3 font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center rounded-lg border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-950"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
              Our story
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-950">
              Built for customers who want fewer hassles and better choices.
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-slate-600">
            <p>
              We started Shopper with a simple idea: online shopping should be
              clear, dependable, and enjoyable from the first click to the final
              delivery.
            </p>
            <p>
              Our team focuses on useful products, transparent details, and a
              support experience that helps customers feel looked after.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-11 w-11 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold">
                  {value.title.charAt(0)}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {value.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-slate-900 px-6 py-12 text-center text-white md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to find something useful?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Browse our latest products and discover practical picks for your
            home, work, style, and everyday routine.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Page;
