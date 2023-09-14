describe("My First Test", () => {
    it("clicks add", () => {
        cy.visit("http://localhost:3000/");
        cy.contains("+ Add resource").click();
        cy.contains("Resource name").type("blah");
        cy.contains("Author name").type("blah");
        cy.contains("URL").type("blah");
        cy.contains("Description").type("blah");
        cy.contains("Build phase").type(3);
        cy.contains("Reason").type("blah");
        cy.get("select").select("video");
        // cy.contains("I do not recommend this resource, having used it").parent().click();
    });
});
