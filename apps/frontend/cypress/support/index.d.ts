declare namespace Cypress {
	interface Chainable {
		getModal(): Chainable<JQuery<HTMLElement>>;

		getModalOverlay(): Chainable<JQuery<HTMLElement>>;

		getModalCloseButton(): Chainable<JQuery<HTMLElement>>;

		getTodo(): Chainable<JQuery<HTMLElement>>;

		getTodosLink(): Chainable<JQuery<HTMLElement>>;
	}
}
