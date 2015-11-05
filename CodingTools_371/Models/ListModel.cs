using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodingTools_371.Models
{
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
            public string TagName;
            public string TagValue;
        }
    }

    
}