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

        #region AJAX CALLS

        [HttpGet]
        public string GetToolList()
        {
            var db = new codingtoolsdevEntities();
            List<get_ToolList_Result> list = db.get_ToolList().ToList();
            var humanid = 0;
            return new JavaScriptSerializer().Serialize(humanid);
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
            var tagList = new List<Tag>();

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
                    cModel = new ListModel.GetListModel();
                    cCategoryList = new List<ListModel.ToolCategoryGroup>();
                    cCatGroup = new ListModel.ToolCategoryGroup {CategoryName = row.CategoryName};
                    tagList = new List<Tag>();
                    tagList.Add(new Tag {Name = row.TagName });
                }
            }
        }

#endregion

    }
}