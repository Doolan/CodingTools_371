using System;
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

        //public ActionResult List()
        //{
        //   return View();
        //}

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
            var humanid = 0;
            return new JavaScriptSerializer().Serialize(ToolListHelper(list));
        }

        [HttpGet]
        public string GetReviewList()
        {
            var db = new codingtoolsdevEntities();
            var list = db.get_ReviewList().ToList();
            var humanid = 0;
            return new JavaScriptSerializer().Serialize(ReviewListHelper(list));
        }

        private List<ListModel.GetListModel> ToolListHelper(List<get_ToolList_Result> list)
        {
            var cToolID = 0;
            var cTagValue = "";
            var cCategoryName = "";
            var returnList = new List<ListModel.GetListModel>();
            ListModel.GetListModel cModel = null;
            var cCategoryList = new List<ListModel.ToolCategoryGroup>();
            ListModel.ToolCategoryGroup cCatGroup= null;
            var tagList = new List<ListModel.ToolTagObject>();

            foreach (var row in list)
            {
                if (cToolID != row.ToolID)
                {
                    if (cToolID != 0)
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
                    cToolID = row.ToolID;
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

        private List<ReviewModel.GetReviewModel> ReviewListHelper(List<get_ReviewList_Result> list)
        {
            var cReviewID = 0;
            var returnList = new List<ReviewModel.GetReviewModel>();
            ReviewModel.GetReviewModel cModel = null;

            foreach (var row in list)
            {
               // if (cReviewID != row.ReviewID)
                if(true)
                {
                    /*if (cReviewID != 0)
                    {
                        cCatGroup.Tags = tagList;
                        //cCategoryList.Add(cCatGroup);
                        cModel.Tags = cCategoryList;
                        returnList.Add(cModel);
                    }*/

                    cModel = new ReviewModel.GetReviewModel
                    {
                        ReviewId = row.ReviewID,
                        Title = row.Title,
                        Rating = row.Rating,
                        Content = row.Content,
                        Username = row.Username,
                        ToolId = row.ToolID
                    };
                    cReviewID = row.ReviewID;
                    returnList.Add(cModel);

                    //tagList = new List<ListModel.ToolTagObject> { new ListModel.ToolTagObject { TagName = row.TagName, TagValue = row.TagValue } };
                }
                else
                {
                    //tagList.Add(new ListModel.ToolTagObject { TagName = row.TagName, TagValue = row.TagValue });

                }
            }
            return returnList;
        }

#endregion

    }
}