import { Metadata } from "next";
import { getBlogPosts } from "@/lib/backend";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Latest Exam Guides & College News | CollegeBlink Blogs",
  description: "Stay ahead with professional guidance, month-by-month study timelines, exam patterns, and prep guides for JEE, NEET, CAT, and other top entrance exams.",
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  return <BlogsClient initialPosts={posts} />;
}
