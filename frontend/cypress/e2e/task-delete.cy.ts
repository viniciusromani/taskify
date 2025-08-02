describe("Task Delete", () => {
  let createdTaskId: string;

  beforeEach(() => {
    cy.login();
    cy.visit("/tasks");
    cy.createTask({
      title: "Teste",
      description: "Descrição teste",
      status: "finished",
    }).then((taskId) => {
      createdTaskId = taskId;
      cy.visit(`/tasks/${createdTaskId}`);
    });
  });

  it("should delete", () => {
    cy.get('[data-cy="task-delete"]').first().click();
    cy.url().should("include", "/tasks");
    cy.get('[data-cy="empty-title"]')
      .should("be.visible")
      .and("contain.text", "Sem tarefas cadastradas");
  });
});
