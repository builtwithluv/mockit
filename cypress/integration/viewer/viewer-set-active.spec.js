import selectors from '../../selectors';

describe('Sets fixture as active', () => {
    it('set fixture as active when set active button is clicked', () => {
        cy
            .visit('/testy')
            .get(selectors.sidebar.treeNode)
            .eq(2)
            .find(selectors.sidebar.treeNodeActiveIndicator)
            .should('have.length', 0)
            .get(selectors.sidebar.treeNode)
            .eq(2)
            .click()
            .get(selectors.viewer.setActiveButton)
            .click()
            .get(selectors.sidebar.treeNode)
            .eq(2)
            .find(selectors.sidebar.treeNodeActiveIndicator)
            .should('have.length', 1);
    });
});
