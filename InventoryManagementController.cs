using DataRepository.DataAccessLayer.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EnterpriseSystem.Controllers
{
    public class InventoryManagementController : Controller
    {
        InventoryIn Objinventory = new InventoryIn();
        // GET: Inventory
        public ActionResult ManageInventory()
        {
            if (Session["ESUserSession"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult RetrieveStores()
        {
            if (Session["ESUserSession"] != null)
            {
                return Json(Objinventory.RetrieveStores(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult RetrieveVouchers()
        {
            if (Session["ESUserSession"] != null)
            {
                return Json(Objinventory.RetrieveVouchers(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult RetrieveMainCategories()
        {
            if (Session["ESUserSession"] != null)
            {
                return Json(Objinventory.RetrieveMainCategories(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult RetrieveItems()
        {
            if (Session["ESUserSession"] != null)
            {
                return Json(Objinventory.RetrieveItems(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult RetrieveDepartments()
        {
            if (Session["ESUserSession"] != null)
            {
                return Json(Objinventory.RetrieveDepartments(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult RetrieveEmployees()
        {
            if (Session["ESUserSession"] != null)
            {
                return Json(Objinventory.RetrieveEmployees(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
    }
}