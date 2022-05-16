let datasource = {};

import * as strapiJobAPI from './contentful/job';
import * as strapiCompanyAPI from './contentful/company';
if (process.env.DATALAYER_ENGINE === 'contentful')
  datasource = { ...contentfulCompanyAPI, ...contentfulJobAPI };

import * as contentfulJobAPI from './strapi/job';
import * as contentfulCompanyAPI from './strapi/company';
if (process.env.DATALAYER_ENGINE === 'strapi')
  datasource = { ...strapiCompanyAPI, ...strapiJobAPI };

export default datasource;
