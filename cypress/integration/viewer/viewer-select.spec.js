import selectors from '../../selectors';

describe('Select a fixture to view', () => {
    it('display first item fixture initially', () => {
        cy
            .visit('')
            .then(assertFirstFixture);
    });

    it('displays fixture upon click', () => {
        cy
            .visit('')
            .then(assertFixtureClick1);
    });

    it('displays proper fixtures when clicking on different fixtures', () => {
        cy
            .visit('')
            .then(assertFixtureClick1)
            .then(assertFixtureClick2);
    });
});

function assertFirstFixture() {
    return cy
        .get('.bp3-tree-node')
        .eq(1)
        .click()
        .get(selectors.viewer.actionBar)
        .should('contain', 'DELETE')
        .should('contain', '200')
        .should('contain', '/api/test')
        .get(selectors.viewer.code)
        .should('contain', 'const data = "Ok";');
}

function assertFixtureClick1() {
    return cy
        .get('.bp3-tree-node')
        .eq(2)
        .click()
        .get(selectors.viewer.actionBar)
        .should('contain', 'GET')
        .should('contain', '200')
        .should('contain', '/api/test')
        .get(selectors.viewer.code)
        .should('contain', 'const handler = function handler');
}

function assertFixtureClick2() {
    return cy
        .get('.bp3-tree-node')
        .eq(9)
        .click()
        .get(selectors.viewer.actionBar)
        .should('contain', 'GET')
        .should('contain', '200')
        .should('contain', '/api/test/:id')
        .get(selectors.viewer.code)
        .should('contain', 'return res.send(id)');
}
