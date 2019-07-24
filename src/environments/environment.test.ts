const packageJson = require('../../package.json');

export const environment = {
  appName: 'Angular Ngrx Material Starter',
  envName: 'TEST',
  production: false,
  test: true,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: "AIzaSyDVf77weCBE7uC52dS05Sf_VUsFqbh5XKc",
    authDomain: "gene-111.firebaseapp.com",
    databaseURL: "https://gene-111.firebaseio.com",
    projectId: "gene-111",
    storageBucket: "",
    messagingSenderId: "811871196430",
    appId: "1:811871196430:web:dad45657db0eab8f"
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
