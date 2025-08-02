describe("Task List", () => {
  const task = {
    title: "Teste",
    description: "Descrição teste",
  };
  const createdTasksIds = [];

  beforeEach(() => {
    cy.login();
    cy.visit("/tasks");
  });

  after(() => {
    if (createdTasksIds) {
      createdTasksIds.forEach((id) => cy.deleteTask(id));
    }
  });

  it("should show screen with no tasks", () => {
    cy.get('[data-cy="add-task"]').should("be.visible");

    cy.get('[data-cy="empty-container"]').should("be.visible");

    cy.get('[data-cy="empty-title"]')
      .should("be.visible")
      .and("contain.text", "Sem tarefas cadastradas");

    cy.get('[data-cy="empty-description"]')
      .should("be.visible")
      .and(
        "contain.text",
        'Verifique o filtro selecionado ou crie uma tarefa através do botão "+" no topo da tela. Organize sua rotina agora mesmo!',
      );
  });

  it("[FILTER] should show finished tasks", () => {
    cy.createTask({ ...task, status: "finished" }).then((taskId) =>
      createdTasksIds.push(taskId),
    );

    cy.get('[data-cy="filter-finished"]').click();

    cy.get('[data-cy="filter-finished"]')
      .should("have.class", "bg-primary")
      .and("have.class", "opacity-60")
      .and("have.class", "text-primary-foreground");

    cy.contains(task.title).should("be.visible");
    cy.contains(task.description).should("be.visible");
    cy.get('[data-cy="task-status-badge"]')
      .should("be.visible")
      .and("have.class", "bg-green-100")
      .and("have.class", "text-green-800")
      .and("have.class", "border-green-200");
  });

  it("[FILTER] should show pending tasks", () => {
    cy.createTask({ ...task, status: "pending" }).then((taskId) =>
      createdTasksIds.push(taskId),
    );

    cy.get('[data-cy="filter-pending"]').click();

    cy.get('[data-cy="filter-pending"]')
      .should("have.class", "bg-primary")
      .and("have.class", "opacity-60")
      .and("have.class", "text-primary-foreground");

    cy.contains(task.title).should("be.visible");
    cy.contains(task.description).should("be.visible");
    cy.get('[data-cy="task-status-badge"]')
      .should("be.visible")
      .and("have.class", "bg-yellow-100")
      .and("have.class", "text-yellow-800")
      .and("have.class", "border-yellow-200");
  });

  it("[FILTER] should show all tasks", () => {
    cy.get('[data-cy="filter-all"]')
      .should("have.class", "bg-primary")
      .and("have.class", "opacity-60")
      .and("have.class", "text-primary-foreground");

    cy.get('[data-cy="task-card"]')
      .filter(`:contains("${task.title}")`)
      .should("have.length", 2);

    cy.get('[data-cy="task-card"]')
      .filter(`:contains("${task.description}")`)
      .should("have.length", 2);

    cy.get('[data-cy="task-status-badge"]').should("have.length", 2);
  });
});
