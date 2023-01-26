import { useRouter } from 'next/router';
import React from 'react';

const ProjectPage = () => {
  const router = useRouter();

  console.log(
    'router.pathname , router.query :>> ',
    router.pathname,
    router.query
  );
  return <div>ProjectPage</div>;
};

export default ProjectPage;
