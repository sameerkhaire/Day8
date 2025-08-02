using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace edTech.DomainModels.Entities
{
    public class Course
    {
        public Course()
        {
            CourseTopics = new HashSet<CourseTopic>();
        }

        public int Id { get; set; }
        public string Name { get; set; }      
        public string Summary { get; set; }
        public string Description { get; set; }
        public decimal Sequence { get; set; }
        public string ImageUrl { get; set; }
        public string DemoUrl { get; set; }
        public string Url { get; set; }
        public decimal UnitPrice { get; set; }       
        public int DifficultyType { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }

        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public int MentorId { get; set; }

        [ForeignKey("MentorId")]
        public virtual Mentor Mentor { get; set; }
        public virtual ICollection<CourseTopic> CourseTopics { get; set; }
    }
}
