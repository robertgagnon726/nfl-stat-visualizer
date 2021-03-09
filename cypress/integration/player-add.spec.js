describe("Player add tests", () => {
  beforeEach(() => {
    cy.intercept('https://scrambled-api.mysportsfeeds.com/v2.1/pull/nfl/**').as('getSeasonStats');
    cy.visit('')
  })
  it('On player add input blur, input is disabled while loading and input is cleared after load is complete.', () => {
    let val = 'testing123';
    cy.wait('@getSeasonStats');
    cy.get('#add-player-input').type(val).blur();
    cy.get('#add-player-input').should('be.disabled');
    cy.wait('@getSeasonStats');
    cy.get('#add-player-input').should('not.be.disabled');
    cy.get('#add-player-input').invoke('val').then((res) => {
      expect(res).to.eq('');
    });
  });
  it('User can hide and unhide new player from chart', () => {
    let val = 'patrick mahomes';
    let initialColor;
    let disabledColor;

    cy.wait('@getSeasonStats');
    cy.get('#add-player-input').type(val).blur();

    cy.wait('@getSeasonStats');
    cy.contains('patrick-mahomes')
      .should('have.css', 'color').then(res => {
        initialColor = res;
      })
    
    cy.contains('patrick-mahomes').click({force: true});
    cy.contains('patrick-mahomes')
      .should('have.css', 'color').then(res => {
        disabledColor = res;

        expect(disabledColor).to.not.eq(initialColor);
      })
  });
  it('Adding a duplicate player is prevented', () => {
    let val = 'tom brady';

    cy.wait('@getSeasonStats');
    cy.get('#add-player-input').type(val).blur();

    cy.wait('@getSeasonStats');
    cy.contains('tom-brady').then(res => {
      expect(res.length).to.eq(1)
    })
  });
  it('An invalid name should not be added to the chart', () => {
    let val = 'testing';

    cy.wait('@getSeasonStats');
    cy.get('#add-player-input').type(val).blur();

    cy.wait('@getSeasonStats');
    cy.contains(val).should('not.exist')
  });
})