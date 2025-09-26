sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ladera.glcreateaccount.controller.newgl", {

        onInit: function () {
        },


        onnavback: function () {
            // Now navigate back
            this.getOwnerComponent().getRouter().navTo("creategl", {}, true);
        },
    });
});