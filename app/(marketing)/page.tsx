import { Metadata } from "next";
import HomeClient from "./HomeClient";
import * as backend from "@/lib/backend";

export const metadata: Metadata = {
  title: "Find Your Perfect College | CollegeBlink",
  description:
    "Smart-powered college discovery and application platform. Get personalized recommendations for engineering, medical, management, and more.",
};

async function getStats() {
  try {
    return await backend.getHomeStats();
  } catch {

    return {
      colleges: 2500,
      students: 50000,
      scholarships: 150,
      successRate: 94,
    };
  }
}

export default async function HomePage() {
  const stats = await getStats();
  
  const [
    featuredCollegesData,
    coursesData,
    examsData,
    citiesData
  ] = await Promise.all([
    backend.getColleges({ limit: 10, sortBy: "nirfRank", sortOrder: "asc" }).catch(() => null),
    backend.getUniqueCourses().catch(() => []),
    backend.getUniqueExams().catch(() => []),
    backend.getUniqueCities().catch(() => [])
  ]);

  const featuredColleges = featuredCollegesData?.colleges || [];
  const courses = coursesData || [];
  const exams = examsData || [];
  const cities = citiesData || [];

  let initialCourseColleges: any[] = [];
  if (courses.length > 0) {
    try {
      const courseCollegesData = await backend.getCollegesByCourse(courses[0]);
      initialCourseColleges = courseCollegesData?.colleges || [];
    } catch (e) {}
  }

  return (
    <HomeClient 
      stats={stats} 
      featuredColleges={featuredColleges}
      initialCourses={courses}
      initialCourseColleges={initialCourseColleges}
      initialExams={exams}
      initialCities={cities}
    />
  );
}
