$(document).ready(function () {
    $("#MainBody").addClass("sidebar-collapse");
    var currentTime = new Date();
    // First Date Of the month 
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    // Last Date Of the Month 
    var startDateTo = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0);
    $("#datepicker").kendoDatePicker({
        // display month and year in the input
        format: "yyyy-MM-dd",
        // specifies that DateInput is used for masking the input element
        dateInput: false,
        parseFormats: ["dd/MM/yyyy"]
    });
    $("#mainCategoryID").kendoDropDownList({
        optionLabel: "--Select Main Category--"
    });
    $("#searchItem").kendoDropDownList({
        optionLabel: "--Select Item--"
    });
    $("#storetype").kendoDropDownList({
        optionLabel: "--Select Store--"
    });
    $("#voucherstype").kendoDropDownList({
        optionLabel: "--Select Voucher--"
    });
    $("#entityID").kendoDropDownList({
        optionLabel: "--Select Entity--"
    });
    $("#storetype").kendoDropDownList({
        filter: "contains",
        dataTextField: "Name",
        dataValueField: "ID",
        optionLabel: {
            Name: "--Select Store Type-",
            ID: "0"
        },
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: "/InventoryManagement/RetriveInventoryDropDowns?Option=1&ID=0",
                }
            }
        }
    });
    $("#voucherstype").kendoDropDownList({
        filter: "contains",
        dataTextField: "Name",
        dataValueField: "ID",
        optionLabel: {
            Name: "--Select Voucher-",
            ID: "0"
        },
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: "/InventoryManagement/RetriveInventoryDropDowns?Option=2&ID=0",
                }
            }
        }
    });
    $("#mainCategoryID").kendoDropDownList({
        filter: "contains",
        dataTextField: "Name",
        dataValueField: "ID",
        optionLabel: {
            Name: "--Select Category-",
            ID: "0"
        },
        change: PopulateItems,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: "/InventoryManagement/RetriveInventoryDropDowns?Option=3&ID=0",
                }
            }
        }
    });
});
function PopulateItems() {
    var mainCategoryID = $("#mainCategoryID").val();
    if (mainCategoryID == "" || mainCategoryID == "0" || mainCategoryID == undefined || mainCategoryID == null) {
        toastr.error("Please Select Main Category");
    }
    else {
        $("#searchItem").kendoDropDownList({
            filter: "contains",
            dataTextField: "Name",
            dataValueField: "ID",
            optionLabel: {
                Name: "--Select Item--",
                ID: "0"
            },
            change: ItemsSpecification,
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: "/InventoryManagement/RetriveInventoryDropDowns?Option=4&ID=" + mainCategoryID,
                    }
                }
            }
        });
    }
}
function ItemsSpecification() {
    var ItemID = $("#searchItem").val();
    if (ItemID == "" || ItemID == "0" || ItemID == undefined || ItemID == null) {
        toastr.error("Please Select Item");
    }
    else {
        $.ajax({
            url: '/InventoryManagement/RetriveItems?Option=5&ID=' + ItemID,
            type: 'POST',
            datatype: 'json',
            contenttype: 'application/json; charset=utf-8',
            success: function (data) {
                debugger;
                $("#invrate").val(data.Rate);
                $("#uom").val(data.UOM);
                $("#showcb").html('');
                $("#showcb").html(data.Balance);
            },
            error: function () {
            }
        });
    }
}
function PopulateEntity() {
    var Option = $("#invtissuedto").val();
    if (Option == "1") {
        $("#entityhideshow").show();
        $("#entityID").kendoDropDownList({
            filter: "contains",
            dataTextField: "Name",
            dataValueField: "ID",
            optionLabel: {
                Name: "--Select Entity--",
                ID: "0"
            },
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: "/InventoryManagement/RetriveInventoryDropDowns?Option=6&ID=0",
                    }
                }
            }
        });
    }
    else if (Option == "2") {
        $("#entityhideshow").show();
        $("#entityID").kendoDropDownList({
            filter: "contains",
            dataTextField: "Name",
            dataValueField: "ID",
            optionLabel: {
                Name: "--Select Entity--",
                ID: "0"
            },
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: "/InventoryManagement/RetriveInventoryDropDowns?Option=7&ID=0",
                    }
                }
            }
        });
    }
    else if (Option == "0") {
        $("#entityhideshow").hide();
    }
}
function SaveInventory() {
    //if (ValidateInventoryForm() == true) {
        $("#overlay").show();
        var Formdata = convertFormToJSON('#ManageInventory');
        Formdata.ExternalID = 0;
        Formdata.Nature = 0;
        $.ajax({
            url: '/InventoryManagement/SaveMainIventory',
            type: 'POST',
            processData: false,
            contentType: false,
            data: JSON.stringify(Formdata),
            success: function (data) {
                $("#overlay").hide();
                if (data.AlertMessage == "0") {
                    toastr.success("Inventory Added Successfully");
                    $('#ChildInventoryKendo').data('kendoGrid').dataSource.read();
                    $('#ChildInventoryKendo').data('kendoGrid').refresh();
                    resetForm();
                }
                else if (data.AlertMessage == "1") {
                    toastr.error("Item Already Exists");
                }
                else {
                    toastr.error("No Action Perform");
                }
            },
            error: function () {
            }
        });
    //}
}
//Validate
function ValidateInventoryForm() {
    var InventoryDate = $("#datepicker").val();
    var StoreID = $("#storetype").val();
    var VoucherID = $("#voucherstype").val();
    var CategoryID = $("#mainCategoryID").val();
    var ItemID = $("#searchItem").val();
    var Rate = $("#invrate").val();
    var QTY = $("#invqty").val();
    var UOM = $("#uom").val();
    var BatchNo = $("#invbatchno").val();
    var IssuedTo = $("#invtissuedto").val();
    var EntityID = $("#entityID").val();
    var Remarks = $("#remarksvalue").val();

    if (InventoryDate == "" || InventoryDate == null || InventoryDate == undefined || InventoryDate == "0") {
        toastr.error("Please Select Inventory Date");
        return false;
    }
    else if (StoreID == "" || StoreID == null || StoreID == undefined || StoreID == "0") {
        toastr.error("Please Select Store");
        return false;
    }
    else if (VoucherID == "" || VoucherID == null || VoucherID == undefined || VoucherID == "0") {
        toastr.error("Please Select Voucher Type");
        return false;
    }
    else if (CategoryID == "" || CategoryID == null || CategoryID == undefined || CategoryID == "0") {
        toastr.error("Please Select Category");
        return false;
    }
    else if (ItemID == "" || ItemID == null || ItemID == undefined || ItemID == "0") {
        toastr.error("Please Select Item");
        return false;
    }
    else if (Rate == "" || Rate == null || Rate == undefined || Rate == "0") {
        toastr.error("Please Enter Item Rate");
        return false;
    }
    else if (QTY == "" || QTY == null || QTY == undefined || QTY == "0") {
        toastr.error("Please Enter Item Quantity");
        return false;
    }
    else if (UOM == "" || UOM == null || UOM == undefined || UOM == "0") {
        toastr.error("Please Enter UOM");
        return false;
    }
    else if (Remarks == "" || Remarks == null || Remarks == undefined) {
        toastr.error("Please Enter Remarks");
        return false;
    }
    else {
        return true;
    }
}
function convertFormToJSON(form) {
    const array = $(form).serializeArray(); // Encodes the set of form elements as an array of names and values.
    const json = {};
    $.each(array, function () {
        json[this.name] = this.value || "";
    });
    return json;
}
function resetForm() {
    $("#datepicker").val('');
    $("#storetype").data("kendoDropDownList").value('0');
    $("#voucherstype").data("kendoDropDownList").value('0');
    $("#mainCategoryID").data("kendoDropDownList").value('0');
    $("#searchItem").data("kendoDropDownList").value('0');
    $("#showcb").html('0');
    $("#invrate").val('');
    $("#invqty").val('');
    $("#uom").val('0');
    $("#invbatchno").val('');
    $("#invtissuedto").val('0');
    $("#entityID").data("kendoDropDownList").value('0');
    $("#remarksvalue").val('');
}