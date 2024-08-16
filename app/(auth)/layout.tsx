import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between">
          {children}
          <div className="auth-asset">
            <div>
              <Image src='/icons/auth-image.jpeg' alt="auth-image" width={500} height={500} className="rounded-tl-lg rounded-bl-lg border-t-2 border-l-2 border-b-2 border-gray-800"/>
            </div>
          </div>
      </main>
    );
  }
  