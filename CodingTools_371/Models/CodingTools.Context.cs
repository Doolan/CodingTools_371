﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class codingtoolsdevEntities : DbContext
    {
        public codingtoolsdevEntities()
            : base("name=codingtoolsdevEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<ReviewTag> ReviewTags { get; set; }
        public virtual DbSet<TagCategory> TagCategories { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<Tool> Tools { get; set; }
        public virtual DbSet<ToolTag> ToolTags { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Tool_View> Tool_View { get; set; }
    
        public virtual ObjectResult<get_ToolList_Result> get_ToolList()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_ToolList_Result>("get_ToolList");
        }
    
        public virtual ObjectResult<get_TagList_Result> get_TagList()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_TagList_Result>("get_TagList");
        }
    }
}
