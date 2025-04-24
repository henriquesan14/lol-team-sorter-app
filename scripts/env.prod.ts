const fs = require('fs');

const file = `export const environment = {
  production: true,
  apiUrl: '${process.env['API_URL']}',
  discordClientId: '${process.env['DISCORD_CLIENT_ID']}',
  discordRedirectUri: '${process.env['DISCORD_REDIRECT_URI']}'
};`;

fs.writeFileSync('./src/environments/environment.prod.ts', file);