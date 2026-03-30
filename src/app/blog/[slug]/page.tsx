import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ChatWidget from "@/components/chat/ChatWidget"
import { posts, getPostBySlug } from "@/lib/blog"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24">
        {/* Hero — image or gradient */}
        {post.image ? (
          <div className="relative h-72 w-full mb-12">
            <Image src={post.image} alt={post.title} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
        ) : (
          <div className="h-2 w-full bg-gradient-to-r from-amber via-amber/50 to-transparent mb-12" />
        )}

        <div className="max-w-2xl mx-auto px-6">
          {/* Back */}
          <Link
            href="/blog"
            className="text-xs font-mono text-muted-foreground hover:text-amber transition-colors mb-8 inline-block"
          >
            ← All posts
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-muted-foreground">{formatDate(post.date)}</span>
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

          {/* Title */}
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight mb-10">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-invert prose-sm max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-4 prose-li:text-foreground/80 prose-li:mb-1
            prose-a:text-amber prose-a:no-underline hover:prose-a:underline
            prose-code:text-amber prose-code:bg-amber/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-blockquote:border-l-amber prose-blockquote:text-muted-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <Link href="/blog" className="text-sm font-mono text-muted-foreground hover:text-amber transition-colors">
              ← Back to blog
            </Link>
            <p className="text-xs text-muted-foreground font-mono">Luis Beltran Jr.</p>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
