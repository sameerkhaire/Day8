import { CourseTopic } from "./coursetopic";
import { Mentor } from "./mentor";

export class Course {
    id: number | any;
    name: string | undefined;
    summary: string | undefined;
    description: string | undefined;
    difficultyType: number | undefined;
    unitPrice: number | undefined;
    imageUrl: string | undefined;
    demoUrl: string | undefined;
    url: string | undefined;
    categoryId: number | undefined;
    createdDate: Date | undefined;
    mentorId: number | undefined;
    mentor: Mentor | undefined;
    courseTopics: CourseTopic[] | undefined;
}