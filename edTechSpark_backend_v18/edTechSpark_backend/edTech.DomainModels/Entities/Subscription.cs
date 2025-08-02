using edTech.DomainModels.Entities;
using System;

namespace edTech.DomainModels.Entities
{
    public class Subscription
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime SubscribedOn { get; set; }

        public int CourseId { get; set; }
        public virtual User User { get; set; }
        public virtual Course Course { get; set; }
    }
}
