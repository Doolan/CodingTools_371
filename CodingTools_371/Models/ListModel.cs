using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodingTools_371.Models
{
    #region GetToolList
    public class ListModel
    {
        public class GetListModel
        {
            public int ToolId { get; set;}
            public string Name { get; set; }
            public string Url { get; set; }
            public string Description { get; set; }
            public List<ToolCategoryGroup> Tags { get; set; }
        }

        public class ToolCategoryGroup
        {
            public string CategoryName { get; set; }
            public List<ToolTagObject> Tags { get; set; }
        }

        public class ToolTagObject
        {
            public string TagName { get; set; }
            public string TagValue { get; set; }
        }
    }

    public class TagModels
    {
        public class Tag
        {
            public int TagId { get; set; }
            public string Name { get; set; }
            public string Value { get; set; }
            public string ImgPath { get; set; }
        }

        public class TagCategory 
        {
            public string CategoryName { get; set; }
            public List<TagModels.Tag> Tags { get; set; }
        }
    }

    public class ListViewInitModel
    {
       public  List<ListModel.GetListModel> ToolList { get; set; }
       public List<TagModels.TagCategory> TagList { get; set; }
    }

    #endregion



}