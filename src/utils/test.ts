export default {
	TestPkg: `,
    "ts-jest": "^24.0.0",
    "jest": "^24.1.0",
    "@types/jest": "^24.0.6",
    "faker": "^4.1.0",
    "@types/faker": "^4.1.5"`,
	TestCli: `,
    "db:setup": "ts-node -r tsconfig-paths/register ./src/test-util/setup.ts",
    "test": "yarn db:setup && jest --watchAll"`,
}
