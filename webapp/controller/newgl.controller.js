sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ladera.glcreateaccount.controller.newgl", {

        // onInit: function () {
        //     var oNewGL = new sap.ui.model.json.JSONModel({
        //         AccountNumber: "",
        //         COMPANYCODE: "",
        //         AccountName: "",
        //         GlaccType: "",
        //         AccountGroup: "",
        //         AccountCurrency: "",
        //         Description: ""
        //     });
        //     this.getView().setModel(oNewGL, "newGL");
        // },

        onInit: function () {
    var oDataModel = this.getOwnerComponent().getModel(); // your OData model

    // 1. Always create the JSON model first with default values
    var oNewGL = new sap.ui.model.json.JSONModel({
        AccountNumber: "",
        COMPANYCODE: "",
        AccountName: "",
        GlaccType: "",
        AccountGroup: "",
        AccountCurrency: "",
        Description: ""
    });
    this.getView().setModel(oNewGL, "newGL");

    // 2. Read the backend entity set and then set AccountNumber
    oDataModel.read("/GLAccDataSet", {
        success: function (oData) {
            var aItems = oData.results || [];
            var iNextSeq = (aItems.length > 0)
                ? parseInt(aItems[aItems.length - 1].Glaccnum) + 1
                : 10;

            oNewGL.setProperty("/AccountNumber", iNextSeq.toString());
        }.bind(this),
        error: function () {
            // fallback
            oNewGL.setProperty("/AccountNumber", "10");
        }
    });
},


        onsavePress1: function () {
            // Get all entered values from newGL model
            var oData = this.getView().getModel("newGL").getData();
            console.log("Captured Data:", oData);

        },


        onnavback: function () {
            // Now navigate back
            this.getOwnerComponent().getRouter().navTo("creategl", {}, true);
        },

    });
});