let execute = function () {
    return Promise.resolve(
        `You should need administrator permission for this?`,
    );
};

module.exports = {
    execute,
    info: {
        name: "testadmincommand",
        descrip: "**Admin-only.** stuff",
        longDescrip: "**Admin-only.** stuff",
        adminOnly: true,
    },
};
