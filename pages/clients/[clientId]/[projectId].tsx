import { useRouter } from 'next/router';
import React from 'react';

const ClientProject = () => {
  const { query } = useRouter();
  return <div>ClientProject {query.projectId} </div>;
};

export default ClientProject;
