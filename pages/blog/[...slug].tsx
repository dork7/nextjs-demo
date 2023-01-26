import { useRouter } from 'next/router';
import React from 'react';

const BlogPostPage = () => {
  const { query } = useRouter();
  console.log('router', query);
  return <div>BlogPostPage {JSON.stringify(query)} </div>;
};

export default BlogPostPage;
