export const RULE_NAME = 'use-deleted-null';
export type MessageIds = 'deletedNullFilterRequired';
export type Options = [];
import { ANY_FIND_SELECTOR } from '../utils/selectors'
import { TSESTree } from '@typescript-eslint/utils';
import { createEslintRule } from '../utils/create-eslint-rule'
import { CallExpression } from 'typescript';
import { Identifier, ObjectExpression, Property } from '@typescript-eslint/types/dist/generated/ast-spec';
import { RuleContext, RuleFix, RuleFixer, } from '@typescript-eslint/utils/dist/ts-eslint';

const useDeletedNull = createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'force to use deleted=null filter',
            recommended: 'error'
        },
        schema: [],
        messages: {
            deletedNullFilterRequired: 'The where property should have deleted:null filter to get records that are not soft-deleted'
        },
        fixable: 'code',
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_FIND_SELECTOR](node: TSESTree.CallExpression) {
                const expression = node.parent?.parent
                if (expression) {
                    const callExpression: CallExpression = expression as unknown as CallExpression;
                    const firstArgument: ObjectExpression = callExpression.arguments[0] as unknown as ObjectExpression

                    const whereProperty = firstArgument.properties.find(
                        (prop) => {
                            const property = prop as unknown as Property;
                            const key = property.key as unknown as Identifier;
                            return key.name === 'where'
                        }
                    )
                    if (whereProperty) {
                        const wherePropertyObj = whereProperty as unknown as Property;
                        const wherePropertyObjValues = wherePropertyObj.value as unknown as ObjectExpression
                        const deletedProperty = wherePropertyObjValues.properties.find(
                            (prop, index) => {
                                const property = prop as unknown as Property;
                                const key = property.key as unknown as Identifier;
                                return key.name === 'deleted'
                            }
                        )
                        if(!deletedProperty) {
                            context.report({
                                messageId: 'deletedNullFilterRequired',
                                loc: node.loc,
                                fix: (fixer: RuleFixer) => {
                                    const identifier = wherePropertyObj

                                    const [startRange, endRange] = identifier.value.range
                                    
                                    const newRange: readonly [number, number] = [startRange + 1, endRange];
                                    
                                    const fixers: Array<RuleFix> = [
                                       fixer.insertTextBeforeRange(newRange, ' deleted: null,')
                                    ];
                                    return fixers;
                                 }
                            });
                        }
                    }
                }
            }
        }
    }
});

export default useDeletedNull;