module.exports = {
    apps: [
        {
            name: 'express-typescript',
            script: 'src/index.ts',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            exec_mode: 'fork',
            interpreter: 'node',
            interpreter_args: '-r ts-node/register',
            env: {
                "EXPRESS_PORT": 3000,
                "NODE_ENV": "development"
            },
            env_production: {
                "EXPRESS_PORT": 8000,
                "NODE_ENV": "production",
            }
        }
    ]
};