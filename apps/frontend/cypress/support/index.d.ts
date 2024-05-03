// Inside a .d.ts file, such as cypress/support/index.d.ts
declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to select DOM element by data-cy attribute for modal.
		 * @example cy.getModal()
		 */
		getModal(): Chainable<JQuery<HTMLElement>>;

		/**
		 * Custom command to select DOM element by data-cy attribute for modal overlay.
		 * @example cy.getModalOverlay()
		 */
		getModalOverlay(): Chainable<JQuery<HTMLElement>>;

		/**
		 * Custom command to select DOM element by data-cy attribute for modal close button.
		 * @example cy.getModalCloseButton()
		 */
		getModalCloseButton(): Chainable<JQuery<HTMLElement>>;

		/**
		 * Custom command to select DOM element by data-cy attribute for todo.
		 * @example cy.getTodo()
		 */
		getTodo(): Chainable<JQuery<HTMLElement>>;
	}
}
