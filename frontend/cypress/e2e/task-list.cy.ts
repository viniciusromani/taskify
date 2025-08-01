describe("Task List", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/tasks");
  });

  it("should show screen", () => {
    cy.get('[data-cy="add-task"]').should("be.visible");

    cy.get('[data-cy="empty-container"]').should("be.visible");

    cy.get('[data-cy="empty-title"]')
      .should("be.visible")
      .and("contain.text", "Sem tasks cadastradas");

    cy.get('[data-cy="empty-description"]')
      .should("be.visible")
      .and(
        "contain.text",
        'Verifique o filtro selecionado ou crie uma task através do botão "+" no topo da tela. Organize sua rotina agora mesmo!',
      );
  });
});
