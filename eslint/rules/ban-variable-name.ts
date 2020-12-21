import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/types";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Ban some keywords from being used as a variable name",
      category: "Variables",
    },
    schema: [
      {
        type: "object",
        properties: {
          words: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const [option] = context.options;
    const bannedWords = option?.words ?? [];
    return {
      VariableDeclarator: (node: TSESTree.VariableDeclarator) => {
        const { id } = node as { id: TSESTree.Identifier };
        if (
          bannedWords.includes(id.name) &&
          id.typeAnnotation?.typeAnnotation.type ===
            AST_NODE_TYPES.TSStringKeyword
        ) {
          context.report({
            node,
            message: `The keyword ${id.name} is banned to be used as a variable name`,
          });
        }
      },
    };
  },
};
