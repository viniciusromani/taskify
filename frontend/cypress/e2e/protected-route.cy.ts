describe("Protected Route", () => {
  it("should not access protected route", () => {
    cy.visit("/tasks", { failOnStatusCode: false });
    cy.url().should("include", "/login");
  });

  it("should access protected route", () => {
    cy.login();
    cy.visit("/tasks");
    cy.url().should("include", "/tasks");
  });
});
