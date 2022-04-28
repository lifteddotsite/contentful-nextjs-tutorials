import date from 'date-and-time';

export const dateReducer = (dateStr) => {
  const dateObj = date.parse(dateStr.split('T')[0], 'YYYY-MM-DD');
  return dateObj.toDateString();
};

export const imageReducer = (imageField) => {
  return {
    url: `https:${imageField.fields.file.url}`,
    alt: imageField.fields.title,
    height: imageField.fields.file.details.image.height,
    width: imageField.fields.file.details.image.width,
    contentType: imageField.fields.file.contentType,
  };
};

export const companyReducer = (rawCompany) => {
  let company = { ...rawCompany.fields };
  company.id = rawCompany.sys.id;
  company.locale = rawCompany.sys.locale;
  company.logo = imageReducer(rawCompany.fields.logo);
  company.coverImage = imageReducer(rawCompany.fields.coverImage);
  return company;
};

export const jobReducer = (rawJob, parseRelatedJobs = true) => {
  let job = { ...rawJob.fields };

  job.id = rawJob.sys.id;
  job.locale = rawJob.sys.locale;
  job.datePosted = dateReducer(rawJob.fields.datePosted);
  job.company = companyReducer(rawJob.fields.company);

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
