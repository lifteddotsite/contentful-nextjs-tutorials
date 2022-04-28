import { client } from './client';

export const getJobs = async () => {
  const jobs = await client.getEntries({ content_type: 'job' });
  console.log(jobs.items);
  jobs.items.map((job) => {
    job.fields.relatedJobs = [];
    return job;
  });
  return jobs.items;
};
