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
    
        public virtual ObjectResult<get_Tool_Page_Result> get_Tool_Page(Nullable<int> toolId)
        {
            var toolIdParameter = toolId.HasValue ?
                new ObjectParameter("ToolId", toolId) :
                new ObjectParameter("ToolId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_Tool_Page_Result>("get_Tool_Page", toolIdParameter);
        }
    
        public virtual ObjectResult<get_ReviewsList_Result> get_ReviewsList(Nullable<int> toolId)
        {
            var toolIdParameter = toolId.HasValue ?
                new ObjectParameter("ToolId", toolId) :
                new ObjectParameter("ToolId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_ReviewsList_Result>("get_ReviewsList", toolIdParameter);
        }
    
        public virtual int insert_review(Nullable<decimal> rating, string content, Nullable<int> toolID, Nullable<int> creatorID, string title)
        {
            var ratingParameter = rating.HasValue ?
                new ObjectParameter("Rating", rating) :
                new ObjectParameter("Rating", typeof(decimal));
    
            var contentParameter = content != null ?
                new ObjectParameter("Content", content) :
                new ObjectParameter("Content", typeof(string));
    
            var toolIDParameter = toolID.HasValue ?
                new ObjectParameter("ToolID", toolID) :
                new ObjectParameter("ToolID", typeof(int));
    
            var creatorIDParameter = creatorID.HasValue ?
                new ObjectParameter("CreatorID", creatorID) :
                new ObjectParameter("CreatorID", typeof(int));
    
            var titleParameter = title != null ?
                new ObjectParameter("Title", title) :
                new ObjectParameter("Title", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("insert_review", ratingParameter, contentParameter, toolIDParameter, creatorIDParameter, titleParameter);
        }
    
        public virtual int insert_user(string name, string email, string title, string username, byte[] passwordHash, byte[] passwordSalt)
        {
            var nameParameter = name != null ?
                new ObjectParameter("Name", name) :
                new ObjectParameter("Name", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("Email", email) :
                new ObjectParameter("Email", typeof(string));
    
            var titleParameter = title != null ?
                new ObjectParameter("Title", title) :
                new ObjectParameter("Title", typeof(string));
    
            var usernameParameter = username != null ?
                new ObjectParameter("Username", username) :
                new ObjectParameter("Username", typeof(string));
    
            var passwordHashParameter = passwordHash != null ?
                new ObjectParameter("PasswordHash", passwordHash) :
                new ObjectParameter("PasswordHash", typeof(byte[]));
    
            var passwordSaltParameter = passwordSalt != null ?
                new ObjectParameter("PasswordSalt", passwordSalt) :
                new ObjectParameter("PasswordSalt", typeof(byte[]));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("insert_user", nameParameter, emailParameter, titleParameter, usernameParameter, passwordHashParameter, passwordSaltParameter);
        }
    
        public virtual ObjectResult<Nullable<decimal>> submit_Quiz_Answers(Nullable<int> userId, Nullable<int> toolId, string title, Nullable<int> rating, string description)
        {
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            var toolIdParameter = toolId.HasValue ?
                new ObjectParameter("ToolId", toolId) :
                new ObjectParameter("ToolId", typeof(int));
    
            var titleParameter = title != null ?
                new ObjectParameter("Title", title) :
                new ObjectParameter("Title", typeof(string));
    
            var ratingParameter = rating.HasValue ?
                new ObjectParameter("Rating", rating) :
                new ObjectParameter("Rating", typeof(int));
    
            var descriptionParameter = description != null ?
                new ObjectParameter("Description", description) :
                new ObjectParameter("Description", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<decimal>>("submit_Quiz_Answers", userIdParameter, toolIdParameter, titleParameter, ratingParameter, descriptionParameter);
        }
    
        public virtual int get_user(string username, byte[] passwordHash, byte[] passwordSalt)
        {
            var usernameParameter = username != null ?
                new ObjectParameter("Username", username) :
                new ObjectParameter("Username", typeof(string));
    
            var passwordHashParameter = passwordHash != null ?
                new ObjectParameter("PasswordHash", passwordHash) :
                new ObjectParameter("PasswordHash", typeof(byte[]));
    
            var passwordSaltParameter = passwordSalt != null ?
                new ObjectParameter("PasswordSalt", passwordSalt) :
                new ObjectParameter("PasswordSalt", typeof(byte[]));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("get_user", usernameParameter, passwordHashParameter, passwordSaltParameter);
        }
    }
}
