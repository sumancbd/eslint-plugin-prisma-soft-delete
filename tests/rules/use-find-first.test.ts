import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import rule, { MessageIds, RULE_NAME } from '../../src/rules/use-find-first';

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser')
});

const valid = [
    `const user = this.prisma.user.findFirst({ where: { id: 1 }, });`,
    `const user = this.prisma.user.findFirstOrThrow({ where: { id: 1 }, });`
];

const invalid = [
    `const user = this.prisma.user.findUnique({ where: { id: 1 }, });`,
    `const user = this.prisma.user.findUniqueOrThrow({ where: { id: 1 }, });`
];

const messageId: MessageIds = 'findFirstFilterRequired';

ruleTester.run(RULE_NAME, rule, {
    valid: valid,
    invalid: [
        { code: invalid[0], errors: [{ messageId }], output: valid[0] },
    ]
});