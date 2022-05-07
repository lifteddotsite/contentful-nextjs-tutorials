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

export const getJobsSlugs = async () => {
  const rawSlugs = await client.getEntries({
    content_type: 'job',
    select: ['fields.slug'],
  });
  const slugs = rawSlugs.items.map((rawSlug) => rawSlug.fields.slug);
  return slugs;
};

export const getJobBySlug = async ({ slug }) => {
  const found = await client.getEntries({
    content_type: 'job',
    'fields.slug': slug,

    // needed to fetch linked items, otherwise job.fields.relatedJobs[0].fields.company.fields is undefined
    // https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/links/retrieval-of-linked-items
    include: 2,
  });

  if (found.items.length == 0) return null;
  const job = found.items[0];
  return jobReducer(job);
};

export const getJobsByCompanyId = async ({ id }) => {
  const res = await client.getEntries({
    content_type: 'job',
    'fields.company.sys.id': id,
    include: 2,
  });

  const rawJobs = res.items;
  const jobs = rawJobs.map((rawJob) => {
    return jobReducer(rawJob);
  });
  return jobs;
};

export const searchJobs = async (query) => {
  const found = await client.getEntries({
    content_type: 'job',
    include: 2,
    'fields.remoteOk': query.remoteOk,
    'fields.featuredJob': query.featuredJobsOnly,
  });

  if (found.items.length == 0) return null;
  const job = found.items[0];
  return jobReducer(job);
};
