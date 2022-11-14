import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import rule, { MessageIds, RULE_NAME } from '../../src/rules/use-deleted-null';

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser')
});

const valid = [
    `const user = this.prisma.user.findFirst({ where: { deleted: null, id: 1 }, });`,
    `const user = this.prisma.user.findFirst({ where: { deletedAt: null, id: 1 }, });`
];

const invalid = [
    `const user = this.prisma.user.findFirst({ where: { id: 1 }, });`
];

const messageId: MessageIds = 'deletedNullFilterRequired';

ruleTester.run(RULE_NAME, rule, {
    valid: valid,
    invalid: [
        { code: invalid[0], errors: [{ messageId }], output: valid[0] },
    ]
});