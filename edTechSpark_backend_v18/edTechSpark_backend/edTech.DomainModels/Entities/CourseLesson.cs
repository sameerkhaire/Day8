using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.DomainModels.Entities
{
    public class CourseLesson
    {
        public CourseLesson()
        {
            CreatedDate = DateTime.Now;
        }
        public int Id { get; set; }
        public string LessonName { get; set; }
        public string VideoPath { get; set; }
        public string? ContentPath { get; set; }
        public string Duration { get; set; }
        public decimal Sequence { get; set; }
        public bool IsPreview { get; set; }
        public bool IsActive { get; set; }

        public int CourseTopicId { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public virtual CourseTopic CourseTopic { get; set; }
    }
}
