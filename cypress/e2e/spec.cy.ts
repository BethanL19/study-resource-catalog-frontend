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
        cy.get("select").select("article");
        cy.get('input[value="I recommend this resource after having used it"]')
            .parent()
            .click();
        // cy.intercept(
        //     {
        //         method: "POST",
        //         url: `${baseURL}/resources/new`,
        //     },
        //     [] // and force the response to be: []
        // ).as("postResource");
        cy.contains("Submit").click();
        // cy.get("@postResource").its("request.body").should("deep.equal", {
        //     resource_name: "Writing your first E2E test",
        //     author_name: "Cypress.io",
        //     url: "https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test",
        //     description: "How to start testing a new project in Cypress.",
        //     content_type: "article",
        //     build_phase: "12",
        //     recommender_id: 1,
        //     recommender_comment:
        //         "I recommend this resource after having used it",
        //     recommender_reason:
        //         "This helped us a lot when setting up our first E2E test",
        // });
        cy.wait(1000);
        // cy.get(".resource").should(
        //     "contain",
        //     "https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test"
        // );
        cy.contains("a", "link").should(
            "have.attr",
            "href",
            "https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test"
        );

        // cy.request("DELETE", `${baseURL}/resources/cypress`);
    });
});
