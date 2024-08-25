import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../services/api';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface DataTableComponentProps {
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  setTotalUsers: (total: number) => void;
  setTotalPages: (totalPages: number) => void;
  totalUsers: number
}







const DataTableComponent: React.FC<DataTableComponentProps> = ({
  currentPage, 
  perPage, 
  onPageChange, 
  onPerPageChange, 
  setTotalUsers, 
  setTotalPages,
  totalUsers
}) => {
  
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers(currentPage);
        console.log(response);
        setData(response.data.data);
        
        onPerPageChange(response.data.per_page);
        setTotalUsers(response.data.total);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching users', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage, onPerPageChange, setTotalUsers, setTotalPages]);

  const handleUpdateClick = (userId: number) => {
    navigate(`/update-user/${userId}`);
  };

  const handleDeleteClick = async (userId: number) => {
    try {
      const response = await deleteUser(userId);
  
      if (response.status === 204) {
        console.log('User successfully deleted');
        setData(data.filter(user => user.id !== userId));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

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
    {
      name: '',
      cell: (row: User) => (
        <>
          <img className='table-icon' src='/Assets/images/update-icon.png' onClick={() => handleUpdateClick(row.id)} alt='Update' />
          <img className='table-icon' src='/Assets/images/delete-icon.png' onClick={() => handleDeleteClick(row.id)} alt='Delete' />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className='data-table-container'>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalUsers}
        onChangePage={onPageChange}
        paginationPerPage={perPage}
      />
    </div>
  );
};

export default DataTableComponent;
