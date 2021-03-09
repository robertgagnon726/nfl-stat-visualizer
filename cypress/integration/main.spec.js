describe('Main End to End Tests', () => {
  beforeEach(() => {
    cy.intercept('https://scrambled-api.mysportsfeeds.com/v2.1/pull/nfl/**').as('getSeasonStats');
    cy.visit('');
  })
  it('Page should contain page title and buttons for the two charts', () => {
    cy.contains('NFL Stat Visualizer');
    cy.contains('Season Line Chart');
    cy.contains('Season Bar Chart');
  })

  it('Application should initially display a loader overlay', () => {
    cy.get('#loader-backdrop');
  })

  it('Loader should be hidden once external requests are completed', () => {
    cy.wait('@getSeasonStats').then(() => {
      cy.get('#loader-backdrop').should('not.be.visible')
    })
  })


  describe('Line Chart', () => {
    it('Clicking chart should toggle click state', () => {
      cy.wait('@getSeasonStats').then(() => {
        let firstColor = '';
        let secondColor = '';
        let thirdColor = '';
        cy.get(".recharts-data-point-no-click:first")
          .invoke('attr', 'fill')
          .then(($style1) => {
            firstColor = $style1
          })
        cy.get(".recharts-cartesian-grid-vertical line:first").click({force: true});

        cy.get(".recharts-data-point-click:first")
        .invoke('attr', 'fill')
        .then(($style2) => {
          secondColor = $style2

          expect(firstColor).to.not.equal(secondColor);
        })

        cy.get(".recharts-cartesian-grid-vertical line:first").click({force: true});

        cy.get(".recharts-data-point-no-click:first")
        .invoke('attr', 'fill')
        .then(($style3) => {
          thirdColor = $style3

          expect(firstColor).to.equal(thirdColor);
        })
      })
    });
    it('Clicking legend item toggles visibility for corresponding line from graph', () => {
      cy.wait('@getSeasonStats').then(() => {
        let firstColor = '';
        let secondColor = '';
        let thirdColor = '';

        cy.contains('tom-brady').invoke('css', 'color').then(res => {
          firstColor = res;
        })

        cy.get('.recharts-line').then(res => {
          expect(res.length).to.eq(6)
        })

        cy.contains('tom-brady').click()

        cy.contains('tom-brady').invoke('css', 'color').then(res => {
          secondColor = res;
        })
        
        cy.get('.recharts-line').then(res => {
          expect(res.length).to.eq(5)
        })

        cy.contains('tom-brady').click()

        cy.get('.recharts-line').then(res => {
          expect(res.length).to.eq(6)
        })

        cy.contains('tom-brady').invoke('css', 'color').then(res => {
          thirdColor = res;

          expect(firstColor).to.eq(thirdColor);
          expect(firstColor).to.not.eq(secondColor);
        })
      })
    });
  });

  describe('Bar Chart', () => {
    beforeEach(() => {
      cy.contains("Season Bar Chart").click();
    })
    it('Clicking chart should toggle click state', () => {
      cy.wait('@getSeasonStats').then(() => {
        let firstColor = '';
        let secondColor = '';
        let thirdColor = '';
        cy.get(".recharts-rectangle:first")
          .invoke('attr', 'fill')
          .then(($style1) => {
            firstColor = $style1
          })
        cy.get(".recharts-rectangle:first").click({force: true});

        cy.get(".recharts-rectangle:first")
        .invoke('attr', 'fill')
        .then(($style2) => {
          secondColor = $style2

          expect(firstColor).to.not.equal(secondColor);
        })

        cy.get(".recharts-rectangle:first").click({force: true});

        cy.get(".recharts-rectangle:first")
        .invoke('attr', 'fill')
        .then(($style3) => {
          thirdColor = $style3

          expect(firstColor).to.equal(thirdColor);
        })
      })
    });
    it('Clicking legend item toggles visibility for corresponding bar from graph', () => {
      cy.wait('@getSeasonStats').then(() => {
        let firstColor = '';
        let secondColor = '';
        let thirdColor = '';

        // eslint-disable-next-line
        cy.wait(500)

        cy.contains('tom-brady').invoke('css', 'color').then(res => {
          firstColor = res;
        })

        cy.get('.recharts-rectangle').then(res => {
          expect(res.length).to.be.gt(35)
        })

        cy.contains('tom-brady').click()

        // eslint-disable-next-line
        cy.wait(500)

        cy.contains('tom-brady').invoke('css', 'color').then(res => {
          secondColor = res;
        })
        
        cy.get('.recharts-rectangle').then(res => {
          expect(res.length).to.eq(30)
        })

        cy.contains('tom-brady').click()

        // eslint-disable-next-line
        cy.wait(500)

        cy.get('.recharts-rectangle').then(res => {
          expect(res.length).to.eq(36)
        })

        cy.contains('tom-brady').invoke('css', 'color').then(res => {
          thirdColor = res;

          expect(firstColor).to.eq(thirdColor);
          expect(firstColor).to.not.eq(secondColor);
        })
      })
    });
  })

  describe('Application Navigation', () => {
    it('Clicking nav buttons toggles chart view', () => {
      cy.get("#line-chart");
      cy.get("#bar-chart").should('not.exist');
      cy.contains('Season Bar Chart').click().then(() =>  {
        cy.get("#line-chart").should('not.exist');
        cy.get("#bar-chart");
      })
  });
  })
})


// Add tests for hover display on each chart