import selectors from '../../selectors';

describe('Sets fixture as active', () => {
    beforeEach(() => {
        cy.resetTesty();
    });

    it('set fixture as active when set active button is clicked', () => {
        cy
            .visit('/testy')
            .get(selectors.sidebar.childNode)
            .eq(1)
            .find(selectors.sidebar.treeNodeActiveIndicator)
            .should('have.length', 0)
            .get(selectors.sidebar.childNode)
            .eq(1)
            .click()
            .get(selectors.viewer.setActiveButton)
            .click()
            .get(selectors.sidebar.childNode)
            .eq(1)
            .find(selectors.sidebar.treeNodeActiveIndicator)
            .should('have.length', 1);
    });
});
