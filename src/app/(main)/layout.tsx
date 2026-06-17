import Layout from "@/components/common/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
