describe("Navigation", () => {
  it("should navigate to register", () => {
    cy.intercept("GET", "/users/me", {
      statusCode: 401,
      body: {},
    }).as("getMe");

    cy.visit("/login");
    cy.get('[data-cy="navigate-register"]').click();
    cy.url().should("include", "/register");
    cy.get('[data-cy="register-button"]').should("be.visible");
  });
});
