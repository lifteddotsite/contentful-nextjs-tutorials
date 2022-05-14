import qs from 'qs';
import axios from 'axios';
import { jobReducer } from './utils';

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getJobs = async () => {
  const query = qs.stringify(
    {
      populate: ['company', 'company.logo', 'company.coverImage', 'skillsTags'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawJobs = res.data.data;

  const jobs = rawJobs.map((rawJob) => {
    return jobReducer(rawJob, false);
  });
  return jobs;
};

export async function getJobsSkills() {
  const query = qs.stringify(
    {
      fields: ['name'],
      filters: {
        tagType: {
          $eq: 'skill',
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/tags?${query}`);
  const rawTags = res.data.data;

  const tags = rawTags.map((rawTag) => {
    return rawTag.attributes.name;
  });
  return tags;
}

export const getJobsSlugs = async () => {
  const query = qs.stringify(
    {
      fields: ['slug'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawSlugs = res.data.data;

  const slugs = rawSlugs.map((rawSlug) => {
    return rawSlug.attributes.slug;
  });
  return slugs;
};

export const getJobBySlug = async ({ slug }) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: [
        'company',
        'company.logo',
        'company.coverImage',
        'relatedJobs',
        'relatedJobs.company',
        'relatedJobs.company.logo',
        'relatedJobs.company.coverImage',
        'skillsTags',
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawJob = res.data.data[0];
  return jobReducer(rawJob);
};

export const getJobsByCompanyId = async ({ id }) => {
  const query = qs.stringify(
    {
      filters: {
        company: {
          id: {
            $eq: id,
          },
        },
      },
      populate: [
        'company',
        'company.logo',
        'company.coverImage',
        'skillsTags',
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawJobs = res.data.data;

  const jobs = rawJobs.map((rawJob) => {
    return jobReducer(rawJob, false);
  });
  return jobs;
};
