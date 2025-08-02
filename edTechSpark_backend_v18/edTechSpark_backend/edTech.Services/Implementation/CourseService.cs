using edTech.DomainModels.Entities;
using edTech.DAL.Interfaces;
using edTech.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.Services.Implementations
{
    public class CourseService : Service<Course>, ICourseService
    {
        private readonly ICourseRepository _courseRepo;
        private readonly IRepository<Mentor> _mentorRepo;
        private readonly ITopicRepository _topicRepository;
        public CourseService(ICourseRepository courseRepo, ITopicRepository topicRepo, IRepository<Mentor> mentorRepo) : base(courseRepo)
        {
            _courseRepo = courseRepo;
            _topicRepository = topicRepo;
            _mentorRepo = mentorRepo;
        }

        public Course GetCourseWithLessons(string Url)
        {
            Course course = _courseRepo.GetCourseByUrl(Url);
            course.Mentor = _mentorRepo.Find(course.MentorId);
            course.CourseTopics = _topicRepository.GetTopicWithLessons(course.Id).ToList();

            return course;
        }
    }
}
