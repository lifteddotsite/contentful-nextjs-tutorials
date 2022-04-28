import { client } from './client';
import { jobReducer } from './utils';

export const getJobs = async () => {
  const res = await client.getEntries({ content_type: 'job' });
  const rawJobs = res.items;

  const jobs = rawJobs.map((rawJob) => {
    return jobReducer(rawJob);
  });
  return jobs;
};
