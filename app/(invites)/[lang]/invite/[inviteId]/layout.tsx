import "@/styles/style.css";


export default function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
