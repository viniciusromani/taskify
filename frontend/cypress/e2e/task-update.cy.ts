describe("Task Update", () => {
  let createdTaskId: string;

  beforeEach(() => {
    cy.login();
    cy.createTask({
      title: "Teste",
      description: "Descrição teste",
      status: "finished",
    }).then((taskId) => {
      createdTaskId = taskId;
      cy.visit(`/tasks/${createdTaskId}`);
    });
  });

  afterEach(() => {
    // TODO: it might be better to hard delete on db
    if (createdTaskId) {
      cy.deleteTask(createdTaskId);
      createdTaskId = undefined;
    }
  });

  it("[VALIDATION] should not validate title with no typing", () => {
    cy.get('input[name="title"]').clear();
    cy.get('textarea[name="description"]').clear();

    cy.get('[data-cy="submit-task-form"]').click();

    cy.get('[data-cy="title-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");
  });

  it("[VALIDATION] should show error title and description length", () => {
    cy.get('input[name="title"]').clear().type("A");
    cy.get('textarea[name="description"]').clear().type("A");
    cy.get('[data-cy="submit-task-form"]').click();

    cy.get('[data-cy="title-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");

    cy.get('[data-cy="description-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");
  });

  it("should update status", () => {
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "true");
    cy.get('[role="switch"]').click();

    cy.get('[data-cy="submit-task-form"]').click();

    cy.get('[role="switch"]').should("have.attr", "aria-checked", "false");

    cy.get(".Toastify__toast--success")
      .should("be.visible")
      .and("contain.text", "Tarefa atualizada com sucesso!");

    cy.get('[data-cy="task-status-badge"]')
      .should("be.visible")
      .and("have.class", "bg-yellow-100")
      .and("have.class", "text-yellow-800")
      .and("have.class", "border-yellow-200");
  });

  it("should update with all fields changed without clearing", () => {
    const title = " - All fields task";
    const description = " - All fields task description";

    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="description"]').type(description);
    cy.get('[role="switch"]').click();

    cy.get('[data-cy="submit-task-form"]').click();

    cy.get('input[name="title"]').should("contain.value", title);
    cy.get('textarea[name="description"]').should("contain.value", description);
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "false");

    cy.get(".Toastify__toast--success")
      .should("be.visible")
      .and("contain.text", "Tarefa atualizada com sucesso!");
  });

  it("should update with all fields erased and re-typed", () => {
    const title = "Task retyped";
    const description = "Some description";

    cy.get('input[name="title"]').clear().type(title);
    cy.get('textarea[name="description"]').clear().type(description);

    cy.get('[data-cy="submit-task-form"]').click();

    cy.get('input[name="title"]').should("have.value", title);
    cy.get('textarea[name="description"]').should("have.value", description);
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "true");

    cy.get(".Toastify__toast--success")
      .should("be.visible")
      .and("contain.text", "Tarefa atualizada com sucesso!");
  });

  it("should update without description", () => {
    cy.get('textarea[name="description"]').clear();

    cy.get('[data-cy="submit-task-form"]').click();

    cy.get('textarea[name="description"]').should("have.value", "");

    cy.get(".Toastify__toast--success")
      .should("be.visible")
      .and("contain.text", "Tarefa atualizada com sucesso!");
  });
});
