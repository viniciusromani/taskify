describe("Task Create", () => {
  let createdTaskId: string;

  beforeEach(() => {
    cy.login();
    cy.visit("/tasks");
    cy.get('[data-cy="add-task"]').click();
  });

  afterEach(() => {
    // TODO: it might be better to hard delete on db
    if (createdTaskId) {
      cy.deleteTask(createdTaskId);
      createdTaskId = undefined;
    }
  });

  it("[VALIDATION] should not validate title with no typing", () => {
    cy.get('[data-cy="submit-task-form"]').click();

    cy.get('[data-cy="title-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");
  });

  it("[VALIDATION] should show error title and description length", () => {
    cy.get('input[name="title"]').type("A");
    cy.get('textarea[name="description"]').type("A");
    cy.get('[data-cy="submit-task-form"]').click();

    cy.get('[data-cy="title-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");

    cy.get('[data-cy="description-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");
  });

  it("should register with all fields changed", () => {
    const title = "All fields task";
    const description = "All fields task description";

    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="description"]').type(description);
    cy.get('[role="switch"]').click();

    cy.intercept("POST", "/tasks").as("createTask");
    cy.get('[data-cy="submit-task-form"]').click();

    cy.wait("@createTask").then((interception) => {
      const body = interception.response?.body as { id: string };
      expect(body).to.have.property("id");
      createdTaskId = body.id;
    });

    cy.get("form").should("not.exist");
    cy.contains(title).should("be.visible");
    cy.contains(description).should("be.visible");
  });

  it("should register without description", () => {
    const title = "Task without description";

    cy.get('input[name="title"]').type(title);

    cy.intercept("POST", "/tasks").as("createTask");
    cy.get('[data-cy="submit-task-form"]').click();

    cy.wait("@createTask").then((interception) => {
      const body = interception.response?.body as { id: string };
      expect(body).to.have.property("id");
      createdTaskId = body.id;
    });

    cy.get("form").should("not.exist");
    cy.contains(title).should("be.visible");
  });

  it("should register with erased description", () => {
    const title = "Task with typed and then cleared description";
    const description = "Some description";

    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="description"]').type(description).clear();
    cy.get('[role="switch"]').click();

    cy.intercept("POST", "/tasks").as("createTask");
    cy.get('[data-cy="submit-task-form"]').click();

    cy.wait("@createTask").then((interception) => {
      const body = interception.response?.body as { id: string };
      expect(body).to.have.property("id");
      createdTaskId = body.id;
    });

    cy.get("form").should("not.exist");
    cy.contains(title).should("be.visible");
  });
});
