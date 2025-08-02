using edTech.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.DAL.Interfaces
{
   public interface ITopicRepository
    {
        IEnumerable<CourseTopic> GetAllTopics();
        IEnumerable<CourseTopic> GetTopicWithLessons(int id);
        IEnumerable<CourseTopic> GetTopicsByCourse(int id);
    }
}
