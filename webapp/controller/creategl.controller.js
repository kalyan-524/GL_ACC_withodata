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
            const oTable = this.byId("glDetailsTable"); // your table id
            if (oTable) {
            oTable.removeSelections(true); // clears selection
            }

            // Navigate to the object page
            this.getOwnerComponent().getRouter().navTo("glrefpage");
},
ongoPress: function () {
    var oModel = this.getView().getModel();   // ODataModel (ZRK_GLCREATION_SRV)
    var oLocalModel = this.getView().getModel("local");
    var oRefGLInput = this.byId("refGLNum"); 

    // Clear Reference GL field
    if (oRefGLInput) {
        oRefGLInput.setValue("");
    }

    // Clear previous GL details from the local model
    oLocalModel.setProperty("/GLDetails", []);

    oModel.read("/GLAccDataSet", {
        success: function (oData) {
            // oData.results contains array of GL accounts
            oLocalModel.setProperty("/GLDetails", oData.results);
        },
        error: function (oError) {
            console.error("Error while fetching all GL Accounts", oError);
            sap.m.MessageToast.show("Failed to load GL Accounts");
        }
    });
},
onCreatePress: function () {
    // Create a fresh JSONModel to hold new GL Account data
    // var oNewGL = new sap.ui.model.json.JSONModel({
    //     Glaccnum: "",
    //     CompanyCode: "",
    //     GlaccType: "",
    //     AccountGroup: "",
    //     AccountCurrency: ""
    // });

    // Attach it to the component with name "newGL"
    // this.getOwnerComponent().setModel(oNewGL, "newGL");

    // Navigate to the creation page (glrefpage)
    this.getOwnerComponent().getRouter().navTo("newgl");
}




    });
});