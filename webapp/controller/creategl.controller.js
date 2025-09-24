sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/SelectDialog",
    "sap/m/StandardListItem"
], function (Controller, JSONModel, MessageToast, SelectDialog, StandardListItem) {
    "use strict";

    return Controller.extend("ladera.glaccountcreation.controller.creategl", {

        onInit: function () {
            var oLocalModel = new sap.ui.model.json.JSONModel({ GLDetails: [] });
            this.getView().setModel(oLocalModel, "local");
        },

        onnavback: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },

        onValueHelpRequest: function () {
            var oView = this.getView();

            if (!this._oValueHelpDialog) {
                this._oValueHelpDialog = new SelectDialog({
                    title: "Select Reference GL",
                    items: {
                        path: "/F4HelpSet",
                        template: new StandardListItem({
                            title: "{GLAcc}"
                        })
                    },
                    search: function (oEvent) {
                        var sValue = oEvent.getParameter("value");
                        var oFilter = new sap.ui.model.Filter("GLAcc", sap.ui.model.FilterOperator.Contains, sValue);
                        oEvent.getSource().getBinding("items").filter([oFilter]);
                    },
                    confirm: function (oEvent) {
                        var oSelectedItem = oEvent.getParameter("selectedItem");
                        if (oSelectedItem) {
                            var sGL = oSelectedItem.getTitle();
                            oView.byId("refGLNum").setValue(sGL);

                            // Load related GL details
                            this._loadGLDetails(sGL);
                        }
                    }.bind(this)
                });
                oView.addDependent(this._oValueHelpDialog);
            }

            this._oValueHelpDialog.open();
        },

        _loadGLDetails: function (sGL) {
            var oModel = this.getView().getModel();        // ODataModel
            var oLocalModel = this.getView().getModel("local");

            // Key read instead of filter
            oModel.read("/GLAccDataSet('" + sGL.trim() + "')", {
                success: function (oData) {
                    // Wrap single object in array for table binding
                    oLocalModel.setProperty("/GLDetails", [oData]);
                },
                error: function (oError) {
                    console.error("OData error:", oError);
                    MessageToast.show("Error fetching GL details");
                }
            });
            
        },

        onTableSelectionChange: function (oEvent) {
            const oSelectedItem = oEvent.getParameter("listItem");
            const oSelectedData = oSelectedItem.getBindingContext("local").getObject();

            if (oSelectedData) {
                // Save selected data to a temporary model
                const oSelectedModel = new JSONModel(oSelectedData);
                this.getOwnerComponent().setModel(oSelectedModel, "selectedGL");  // Ensure model name is selectedGL
            }
        },

        oncopyrefPress: function () {
            this.oSelectedModel = this.getOwnerComponent().getModel("selectedGL");

            if (!this.oSelectedModel || !this.oSelectedModel.getData()) {
                MessageToast.show("Please select a GL record from the table.");
                return;
            }

            // Navigate to the object page
            this.getOwnerComponent().getRouter().navTo("glrefpage");
}

        

        // onTableSelectionChange: function (oEvent) {
        //     const oSelectedItem = oEvent.getParameter("listItem");
        //     const oSelectedData = oSelectedItem.getBindingContext("local").getObject();
        //     if (oSelectedData) {
        //         // Save selected data to a temporary model
        //         const oSelectedModel = new JSONModel(oSelectedData);
        //         this.getOwnerComponent().setModel(oSelectedModel, "selectedGL");
        //         // this.getOwnerComponent().getRouter().navTo("glrefpage")
        //     }
        // }, oncopyrefPress: function () {
        //     const oSelectedModel = this.getOwnerComponent().getModel("selectedGL");
        //     //  this.getOwnerComponent().setModel(oSelectedModel, "selected");

        //     if (!oSelectedModel || !oSelectedModel.getData()) {
        //         MessageToast.show("Please select a GL record from the table.");
        //         return;
        //     }

        //     this.getOwnerComponent().getRouter().navTo("glrefpage");
        // },


    });
});