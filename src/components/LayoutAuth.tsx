import { Footer } from '@/components/Footer'

export function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
