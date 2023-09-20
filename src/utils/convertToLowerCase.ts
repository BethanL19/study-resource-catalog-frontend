export function convertToLowerCase(arrayOfStrings: string[]): string[] {
    const lowerCaseArray: string[] = arrayOfStrings.map((string) =>
        string.toLowerCase()
    );
    return lowerCaseArray;
}
