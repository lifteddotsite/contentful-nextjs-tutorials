import Link from 'next/link';

const JobDetails = ({ job }) => {
  console.log(job);
  return (
    <>
      <Link href='/'>
        <a className='text-indigo-400'>Back To Jobs</a>
      </Link>
      <div>{job.title}</div>
    </>
  );
};

export default JobDetails;
