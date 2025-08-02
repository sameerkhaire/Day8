using edTech.DomainModels.Entities;
using edTech.DAL.Interfaces;
using edTech.Services.Interfaces;
using System.Collections.Generic;

namespace edTech.Services.Implementations
{
    public class LessonService : Service<CourseLesson>, ILessonService
    {
        private readonly ILessonRepository _lessonRepo;
        public LessonService(ILessonRepository lessonRepo, IRepository<CourseLesson> courseLesson) : base(courseLesson)
        {
            _lessonRepo = lessonRepo;
        }
        public IEnumerable<CourseLesson> GetLessonsByTopic(int TopicId)
        {
            return _lessonRepo.GetLessonsByTopic(TopicId);
        }
    }
}
