import { CourseLesson } from "./courselesson";

export class CourseTopic {
    id: number | any;
    courseId: string | undefined;
    topicName: string | undefined;
    courseName: string | undefined;
    isActive: boolean | undefined;
    sequence: number | undefined;
  
    lessons:CourseLesson[] | undefined;
}