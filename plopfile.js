module.exports = function (plop) {
    // controller generator
    plop.setGenerator('command', {
        description: 'boing bot command',
            prompts: [
                {
                type: 'input',
                name: 'name',
                message: 'Command name please:'
            },
            {
                type: 'input',
                name: 'descrip',
                message: 'Command description:'
            }
        ],
        actions: [{
            type: 'add',
            path: './boing/src/commands/{{name}}.js',
            templateFile: './boing/src/commands/template.hbs'
        }]
    });
};