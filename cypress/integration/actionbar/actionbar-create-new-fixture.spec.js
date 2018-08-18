import selectors from '../../selectors';

describe('Create new fixture', () => {
    afterEach(() => {
        cy.resetTesty();
    });

    it('create a new fixture with just required data', () => {
        cy
            .visit('/testy')
            .get(selectors.actionbar.newBtn)
            .click()
            .get(selectors.actionbar.newDialog)
            .should('be.visible')
            .get(selectors.actionbar.newDialogUrlInp)
            .type('/integration-testing')
            .get(selectors.actionbar.newDialogSaveBtn)
            .click()
            .get(selectors.snackbar.message)
            .should('be.visible')
            .get(selectors.sidebar.parentNode)
            .contains('/integration-testing')
            .should('have.length', 1)
            .get(selectors.sidebar.childNode)
            .eq(8)
            .should('contain', 'GET')
            .should('contain', '200')
            .should('contain', 'No description added')
    });

    it('creates a fixture with all data', () => {
        cy
            .visit('/testy')
            .get(selectors.actionbar.newBtn)
            .click()
            .get(selectors.actionbar.newDialog)
            .should('be.visible')
            .get(selectors.actionbar.newDialogUrlInp)
            .type('/integration-testing')
            .get(selectors.actionbar.newDialogDataInp)
            .type('{{} "hello": "world" }')
            .get(selectors.actionbar.newDialogMethodInp)
            .clear()
            .type('POST')
            .get(selectors.actionbar.newDialogStatusInp)
            .clear()
            .type('400')
            .get(selectors.actionbar.newDialogIdInp)
            .type('INTEGRATION_TESTING')
            .get(selectors.actionbar.newDialogFilenameInp)
            .type('POST_400_INTEGRATION_TESTING')
            .get(selectors.actionbar.newDialogDescriptionInp)
            .type('This description is for integration testing')
            .get(selectors.actionbar.newDialogSaveBtn)
            .click()
            .get(selectors.snackbar.message)
            .should('be.visible')
            .get(selectors.sidebar.parentNode)
            .contains('/integration-testing')
            .should('have.length', 1)
            .get(selectors.sidebar.childNode)
            .eq(9)
            .should('contain', 'POST')
            .should('contain', '400')
            .should('contain', 'This description is for integration testing')
            .click()
            .get(selectors.viewer.code)
            .should('contain', 'hello')
            .should('contain', 'world');
    });
});
