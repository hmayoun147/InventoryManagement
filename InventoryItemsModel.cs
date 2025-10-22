using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusinessLayer.ViewModels.InventoryManagement
{
    public class tbl_InventoryItemsModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int ItemID { get; set; }
        public int MainCategoryID { get; set; }
        public string ItemName { get; set; }
        public string UOM { get; set; }
        public Nullable<double> Rate { get; set; }
        public int TypeID { get; set; }
        public int ReOrderLevel { get; set; }
        public string Location { get; set; }
        public string Tagging { get; set; }
        public int Balance { get; set; }
        public int ChildInvtID { get; set; }
        public Nullable<double> Quantity { get; set; }
        public string BatchNo { get; set; }
        public Nullable<int> IssuedTo { get; set; }
        public Nullable<int> EntityID { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<int> InventoryID { get; set; }
        public Nullable<double> AverageRate { get; set; }
        public Nullable<int> SubItemID { get; set; }
        public Nullable<System.DateTime> InventoryDate { get; set; }
        public Nullable<int> VoucherType { get; set; }
        public Nullable<int> StoreType { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> ExternalID { get; set; }
        public Nullable<int> Nature { get; set; }
    }
}