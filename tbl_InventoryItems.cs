using BusinessLayer.ViewModels.InventoryManagement;
using DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataRepository.DataAccessLayer.InventoryManagement
{
    public class tbl_InventoryItems
    {
        EnterpriseSystemESEntities _db = new EnterpriseSystemESEntities();
        TimeZoneInfo setTimeZoneInfo;
        DateTime currentDateTime;
        public List<tbl_InventoryItemsModel> RetriveInventoryDropDowns(int Option, int ID)
        {
            return _db.Database.SqlQuery<tbl_InventoryItemsModel>("Exec [dbo].[RetriveInventoryDropDowns] {0},{1}", new object[] { Option, ID }).ToList();
        }
        public tbl_InventoryItemsModel RetriveItems(int Option, int ID)
        {
            return _db.Database.SqlQuery<tbl_InventoryItemsModel>("Exec [dbo].[RetriveInventoryDropDowns] {0},{1}", new object[] { Option, ID }).FirstOrDefault();
        }
        public tbl_InventoryItemsModel SaveMainIventory(tbl_InventoryItemsModel objModel)
        {
            setTimeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            currentDateTime = TimeZoneInfo.ConvertTime(DateTime.Now, setTimeZoneInfo);
            return _db.Database.SqlQuery<tbl_InventoryItemsModel>("Exec [dbo].[SaveMainIventory] {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17}", new object[] { objModel.InventoryID, objModel.InventoryDate, objModel.VoucherType, objModel.StoreType, objModel.CreatedBy, currentDateTime.ToString("yyyy-MM-dd HH:mm:ss"), objModel.ExternalID, objModel.Nature, objModel.ItemID, objModel.Rate, objModel.Quantity, objModel.UOM, objModel.BatchNo, objModel.IssuedTo, objModel.EntityID, objModel.Remarks, objModel.AverageRate, objModel.SubItemID }).FirstOrDefault();
        }
    }
}