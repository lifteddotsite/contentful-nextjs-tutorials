import date from 'date-and-time';

export const dateReducer = (dateStr) => {
  const dateObj = date.parse(dateStr.split('T')[0], 'YYYY-MM-DD');
  return dateObj.toDateString();
};

export const jobReducer = (rawJob, parseRelatedJobs = true) => {
  let job = { ...rawJob.fields };

  job.id = rawJob.sys.id;
  job.locale = rawJob.sys.locale;
  job.datePosted = dateReducer(rawJob.fields.datePosted);

  const relatedJobs = rawJob.fields.relatedJobs || [];

  if (!parseRelatedJobs) {
    job.relatedJobs = [];
  } else {
    job.relatedJobs = relatedJobs.map((relatedJob) => {
      return jobReducer(relatedJob, false);
    });
  }

  return job;
};
