import React from "react";

const contactCards = [
  {
    title: "Email support",
    detail: "contact@ourstore.com",
    note: "We usually reply within one business day.",
  },
  {
    title: "Call us",
    detail: "+1 (555) 013-4529",
    note: "Monday to Friday, 9:00 AM to 6:00 PM.",
  },
  {
    title: "Visit our store",
    detail: "24 Market Street, New York, NY",
    note: "Pickup, returns, and product help are available.",
  },
];

const Page = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Form submitted!");
  };
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Contact NextShop
          </p>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
            Need help with an order or product?
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Send us a message and our team will help with product questions,
            order updates, returns, or anything else you need.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-2 text-base font-semibold text-emerald-700">
                  {card.detail}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {card.note}
                </p>
              </div>
            ))}
          </div>

          <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Full name
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Email address
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-700">
                Subject
              </span>
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-700">
                Message
              </span>
              <textarea
                name="message"
                rows="6"
                placeholder="Tell us a little more about your question."
                className="mt-2 w-full resize-none rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-emerald-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:w-auto"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Page;
