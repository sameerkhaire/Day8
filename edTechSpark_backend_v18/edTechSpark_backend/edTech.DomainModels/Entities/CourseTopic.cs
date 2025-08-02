using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace edTech.DomainModels.Entities
{
    public class CourseTopic
    {
        public CourseTopic()
        {
            Lessons = new HashSet<CourseLesson>();
        }
        public int Id { get; set; }
        public string TopicName { get; set; }
        public bool IsActive { get; set; }
        public decimal Sequence { get; set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
        public virtual ICollection<CourseLesson> Lessons { get; set; }

        [NotMapped]
        public string CourseName { get; set; }
    }
}
