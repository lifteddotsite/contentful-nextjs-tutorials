import qs from 'qs';
import axios from 'axios';
import { companyReducer } from './utils';

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getCompaniesSlugs = async () => {
  const query = qs.stringify(
    {
      fields: ['slug'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/companies?${query}`);
  const rawSlugs = res.data.data;

  const slugs = rawSlugs.map((rawSlug) => {
    return rawSlug.attributes.slug;
  });
  return slugs;
};

export const getCompanyBySlug = async ({ slug }) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['logo', 'coverImage'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/companies?${query}`);
  const rawCompany = res.data.data[0];
  return companyReducer(rawCompany);
};
