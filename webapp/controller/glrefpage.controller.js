sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("ladera.glcreateaccount.controller.glrefpage", {
       
onInit: function () {
   
    const router = this.getOwnerComponent().getRouter();
    router.getRoute("glrefpage").attachPatternMatched(this.onObjectMatched,this);
},
onObjectMatched(){
    const oSelectedModel = this.getOwnerComponent().getModel("selectedGL");
    this.getView().setModel(oSelectedModel, "selectedGL");
},
onnavback: function () {
    const oSelectedModel = this.getOwnerComponent().getModel("selectedGL");

    if (oSelectedModel) {
        oSelectedModel.setData({}); // Clear the model safely
        this.getOwnerComponent().setModel(null, "selectedGL"); // Unset the model to ensure it is completely cleared
    } else {
        console.warn("selectedGL model is not defined.");
    }

    // Now navigate back
    this.getOwnerComponent().getRouter().navTo("creategl", {}, true);
},
    });
});