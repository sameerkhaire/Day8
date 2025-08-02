using edTech.DomainModels.Entities;
using edTech.DAL.Interfaces;
using edTech.Services.Interfaces;
using edTech.DomainModels.Models;
using System.Collections.Generic;

namespace edTech.Services.Implementations
{
    public class SubscriptionService : Service<Subscription>, ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepo;
        public SubscriptionService(ISubscriptionRepository subscriptionRepo, IRepository<Subscription> subsRepo) : base(subsRepo)
        {
            _subscriptionRepo = subscriptionRepo;
        }

        public Subscription GetUserSubscription(int UserId, int CourseId)
        {
            Subscription subscription = _subscriptionRepo.GetUserSubscription(UserId, CourseId);
            return subscription;
        }
        public IEnumerable<Course> GetSubscribedCourses(int UserId)
        {
            return _subscriptionRepo.GetSubscribedCourses(UserId);
        }
    }
}
