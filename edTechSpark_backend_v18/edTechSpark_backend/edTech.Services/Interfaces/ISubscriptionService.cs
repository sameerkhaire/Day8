using edTech.DomainModels.Entities;
using edTech.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.Services.Interfaces
{
    public interface ISubscriptionService : IService<Subscription>
    {
        Subscription GetUserSubscription(int UserId, int CourseId);
        IEnumerable<Course> GetSubscribedCourses(int UserId);
    }
}
