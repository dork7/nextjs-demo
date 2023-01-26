import { useRouter } from 'next/router';
import React from 'react';

const SingleBlogPage = () => {
  const { query } = useRouter();

  return <div>SingleBlogPage {query.id} </div>;
};

export default SingleBlogPage;
