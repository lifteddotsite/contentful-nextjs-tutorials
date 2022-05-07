import { searchJobs } from '../../datalayer';

export default async function handler(req, res) {
  const query = req.query;
  const jobs = await searchJobs({ remoteOk: false });
  res.status(200).json(jobs);
}
