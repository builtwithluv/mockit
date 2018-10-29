import selectors from '../../selectors';

describe('Select a fixture to view', () => {
    it('display first item fixture initially', () => {
        cy
            .visit('/mockit')
            .then(assertFirstFixture);
    });

    it('displays fixture upon click', () => {
        cy
            .visit('/mockit')
            .then(assertFixtureClick1);
    });

    it('displays proper fixtures when clicking on different fixtures', () => {
        cy
            .visit('/mockit')
            .then(assertFixtureClick1)
            .then(assertFixtureClick2);
    });
});

function assertFirstFixture() {
    return cy
        .get(selectors.sidebar.childNode)
        .eq(0)
        .click()
        .get(selectors.viewer.actionBar)
        .should('contain', 'GET')
        .should('contain', '200')
        .should('contain', '/api/nested')
        .get(selectors.viewer.code)
        .should('contain', '"firstName": "Cheng"');
}

function assertFixtureClick1() {
    return cy
        .get(selectors.sidebar.childNode)
        .eq(2)
        .click()
        .get(selectors.viewer.actionBar)
        .should('contain', 'DELETE')
        .should('contain', '200')
        .should('contain', '/api/test')
        .get(selectors.viewer.code)
        .should('contain', "Ok");
}

function assertFixtureClick2() {
    return cy
        .get(selectors.sidebar.childNode)
        .eq(10)
        .click()
        .get(selectors.viewer.actionBar)
        .should('contain', 'GET')
        .should('contain', '200')
        .should('contain', '/api/test/:id')
        .get(selectors.viewer.code)
        .should('contain', 'return res.send(id)');
}
