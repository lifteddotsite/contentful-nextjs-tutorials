import Image from 'next/image';
import React from 'react';

const JobCard = ({ job }) => {
  console.log(job);
  return (
    <>
      <div>JobCard</div>
      <div>{job.title}</div>
      <Image
        src={job.company.logo.url}
        alt={job.company.logo.alt}
        width={job.company.logo.width}
        height={job.company.logo.height}
      />
    </>
  );
};

export default JobCard;
