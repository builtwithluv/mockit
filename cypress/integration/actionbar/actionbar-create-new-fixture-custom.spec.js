import selectors from '../../selectors';

describe('Create new fixture by custom', () => {
    afterEach(() => {
        cy.resetMockit();
    });

    it('create a new fixture with just required data', () => {
        cy
            .visit('')
            .get(selectors.actionbar.newBtn)
            .click()
            .get(selectors.actionbar.dialog.newDialog)
            .should('be.visible')
            .get(selectors.actionbar.dialog.tabs.cusTab)
            .click()
            .get(selectors.actionbar.dialog.newDialogUrlInp)
            .type('/integration-testing')
            .get(selectors.actionbar.dialog.newDialogSaveBtn)
            .click()
            .get(selectors.snackbar.message)
            .should('be.visible')
            .get(selectors.sidebar.parentNode)
            .contains(selectors.sidebar.parentNode, '/integration-testing')
            .find(selectors.sidebar.childNode)
            .should('contain', 'GET')
            .should('contain', '200')
            .should('contain', 'No description added')
    });

    it('creates a fixture with all data', () => {
        cy
            .visit('')
            .get(selectors.actionbar.newBtn)
            .click()
            .get(selectors.actionbar.dialog.newDialog)
            .should('be.visible')
            .get(selectors.actionbar.dialog.tabs.cusTab)
            .click()
            .get(selectors.actionbar.dialog.newDialogUrlInp)
            .type('/integration-testing')
            .get(selectors.actionbar.dialog.newDialogCustomDataInp)
            .type('{{} "hello": "world" }', { force: true })
            .get(selectors.actionbar.dialog.newDialogMethodInp)
            .clear()
            .type('POST')
            .get(selectors.actionbar.dialog.newDialogStatusInp)
            .clear()
            .type('400')
            .get(selectors.actionbar.dialog.newDialogDescriptionInp)
            .type('This description is for integration testing')
            .get(selectors.actionbar.dialog.newDialogSaveBtn)
            .click()
            .get(selectors.snackbar.message)
            .should('be.visible')
            .get(selectors.sidebar.parentNode)
            .contains(selectors.sidebar.parentNode, '/integration-testing')
            .find(selectors.sidebar.childNode)
            .should('contain', 'POST')
            .should('contain', '400')
            .should('contain', 'This description is for integration testing')
            .click()
            .get(selectors.viewer.code)
            .should('contain', 'hello')
            .should('contain', 'world');
    });
});
