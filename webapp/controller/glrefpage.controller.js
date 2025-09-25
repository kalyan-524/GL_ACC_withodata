sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("ladera.glcreateaccount.controller.glrefpage", {
       
onInit: function () {
    // var sSelectedItemId = this.getOwnerComponent().getModel("appState").getProperty("/selectedItemId");
    // const oSelectedModel = this.getOwnerComponent().getModel("selectedGL");
    // this.getView().setModel(oSelectedModel, "selectedGL");
    // this.getOwnerComponent().getModel("appState").setProperty("/selectedItemId", null);
    // // Optional: Force rebind if using bindElement
    // this.getView().bindElement({
    //     path: "/",
    //     model: "selectedGL"
    // });
    const router = this.getOwnerComponent().getRouter();
    router.getRoute("glrefpage").attachPatternMatched(this.onObjectMatched,this);
},
onObjectMatched(){
    const oSelectedModel = this.getOwnerComponent().getModel("selectedGL");
    this.getView().setModel(oSelectedModel, "selectedGL");
},
onnavback: function () {

    // var olist = sap.ui.getCore().byID("glDetailsTable");
    // var osel = olist.getSelectedItem();

    // olist.setSelectedItem(osel,false);

    //const oTable = this.byId("glDetailsTable"); // Replace with your actual table ID
    // const oSelectedItem = oTable.getSelectedItem(); // Get the selected item from the table

    // if (oSelectedItem) {
    //     oSelectedItem.setSelected(false); // Deselect the item
    // }
    // Clear the selection model before navigation
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