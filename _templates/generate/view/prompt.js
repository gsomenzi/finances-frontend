module.exports = {
    prompt: async ({ prompter, args }) => {
        let { route } = args?.route
            ? { route: args.route }
            : await prompter.prompt({
                  type: 'input',
                  name: 'route',
                  message: 'Qual será a rota para acessar a view?',
              });
        route = route.replace(/^\//, '');
        route = route.replace(/\/$/, '');
        const name = String(route).split('/').pop() ?? 'undefined';
        return { route, name };
    },
};
