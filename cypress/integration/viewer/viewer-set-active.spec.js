import selectors from '../../selectors';

describe('Sets fixture as active', () => {
    afterEach(() => {
        cy.resetMockit();
    });

    it('set fixture as active when set active button is clicked', () => {
        cy
            .visit('/mockit')
            .get(selectors.sidebar.childNode)
            .eq(3)
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
