using edTech.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.Services.Interfaces
{
    public interface ITopicService: IService<CourseTopic>
    {
        IEnumerable<CourseTopic> GetAllTopics();
        IEnumerable<CourseTopic> GetTopicsByCourse(int CourseId);
    }
}
