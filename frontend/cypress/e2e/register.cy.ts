describe("Register", () => {
  beforeEach(() => {
    cy.intercept("GET", "/users/me", {
      statusCode: 401,
      body: {},
    }).as("getMe");

    cy.visit("/register");
  });

  it("[VALIDATION] should not validate any field", () => {
    cy.get('[data-cy="register-button"]').click();

    cy.get('[data-cy="name-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");

    cy.get('[data-cy="email-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");

    cy.get('[data-cy="password-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");
  });

  it("[VALIDATION] should show error name and password length", () => {
    cy.get('input[name="name"]').type("A");
    cy.get('input[name="password"]').type("Ab");
    cy.get('[data-cy="register-button"]').click();

    cy.get('[data-cy="name-error"]')
      .should("be.visible")
      .and("contain.text", "Nome tem que ter no mínimo 2 caracteres")
      .and("have.class", "text-destructive");

    cy.get('[data-cy="password-error"]')
      .should("be.visible")
      .and("contain.text", "Senha tem que ter no mínimo 3 caracteres")
      .and("have.class", "text-destructive");
  });

  it("[VALIDATION] should show error email format", () => {
    cy.get('input[name="email"]').type("teste@teste");
    cy.get('[data-cy="register-button"]').click();

    cy.get('[data-cy="email-error"]')
      .should("be.visible")
      .and("contain.text", "Email inválido")
      .and("have.class", "text-destructive");
  });

  it("should register", () => {
    // WARNING: if the user already exists on db, this test will fail
    type Data = {
      name: string;
      email: string;
      password: string;
    };
    const data = Cypress.env("register") as Data;

    cy.get('input[name="name"]').type(data.name);
    cy.get('input[name="email"]').type(data.email);
    cy.get('input[name="password"]').type(data.password);

    cy.get('[data-cy="register-button"]').click();

    cy.get(".Toastify__toast--success")
      .should("be.visible")
      .and("contain.text", "User already exists");

    cy.url().should("include", "/login");
  });

  it("should show user already registered toast", () => {
    type Data = {
      name: string;
      email: string;
      password: string;
    };
    const data = Cypress.env("register") as Data;

    cy.get('input[name="name"]').type(data.name);
    cy.get('input[name="email"]').type(data.email);
    cy.get('input[name="password"]').type(data.password);

    cy.get('[data-cy="register-button"]').click();

    cy.get(".Toastify__toast--error")
      .should("be.visible")
      .and("contain.text", "User already exists");
  });
});
