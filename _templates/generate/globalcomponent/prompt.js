module.exports = {
    prompt: async ({ prompter, args }) => {
        let { name } = args?.name
            ? { name: args.name }
            : await prompter.prompt({
                  type: 'input',
                  name: 'name',
                  message: 'Qual será o nome do componente?',
              });
        return { name };
    },
};
