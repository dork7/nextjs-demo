import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const ClientProjects = () => {
  const { query, push } = useRouter();

  const loadProject = () => {
    push('/clients/max/projectA');
  };
  return (
    <div>
      ClientProjects {query.clientId}
      <button onClick={loadProject}>Go to projects</button>
    </div>
  );
};

export default ClientProjects;
