using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodingTools_371.Models
{
    public class ToolModel
    {
    }


    #region BarChart
    public class DataBarChart
    {
        public List<DataBarRow> Rows { get; set; }
        public decimal AverageScore { get; set; }
        public string RankingWord { get; set; }
    }

    public class DataBarRow
    {
        public int Label { get; set; }
        public int NumberOfScore { get; set; }
        public double Width { get; set; } //as percent
        public string ColorCode { get; set; }
        public string RankingWord { get; set; }
    }
#endregion

    #region GetProjectInfo

    public class ToolInfo
    {
        public class Tool
        {
            public int ToolId { get; set; }
            public string Name { get; set; }
            public string Url { get; set; }
            public string Description { get; set; }
            public string ImgPath { get; set; }
            public List<Tag> Tags { get; set; }
        }

        public class Tag
        {
            public int TagId { get; set; }
            public string TagName { get; set; }
            public string TagValue { get; set; }
        }
    }

    #endregion

    #region GetReviewList

    public class ReviewList
    {
        public List<get_ReviewsList_Result> Reviews { get; set; }
        public DataBarChart Chart { get; set; }
    }

    #endregion
}