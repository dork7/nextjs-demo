import Link from 'next/link';
import React from 'react';

const ClientsPage = () => {
  const clients = [
    { id: 'lol', name: 'lol' },
    { id: 'dev', name: 'dev' },
    { id: 'test', name: 'test' },
    { id: 'dev2', name: 'dev2' },
  ];

  return (
    <div>
      ClientsPage
      <ul>
        {clients.map(({ id, name }) => (
          <li key={id}>
            <Link href={{ pathname: '/clients/[id]', query: { id } }}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
