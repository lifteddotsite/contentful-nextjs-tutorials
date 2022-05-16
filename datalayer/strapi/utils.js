import date from 'date-and-time';

const assetsBaseUrl = process.env.STRAPI_API_BASE_URL.replace('/api', '');

export const dateReducer = (dateStr) => {
  const dateObj = date.parse(dateStr.split('T')[0], 'YYYY-MM-DD');
  return dateObj.toDateString();
};

export const richTextReducer = (rawRichtext) => {
  return rawRichtext;
  const parsedRichText = documentToHtmlString(rawRichtext);
  let styledRichText = parsedRichText.replace(
    '<ul>',
    "<ul style='list-style-type: circle;'>"
  );
  return styledRichText;
};

export const imageReducer = (imageField) => {
  const fields = imageField.data.attributes;
  return {
    url: `${assetsBaseUrl}${fields.url}`,
    alt: `${fields.caption}`,
    height: fields.height,
    width: fields.width,
    contentType: fields.mime,
  };
};

export const companyReducer = (rawCompany) => {
  let company = { ...rawCompany.attributes };
  company.id = rawCompany.id;
  company.logo = imageReducer(company.logo);
  company.coverImage = imageReducer(company.coverImage);
  return company;
};

export const skillsReducer = (tagsField) => {
  if (!tagsField) return [];
  let tags = [];
  tagsField.data.map((rawTag) => {
    const tag = rawTag.attributes.name;
    tags.push(tag);
  });
  return tags;
};

export const jobReducer = (rawJob, parseRelatedJobs = true) => {
  let job = { ...rawJob.attributes };
  job.id = rawJob.id;

  job.datePosted = dateReducer(job.datePosted);
  job.company = companyReducer(job.company.data);
  job.aboutYou = richTextReducer(job.aboutYou);
  job.remunerationPackage = richTextReducer(job.remunerationPackage);
  job.jobResponsibilities = richTextReducer(job.jobResponsibilities);
  job.jobDescription = richTextReducer(job.jobDescription);
  job.skills = skillsReducer(job.skillsTags);

  const relatedJobs = job.relatedJobs || [];

  if (!parseRelatedJobs) {
    job.relatedJobs = [];
  } else {
    job.relatedJobs = relatedJobs.data.map((relatedJob) => {
      return jobReducer(relatedJob, false);
    });
  }

  return job;
};
