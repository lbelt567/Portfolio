import Image from "next/image"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import BentoGrid from "@/components/home/BentoGrid"
import ChatWidget from "@/components/chat/ChatWidget"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        {/* Hero headline */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            {/* Left: text */}
            <div className="flex-1">
              <p className="text-[11px] font-mono text-amber uppercase tracking-widest mb-4">
                Luis Beltran Jr.
              </p>
              <h1 className="font-display font-bold text-5xl md:text-7xl text-foreground leading-tight mb-4">
                AI Engineer.
                <br />
                <span className="text-muted-foreground">Builder.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                M.S. AI at USC Viterbi. Previously Salesforce, Bank of America, EY.
                Building intelligent systems and businesses that compound.
              </p>
            </div>

            {/* Right: profile photo — centered in the right half */}
            <div className="shrink-0 flex flex-1 justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/profile-research.jpg"
                  alt="Luis Beltran Jr."
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <BentoGrid />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
