import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import rule, { MessageIds, RULE_NAME } from '../../src/rules/use-deleted-null';

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser')
});

const validStatements = [
    `
    const user = this.prisma.user.findFirst({
        where: {
            id: 1,
            deleted: null
        },
    });
    `
];

const invalid = [
    `
    const user = this.prisma.user.findFirst({
        where: {
            id: 1,
        },
    });
    `
];

const messageId: MessageIds = 'readonlyInjectableRequired';

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        { code: invalid[0], errors: [{ messageId }] },
    ]
});