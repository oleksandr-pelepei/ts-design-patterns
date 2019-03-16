const os = require('os');

export interface Parser {
    parse(data: string): {};
}

export class CsvParser implements Parser {
    static CONTAINS_HEADER = true;
    static CONTAINS_NO_HEADER = false;

    public constructor(
        private containsHeader: boolean
    ) {}

    public parse(data: string) {
        let parsedLines = [];

        parsedLines = data.split(os.EOL);

        parsedLines = parsedLines.map((line: string, index: number) : string[] => {
            return line.split(',');
        });

        if (!this.containsHeader) {
            parsedLines.pop();
        }
        

        return parsedLines;
    } 
}


export class JsonParser implements Parser {
    public parse(data: string) {
        return JSON.parse(data);
    } 
}

export class ParserFactory {
    public createCsvParser(constainsHeader: boolean) : CsvParser {
        return new CsvParser(constainsHeader);
    }

    public createJsonParser() : JsonParser {
        return new JsonParser();
    }
}
