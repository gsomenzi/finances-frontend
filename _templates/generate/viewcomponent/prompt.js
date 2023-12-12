module.exports = {
    prompt: async ({ prompter, args }) => {
        let { route } = args?.route
            ? { route: args.route }
            : await prompter.prompt({
                  type: 'input',
                  name: 'route',
                  message: 'Qual é a rota da view?',
              });
        let { name } = args?.name
            ? { name: args.name }
            : await prompter.prompt({
                  type: 'input',
                  name: 'name',
                  message: 'Qual será o nome do componente?',
              });
        return { name, route };
    },
};
