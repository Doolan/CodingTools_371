﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using CodingTools_371.Models;

namespace CodingTools_371.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Tool()
        {
            return View();
        }

        public ActionResult Tailor()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult MakeAccount()
        {
            return View();
        }

        public ActionResult MakeReview()
        {
            return View();
        }

        public ActionResult ReviewBox()
        {
            return View();
        }

        #region AJAX CALLS

        [HttpGet]
        public string GetToolList()
        {
            var db = new codingtoolsdevEntities();
            var list = db.get_ToolList().ToList();
            //var toolList = ToolListHelper(list);
            var tags = db.get_TagList().ToList();
            return new JavaScriptSerializer().Serialize(new ListViewInitModel
            {
                ToolList = ToolListHelper(list),
                TagList = GenerateTagLists(tags)
            });
        }

        private List<ListModel.GetListModel> ToolListHelper(List<get_ToolList_Result> list)
        {
            var cToolId = 0;
            var cCategoryName = "";
            var returnList = new List<ListModel.GetListModel>();
            ListModel.GetListModel cModel = null;
            var cCategoryList = new List<ListModel.ToolCategoryGroup>();
            ListModel.ToolCategoryGroup cCatGroup= null;
            var tagList = new List<ListModel.ToolTagObject>();

            foreach (var row in list)
            {
                if (cToolId != row.ToolID)
                {
                    if (cToolId != 0)
                    {
                        cCatGroup.Tags = tagList;
                        cCategoryList.Add(cCatGroup);
                        cModel.Tags = cCategoryList;
                        returnList.Add(cModel);
                    }
                    cModel = new ListModel.GetListModel
                    {
                        ToolId = row.ToolID,
                        Name = row.Name,
                        Url = row.URL,
                        Description = row.Description
                    };
                    cToolId = row.ToolID;
                    cCategoryName = row.CategoryName;
                    //cModel = new ListModel.GetListModel();
                    cCategoryList = new List<ListModel.ToolCategoryGroup>();
                    cCatGroup = new ListModel.ToolCategoryGroup {CategoryName = row.CategoryName};
                    tagList = new List<ListModel.ToolTagObject> { new ListModel.ToolTagObject { TagName = row.TagName, TagValue = row.TagValue} };
                }
                else if (cCategoryName != row.CategoryName)
                {
                    cCategoryName = row.CategoryName;
                    cCatGroup.Tags = tagList;
                    cCategoryList.Add(cCatGroup);
                    cCatGroup = new ListModel.ToolCategoryGroup {CategoryName = row.CategoryName};
                    tagList = new List<ListModel.ToolTagObject> { new ListModel.ToolTagObject { TagName = row.TagName } };
                }
                else
                {
                    tagList.Add(new ListModel.ToolTagObject { TagName = row.TagName, TagValue = row.TagValue});
                    
                }
            }
            return returnList;
        }

        private List<TagModels.TagCategory> GenerateTagLists(List<get_TagList_Result> tags)
        {
           var categoryName = "";
            //TagModels.TagCategory tCat = null;
            List<TagModels.Tag> tagList = null;
            var catList = new List<TagModels.TagCategory>();

            foreach (var row in tags)
            {
                if (categoryName != row.CategoryName)
                {
                    if (categoryName != "")
                    {
                        catList.Add(new TagModels.TagCategory
                        {
                            CategoryName = categoryName,
                            Tags = tagList
                        });
                    }
                    tagList = new List<TagModels.Tag>();
                    categoryName = row.CategoryName;
                }
                tagList.Add(new TagModels.Tag
                {
                    TagId = row.TagId,
                    Name = row.Name,
                    Value = row.Value,
                    ImgPath = row.ImgPath
                });
            }
            catList.Add(new TagModels.TagCategory
            {
                CategoryName = categoryName,
                Tags = tagList
            });
            return catList;
        }

#endregion

    }
}