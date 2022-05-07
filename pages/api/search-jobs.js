import { searchJobs } from '../../datalayer';

export default async function handler(req, res) {
  const { searchFormState, sideBarFormState } = req.body;
  const query = {
    ...sideBarFormState,
    searchBarText: searchFormState,
  };
  const jobs = await searchJobs(query);
  res.status(200).json(jobs);
}
