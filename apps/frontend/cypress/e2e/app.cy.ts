describe("Интегрированные тесты для приложения", () => {
	beforeEach(() => {
		cy.intercept("GET", "http://localhost:5000/todos", {
			fixture: "todos.json",
		});

		cy.setCookie("accessToken", "test_access_token");
		cy.window().then((win) => {
			win.localStorage.setItem("refreshToken", "test_refresh_token");
		});

		cy.visit("http://localhost:4200/");

		const email = "aamuravyev@icloud.com";
		const password = "123456";

		cy.visit("/login");
		cy.get("input[name=email]").type(email, { force: true });
		cy.get("input[name=password]").type(`${password}{enter}`, {
			force: true,
		});
		cy.url().should("eq", "http://localhost:4200/");

		cy.getCookie("accessToken").should("exist");

		cy.window().should((win) => {
			const token = win.localStorage.getItem("refreshToken");
			expect(token).to.exist;
		});
	});

	afterEach(() => {
		cy.clearCookies();
		cy.window().then((win) => {
			win.localStorage.clear();
		});
	});

	describe("проверяем работу модальных окон", () => {
		it("модальное окно должно открываться по клику на задачу", () => {
			cy.getTodosLink().click({ force: true });
			cy.getTodo().first().click({ force: true });
			cy.getModal().should("exist");
		});

		it("модальное окно должно закрываться по клику на крестик", () => {
			cy.getTodosLink().click({ force: true });
			cy.getTodo().first().click({ force: true });
			cy.getModalCloseButton().click({ force: true });
			cy.getModal().should("not.exist");
		});

		it("модальное окно должно открываться с правильн", () => {
			cy.getTodosLink().click({ force: true });
			cy.getTodo().contains("Покушать!").click({ force: true });
			cy.getModal().contains("Покушать!").should("exist");
		});
	});
});
