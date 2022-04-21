import React from 'react';
import JobPostCard from '../cards/JobPostCard';

const JobPostsList = ({ jobPosts }) => {
  console.log(jobPosts);
  return (
    <>
      {jobPosts.map((jobPost) => (
        <JobPostCard key={jobPost.id} jobPost={jobPost} />
      ))}
    </>
  );
};

export default JobPostsList;
