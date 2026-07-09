import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/backend";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogCTA } from "./BlogCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
 
  
  if (!post) {
    return {
      title: "Article Not Found | CollegeBlink Hub",
    };
  }

  return {
    title: `${post.title} | CollegeBlink Hub`,
    description: post.summary,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Knowledge Hub
          </Link>

          {/* Article Header info */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                {post.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-muted-foreground/80 text-base md:text-lg border-l-4 border-indigo-500/70 pl-4 py-1 italic">
              {post.summary}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-10 border border-border/50">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
            />
          </div>

          {/* Content Body */}
          <article className="prose dark:prose-invert max-w-none mb-16">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mt-8 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-8 mb-4 border-b border-border/40 pb-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-bold text-foreground mt-6 mb-3" {...props} />,
                p: ({ node, ...props }) => <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 text-muted-foreground my-4 text-sm md:text-base" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 text-muted-foreground my-4 text-sm md:text-base" {...props} />,
                li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6 border border-border/40 rounded-2xl bg-card/20 backdrop-blur-md">
                    <table className="min-w-full divide-y divide-border/40" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-muted/40" {...props} />,
                tbody: ({ node, ...props }) => <tbody className="divide-y divide-border/40" {...props} />,
                tr: ({ node, ...props }) => <tr className="hover:bg-muted/10 transition-colors" {...props} />,
                th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider" {...props} />,
                td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-foreground" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-extrabold text-foreground" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Bottom Counselling CTA */}
          <BlogCTA />
        </div>
      </div>
    </div>
  );
}
