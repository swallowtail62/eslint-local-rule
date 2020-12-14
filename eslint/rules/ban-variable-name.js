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
    const bannedWords = option ? option.words : [];
    return {
      VariableDeclarator: (node) => {
        if (bannedWords.includes(node.id.name)) {
          context.report({
            node,
            message: `The keyword ${node.id.name} is banned to be used as a variable name`,
          });
        }
      },
    };
  },
};
