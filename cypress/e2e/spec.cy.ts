import { contains } from "cypress/types/jquery";
import { baseURL } from "../../src/config";

describe("Test the request body of posting a resource", () => {
    it("adds a resource", () => {
        cy.visit("http://localhost:3000/");
        cy.contains("+ Add resource").click();
        cy.contains("Resource name").type("Writing your first E2E test");
        cy.contains("Author name").type("Cypress.io");
        cy.contains("URL").type(
            "https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test"
        );
        cy.contains("Description").type(
            "How to start testing a new project in Cypress."
        );
        cy.contains("Build phase").type("12");
        cy.contains("Reason").type(
            "This helped us a lot when setting up our first E2E test"
        );
        cy.contains("Tags (separated by commas)").type("React");
        cy.get('option[value="article"]').parent().select("article");
        cy.get('input[value="I recommend this resource after having used it"]')
            .parent()
            .click();
        cy.contains("Submit").click();
        cy.wait(1000);
        cy.contains("a", "link").should(
            "have.attr",
            "href",
            "https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test"
        );

        cy.request("DELETE", `${baseURL}/resources/cypress`);
    });
});
