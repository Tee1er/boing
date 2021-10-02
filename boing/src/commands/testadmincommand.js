let execute = function () {
    return Promise.resolve(`Administrator-only!`);
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
