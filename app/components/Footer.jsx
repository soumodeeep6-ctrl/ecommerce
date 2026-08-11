import Link from "next/link";

const Footer = () => (
  <footer className="bg-[#2d2924] text-[#d8d0c5] mt-16">
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="display-type text-4xl font-bold text-white">shopper<span className="text-[#e96546]">.</span></h2>
          <p className="mt-4 text-[#aaa095] leading-7 max-w-xs">Your one-stop destination for quality products at affordable prices. Shop smarter with Shopper.</p>
        </div>
        <div>
          <h3 className="eyebrow text-[#e96546] mb-5">Explore</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-[#f27d61] transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#f27d61] transition">About</Link></li>
            <li><Link href="/product" className="hover:text-[#f27d61] transition">Products</Link></li>
            <li><Link href="/contact" className="hover:text-[#f27d61] transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-[#e96546] mb-5">Say hello</h3>
          <div className="space-y-3 text-sm text-[#aaa095]"><p>Kolkata, India</p><p>+91 9876543210</p><p>support@shopper.com</p></div>
        </div>
      </div>
      <hr className="border-white/10 my-10" />
      <p className="text-[#8f867c] text-sm">© {new Date().getFullYear()} Shopper. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
