sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("ladera.glcreateaccount.controller.glrefpage", {
       
onInit: function () {
    const oSelectedModel = this.getOwnerComponent().getModel("selectedGL");
    this.getView().setModel(oSelectedModel, "selectedGL");
},



        onnavback: function () {
            this.getOwnerComponent().getRouter().navTo("creategl",{}, true);
        },
    });
});