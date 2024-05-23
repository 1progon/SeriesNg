let domain = 'https://kinoteka.top';
let apiDomain = 'https://api.kinoteka.top';
let fileServer = apiDomain;

export const environment = {
  production: true,
  domain,
  apiDomain,
  fileServer,
  apiUrl: apiDomain + '/api/',
  imagesPath: fileServer + '/images/'
};
