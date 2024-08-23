import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { fetchUsers } from '../../services/api';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const columns = [
  {
    name: 'ID',
    selector: (row: User) => row.id,
    sortable: true,
  },
  {
    name: 'Avatar',
    cell: (row: User) => (
      <div className='avtar-wrapper'>
        <img src={row.avatar} alt="Avatar" />
      </div>
    ),
    sortable: false,
  },  
  {
    name: 'First Name',
    selector: (row: User) => row.first_name,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: (row: User) => row.last_name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row: User) => row.email,
    sortable: true,
  },
];

const DataTableComponent: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers(currentPage);
        // console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching users', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={12}
        onChangePage={handlePageChange}
        paginationPerPage={6}
      />
    </div>
  );
};

export default DataTableComponent;
