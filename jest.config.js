module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/App.js',
        '!src/index.js',
        '!src/reportWebVitals.js',
        '!src/setupTests.js',
    ],
    coverageReporters: ['text', 'lcov'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60,
        },
    },
};
