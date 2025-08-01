describe("Login", () => {
  beforeEach(() => {
    cy.intercept("GET", "/users/me", {
      statusCode: 401,
      body: {},
    }).as("getMe");

    cy.visit("/login");
  });

  it("[VALIDATION] should not validate any field", () => {
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="email-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");

    cy.get('[data-cy="password-error"]')
      .should("be.visible")
      .and("have.class", "text-destructive");
  });

  it("[VALIDATION] should show error email format and password length", () => {
    cy.get('input[name="email"]').type("teste@teste");
    cy.get('input[name="password"]').type("Ab");
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="email-error"]')
      .should("be.visible")
      .and("contain.text", "Email inválido")
      .and("have.class", "text-destructive");

    cy.get('[data-cy="password-error"]')
      .should("be.visible")
      .and("contain.text", "Senha tem que ter no mínimo 3 caracteres")
      .and("have.class", "text-destructive");
  });

  it("should login", () => {
    type Credentials = {
      email: string;
      password: string;
    };
    const credentials = Cypress.env("login") as Credentials;

    cy.get('input[name="email"]').type(credentials.email);
    cy.get('input[name="password"]').type(credentials.password);

    cy.get('[data-cy="login-button"]').click();

    cy.url().should("include", "/tasks");
  });

  it("should show invalid credentials toast", () => {
    cy.get('input[name="email"]').type("notfound@notfound.com");
    cy.get('input[name="password"]').type("notfound");

    cy.get('[data-cy="login-button"]').click();

    cy.get(".Toastify__toast--error")
      .should("be.visible")
      .and("contain.text", "Invalid credentials");
  });
});
