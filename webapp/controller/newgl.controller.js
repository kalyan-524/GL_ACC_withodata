sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ladera.glcreateaccount.controller.newgl", {

        onInit: function () {
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