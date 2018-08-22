export default {
    actionbar: {
        root: '[data-tag="actionbar"]',
        newBtn: '[data-tag="actionbar-new-open-btn"]',

        dialog: {
            newDialog: '.bp3-dialog',
            newDialogUrlInp: '[data-tag="actionbar-new-dialog-url"]',
            newDialogCustomDataInp: '#actionbar-new-dialog-custom-data .ace_text-input',
            newDialogApiUrlInp: '[data-tag="actionbar-new-dialog-api-url"]',
            newDialogApiDataInp: '#actionbar-new-dialog-api-data',
            newDialogApiOptionsInp: '#actionbar-new-dialog-api-options .ace_text-input',
            newDialogApiSubmitBtn: '[data-tag="actionbar-new-dialog-api-btn"]',
            newDialogMethodInp: '[data-tag="actionbar-new-dialog-method"]',
            newDialogStatusInp: '[data-tag="actionbar-new-dialog-status"]',
            newDialogDescriptionInp: '[data-tag="actionbar-new-dialog-description"]',
            newDialogSaveBtn: '[data-tag="actionbar-new-dialog-save-btn"]',

            tabs: {
                cusTab: '[data-tab-id="cus"]',
                apiTab: '[data-tab-id="url"]',
            },
        },

    },
    sidebar: {
        root: '[data-tag="sidebar"]',
        childNode: '[data-tag="sidebar-parent-node-item"]',
        parentNode: '[data-tag="sidebar-parent-node"]',
        treeNode: '.bp3-tree-node',
        treeNodeActiveIndicator: '.bp3-icon',
    },
    snackbar: {
        message: '[data-tag="snackbar-message"]',
    },
    viewer: {
        actionBar: '[data-tag="viewer-action-bar"',
        code: '[data-tag="viewer-code"]',
        setActiveButton: '[data-tag="viewer-action-bar-set-active-btn"]',
    },
}
