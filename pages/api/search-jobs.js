import { searchJobs, searchCompaniesButReturnJobs } from '../../datalayer';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function handler(req, res) {
  const { searchFormState, sideBarFormState } = req.body;

  const minBaseSalary =
    sideBarFormState.baseSalaryBounds.length > 0
      ? Math.min(...sideBarFormState.baseSalaryBounds)
      : 0;

  const maxBaseSalary =
    sideBarFormState.baseSalaryBounds.length > 0
      ? Math.max(...sideBarFormState.baseSalaryBounds)
      : 1000000;

  const jobTypes = sideBarFormState.jobTypes.map((jobType) =>
    capitalizeFirstLetter(jobType)
  );

  const experienceLevels = sideBarFormState.experienceLevels.map(
    (experienceLevel) => capitalizeFirstLetter(experienceLevel)
  );

  const query = {
    ...sideBarFormState,
    searchBarText: searchFormState,
    minBaseSalary,
    maxBaseSalary,
    jobTypes,
    experienceLevels,
  };

  console.log(query);

  // search in the jobs entities
  const jobs1 = await searchJobs(query);

  // seatch in the job entities by company name
  let jobs2 = [];
  if (query.searchBarText) {
    jobs2 = await searchCompaniesButReturnJobs(query.searchBarText);
  }

  // merge the two results
  let jobs1Ids = jobs1.map((job) => job.id);
  jobs2.map((job2) => {
    if (!jobs1Ids.includes(job2.id)) {
      jobs1.push(job2);
    }
  });

  res.status(200).json(jobs1);
}
