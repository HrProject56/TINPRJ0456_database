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
            interpreter_args: '-r ts-node/register'
        }
    ]
};