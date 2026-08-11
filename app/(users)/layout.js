import UserChrome from "@/app/components/UserChrome";

export const metadata = {
  title: "Shopper",
  description: "Online Shopping Website",
};

export default function UserLayout({ children }) {
  return (
    <UserChrome>{children}</UserChrome>
  );
}
