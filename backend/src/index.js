const app = require('./app');
const { connect } = require('./database');

async function main() {

    await connect();

    await app.listen(process.env.PORT || 4000);
    console.log('[Server] Started...');
}

main();