import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ChatWidget from "@/components/chat/ChatWidget"
import { posts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on AI, engineering, and building things.",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 max-w-4xl mx-auto px-6 pb-24">
        <div className="mb-16">
          <p className="text-[11px] font-mono text-amber uppercase tracking-widest mb-3">Writing</p>
          <h1 className="font-display font-bold text-5xl text-foreground mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts on AI, engineering, and building things that matter.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-amber/40 transition-colors">
                {post.image && (
                  <div className="relative h-52 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 896px) 100vw, 896px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDate(post.date)}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 bg-amber/10 text-amber border border-amber/20 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-amber transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-xs font-mono text-amber flex items-center gap-1">
                    Read post <span>→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
