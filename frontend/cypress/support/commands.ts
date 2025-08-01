/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    deleteTask(id: string): Chainable<void>;
  }
}

type Credentials = {
  email: string;
  password: string;
};

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("backend")}/auth/login`,
    body: Cypress.env("login") as Credentials,
  }).then((response) => {
    expect(response.body).to.have.property("accessToken");
  });
});

Cypress.Commands.add("deleteTask", (id) => {
  cy.request({
    method: "DELETE",
    url: `${Cypress.env("backend")}/tasks/${id}`,
    failOnStatusCode: false,
  }).then((response) => {
    expect([204, 404]).to.include(response.status);
  });
});
