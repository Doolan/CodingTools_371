//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CodingTools_371.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ToolTag
    {
        public int ToolTagsId { get; set; }
        public Nullable<int> ToolId { get; set; }
        public Nullable<int> TagId { get; set; }
    
        public virtual Tag Tag { get; set; }
        public virtual Tool Tool { get; set; }
    }
}
