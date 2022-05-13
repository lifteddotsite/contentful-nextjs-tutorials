import qs from 'qs';
import axios from 'axios';
import { jobReducer } from './utils';

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getJobs = async () => {
  const query = qs.stringify(
    {
      populate: [
        'company',
        'company.logo',
        'company.coverImage',
        'relatedJobs',
        'relatedJobs.company',
        'relatedJobs.company.logo',
        'relatedJobs.company.coverImage',
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawJobs = res.data.data;

  const jobs = rawJobs.map((rawJob) => {
    return jobReducer(rawJob);
  });
  return jobs;
};

export async function getJobsSkills() {
  return [];
}
