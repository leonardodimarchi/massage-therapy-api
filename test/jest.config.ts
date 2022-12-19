import { Config } from "jest";

const config: Config = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: "../",
    testRegex: ".*\\.(test|spec)\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
        "**/*.(t|j)s"
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.test.json"
        }
    },
    moduleNameMapper: {
        "@/presenter/(.*)": [
            "<rootDir>/src/presenter/$1"
        ],
        "@/infra/(.*)": [
            "<rootDir>/src/infrastructure/$1"
        ],
        "@/domain/(.*)": [
            "<rootDir>/src/domain/$1"
        ],
        "test/(.*)": [
            "<rootDir>/test/$1"
        ]
    }
};

export default config;