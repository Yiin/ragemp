module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": "last 1 Chrome version",
            },
        ],
        "@babel/preset-react",
    ],
    "plugins": [
        "react-hot-loader/babel",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-spread",
    ],
};
