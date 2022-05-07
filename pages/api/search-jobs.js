import { searchJobs } from '../../datalayer';

export default async function handler(req, res) {
  const { searchFormState, sideBarFormState } = req.body;
  const query = {
    ...sideBarFormState,
    searchBarText: searchFormState,
    minBaseSalary: Math.min(...sideBarFormState.baseSalaryBounds) || 0,
    maxBaseSalary: Math.max(...sideBarFormState.baseSalaryBounds) || 1000000,
  };
  const jobs = await searchJobs(query);
  res.status(200).json(jobs);
}
