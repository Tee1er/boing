let execute = function () {
    return Promise.resolve(
        `You should need administrator permission for this?`,
    );
};

module.exports = {
    execute,
    info: {
        name: "testadmincommand",
        descrip: "stuff",
        longDescrip: "stuff",
        adminOnly: true,
    },
};
