describe("Protected Route", () => {
  it("should not access protected route", () => {
    cy.visit("/tasks", { failOnStatusCode: false });
    cy.url().should("include", "/login");
  });

  it("should access protected route", () => {
    cy.request(
      "POST",
      `${Cypress.env("backend")}/auth/login`,
      Cypress.env("login"),
    ).then((response) => {
      expect(response.body).to.have.property("accessToken");
    });

    cy.visit("/tasks");
    cy.url().should("include", "/tasks");
  });
});
