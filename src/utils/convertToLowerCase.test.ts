import { convertToLowerCase } from "./convertToLowerCase";

test("convert array of strings to lower case", () => {
    expect(
        convertToLowerCase(["React", "HTML", "cSS", "JavaScript"])
    ).toStrictEqual(["react", "html", "css", "javascript"]);
    expect(
        convertToLowerCase(["", "HTML", "css", "Java-Script"])
    ).toStrictEqual(["", "html", "css", "java-script"]);
});
