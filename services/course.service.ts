import * as courseRepository from "@/repositories/course.repository";
import { DEMO_MODE } from "@/lib/demo";
import { mockCourses, type Course } from "@/mock/courses";
import { mockColleges } from "@/mock/colleges";

interface GetCoursesParams {
  collegeId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getCourses(params: GetCoursesParams) {
  if (DEMO_MODE) {
    const { collegeId, search, page = 1, limit = 10 } = params;
    let filtered = [...mockCourses];

    if (collegeId) {
      filtered = filtered.filter((c) =>
        c.colleges?.some((rel) => rel.collegeId === collegeId)
      );
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerSearch) ||
          c.degree.toLowerCase().includes(lowerSearch)
      );
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  return courseRepository.findMany(params);
}

export async function getCourseById(id: string) {
  if (DEMO_MODE) {
    return mockCourses.find((c) => c.id === id) || null;
  }
  return courseRepository.findById(id);
}

export async function getCoursesByCollegeId(collegeId: string) {
  if (DEMO_MODE) {
    return mockCourses.filter((c) =>
      c.colleges?.some((rel) => rel.collegeId === collegeId)
    );
  }
  return courseRepository.findByCollegeId(collegeId);
}

export async function createCourse(user: any, data: any) {
  if (DEMO_MODE) {
    const newCourse: Course = {
      id: `crs_${Date.now()}`,
      name: data.name,
      degree: data.degree,
      duration: Number(data.duration),
      description: data.description || null,
      careerProspects: Array.isArray(data.careerProspects)
        ? data.careerProspects
        : data.careerProspects
        ? [data.careerProspects]
        : [],
      createdAt: new Date(),
      updatedAt: new Date(),
      colleges: Array.isArray(data.collegeIds)
        ? data.collegeIds.map((cId: string) => ({
            collegeId: cId,
            courseId: `crs_${Date.now()}`,
            fees: 1.5 * Number(data.duration || 4),
            totalSeats: 60,
            availableSeats: 60,
            eligibility: "Standard requirements.",
            college: mockColleges.find((col) => col.id === cId)
          }))
        : [],
    };
    mockCourses.unshift(newCourse);
    return newCourse;
  }

  return courseRepository.create({
    name: data.name,
    degree: data.degree,
    duration: data.duration,
    description: data.description,
    careerProspects: data.careerProspects,
    collegeIds: data.collegeIds,
    slug: data.slug,
  });
}

export async function updateCourse(user: any, id: string, data: any) {
  if (DEMO_MODE) {
    const index = mockCourses.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Course not found");

    const updated: Course = {
      ...mockCourses[index],
      name: data.name !== undefined ? data.name : mockCourses[index].name,
      degree: data.degree !== undefined ? data.degree : mockCourses[index].degree,
      duration: data.duration !== undefined ? Number(data.duration) : mockCourses[index].duration,
      description: data.description !== undefined ? data.description : mockCourses[index].description,
      careerProspects: data.careerProspects !== undefined
        ? (Array.isArray(data.careerProspects) ? data.careerProspects : [data.careerProspects])
        : mockCourses[index].careerProspects,
      colleges: data.collegeIds !== undefined && Array.isArray(data.collegeIds)
        ? data.collegeIds.map((cId: string) => ({
            collegeId: cId,
            courseId: id,
            fees: 1.5 * Number(data.duration || mockCourses[index].duration),
            totalSeats: 60,
            availableSeats: 60,
            eligibility: "Standard requirements.",
            college: mockColleges.find((col) => col.id === cId)
          }))
        : mockCourses[index].colleges,
      updatedAt: new Date(),
    };
    mockCourses[index] = updated;
    return updated;
  }

  return courseRepository.update(id, {
    name: data.name,
    degree: data.degree,
    duration: data.duration,
    description: data.description,
    careerProspects: data.careerProspects,
    collegeIds: data.collegeIds,
    slug: data.slug,
  });
}

export async function deleteCourse(user: any, id: string) {
  if (DEMO_MODE) {
    const index = mockCourses.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Course not found");
    const [deleted] = mockCourses.splice(index, 1);
    return deleted;
  }

  return courseRepository.remove(id);
}