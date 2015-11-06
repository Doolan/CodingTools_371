using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodingTools_371.Models
{
    public class ReviewModel
    {
        public class GetReviewModel
        {
            public int ReviewId { get; set; }
            public string Title { get; set; }
            public decimal? Rating { get; set; }
            public string Content { get; set; }
            public int Username { get; set; }
            public int ToolId { get; set; }
        }
    }
}