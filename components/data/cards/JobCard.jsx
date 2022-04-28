import React from 'react';

const JobCard = ({ job }) => {
  console.log(job);
  return (
    <>
      <div>JobCard</div>
      <div>{job.title}</div>
    </>
  );
};

export default JobCard;
