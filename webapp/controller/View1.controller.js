sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.glcreateaccount.controller.View1", {
        onInit() {
        },
        oncreategl:function(){
            this.getOwnerComponent().getRouter().navTo("creategl")
        }
    });
});