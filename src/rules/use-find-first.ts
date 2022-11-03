export const RULE_NAME = 'use-find-first';
export type MessageIds = 'findFirstFilterRequired';
export type Options = [];
import { FIND_UNIQUE_SELECTOR } from '../utils/selectors'
import {AST_NODE_TYPES, TSESTree} from '@typescript-eslint/utils';
import { createEslintRule } from '../utils/create-eslint-rule'
import { RuleContext, RuleFix, RuleFixer, } from '@typescript-eslint/utils/dist/ts-eslint';

const useFindFirst = createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'force to use findFirst or findFirstOrThrow filter',
            recommended: 'error'
        },
        schema: [],
        messages: {
            findFirstFilterRequired: 'FindFirst or FindFirstOrThrow must be used instead of FindUnique or FindUniqueOrThrow'
        },
        fixable: 'code',
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [FIND_UNIQUE_SELECTOR](node: TSESTree.Node) {
                if (node.type === AST_NODE_TYPES.Identifier && ['findUnique', 'findUniqueOrThrow'].includes(node.name)) {
                    context.report({
                        messageId: 'findFirstFilterRequired',
                        loc: node.loc,
                        fix: (fixer: RuleFixer) => {
                            const fixers: Array<RuleFix> = [
                                fixer.replaceTextRange(node.range, 'findFirst')
                            ];
                            return fixers;
                        }
                    });
                }
            }
        }
    }
});

export default useFindFirst;