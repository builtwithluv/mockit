import selectors from '../../selectors';

describe('Create new fixture by url', () => {
    afterEach(() => {
        cy.resetTesty();
    });

    it('creates a fixture with api data', () => {
        cy
            .visit('')
            .get(selectors.actionbar.newBtn)
            .click()
            .get(selectors.actionbar.dialog.newDialog)
            .should('be.visible')
            .get(selectors.actionbar.dialog.tabs.apiTab)
            .click()
            .get(selectors.actionbar.dialog.newDialogApiUrlInp)
            .type('http://localhost:3000/api/test')
            .get(selectors.actionbar.dialog.newDialogApiOptionsInp)
            .type('{{} "method": "POST" }', { force: true })
            .get(selectors.actionbar.dialog.newDialogApiSubmitBtn)
            .click()
            .get(selectors.actionbar.dialog.newDialogApiDataInp)
            .should('contain', '{"firstName":"Cheng","lastName":"Ly"}')
            .get(selectors.actionbar.dialog.newDialogMethodInp)
            .should('have.value', 'POST')
            .get(selectors.actionbar.dialog.newDialogStatusInp)
            .should('have.value', '200')
            .get(selectors.actionbar.dialog.newDialogDescriptionInp)
            .type('This description is for integration testing')
            .get(selectors.actionbar.dialog.newDialogSaveBtn)
            .click()
            .get(selectors.snackbar.message)
            .should('be.visible')
            .get(selectors.sidebar.childNode)
            .eq(6)
            .should('contain', 'POST')
            .should('contain', '200')
            .should('contain', 'This description is for integration testing')
            .click()
            .get(selectors.viewer.code)
            .should('contain', 'Cheng');
    });
});
