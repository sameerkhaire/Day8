using edTech.DomainModels.Entities;
using edTech.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.DAL.Implementations
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        private AppDbContext dbContext
        {
            get
            {
                return _dbContext as AppDbContext;
            }
        }
        public CourseRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public Course GetCourseByUrl(string Url)
        {
            return dbContext.Courses.Where(c => c.Url == Url).FirstOrDefault();
        }
    }
}
