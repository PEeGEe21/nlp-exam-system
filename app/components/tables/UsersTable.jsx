'use client'

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDisclosure } from '@chakra-ui/react';
import { 
    Form, 
    Button, 
    Flex, 
    Table, 
    Tag, 
    Space, 
    InputNumber, 
    Input, 
    Typography, 
    Popconfirm ,
    Spin
} from 'antd';
import Link from 'next/link';
import {LoaderIcon, LoaderIcon2} from '../../components/ui/IconComponent';
import {successOptions} from '../../lib/constants';
import { Edit, PenTool, PenTool2, Trash } from 'iconsax-react';
import toast from 'react-hot-toast';
// import EditUserModal from '../Modals/user/EditUserModal';
import { logout } from '../../utils/common';
import axios from 'axios';
import { Recycle } from '@carbon/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleRedirect, hostUrl } from '@/app/lib/utils';
import EditUserModal from '../Modals/user/EditUserModal';


const UsersTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [user, setUser] = useState(null);
    const [statusState, setStatusState] = useState('');
    const [isSavingStatus, setIsSavingStatus] = useState({});
    // const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const {
        isOpen: userEditIsOpen,
        onOpen: onUserEditOpen,
        onClose: onUserEditClose,
    } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const router = useRouter();
    const { push } = useRouter();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(hostUrl + 'users');
            if (res.ok) {
            const result = await res.json();
            setDataSource(result.users);
            // setRoles(result.roles);
            }
        } catch (err) {
            console.error('Error fetching data:', err?.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const roles = [
        {
            id: 1,
            key: 'student',
            name: 'Student'
        },
        {
            id: 2,
            key: 'admin',
            name: 'Admin'
        },
        {
            id: 3,
            key: 'super_admin',
            name: 'Super Admin'
        }
    ]

    const cancel = (page) => {
        setEditingKey('');
        setCurrentPage(page);
    };

    const loginAsUser = (user) => {
        logout();
        router.push('/auth/login');
        toast.success('Successfully logged out')
        setTimeout(()=>{
            loginUser(user);
        }, 3000)
    }

    const loginUser = async (user) => {
        setLoading(true);
    
        axios
          .post(`${hostUrl}auth/login-in-as`, {
            email: user.email,
          })
          .then((res) => {
            if (res.data.success) {
              // toast.success(res.data.message, 'success');
                let token = res?.data?.access_token;
                let user = res?.data?.user;
                const role = res?.data?.user?.user_role;
                localStorage.setItem('access-exam-sysyem', token);
                localStorage.setItem('exam-system-user', JSON.stringify(user));
                setTimeout(() => {
                    handleRedirect(role, push);
                }, 300);
            } else {
              setError(true);
              let message = '';
              if (!res.data?.message) {
                message = 'An error occurred';
              } else {
                message = res.data?.message;
              }
              setErrMessage(message);
              // ToasterAlert(message, 'error');
              toast.error(message);
    
            }
    
            setLoading(false);
          })
          .catch((err) => {
            console.log('err', err);
            setError(true);
            setErrMessage(err?.response?.data?.message);
            toast.error(err?.response?.data?.message);
    
            // ToasterAlert(err?.response?.data?.message, 'error');
            setLoading(false);
    
            setTimeout(()=>{
              setError(false);
            }, 6000)
          });
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key:'index',
            render: (text, record, index) => (
                <a>{(currentPage - 1) * pageSize + index + 1}</a>
            ),
        },
        {
            key: '1',
            title: 'Username',
            dataIndex: 'username',
            render: (text, record, index) => (
                <span className="text-[#313131]">{record?.username}</span>
            ),
        },
        {
            key: '2',
            title: 'Email',
            dataIndex: 'email',
            render: (text, record, index) => (
                <span className="text-[#313131]">{record?.email}</span>
            ),
        },
        {
            key: '3',
            title: 'First Name',
            dataIndex: 'firstname',
            render: (text, record, index) => (
                <span className="text-[#313131]">{record?.profile?.firstname}</span>
            ),
        },
        {
            key: '4',
            title: 'Last Name',
            dataIndex: 'lastname',
            render: (text, record, index) => (
                <span className="text-[#313131]">{record?.profile?.lastname}</span>
            ),
        },
        {
            key: '5',
            title: 'Role',
            dataIndex: 'role',
            render: (text, record, index) => (
                <span className="text-[#313131]">{record?.user_role_name}</span>
            ),
        },
        {
            key: '6',
            title: 'Status',
            dataIndex: 'status',
            editable: false,
            render: (text, record, index) => (
                <Space size="middle">
                    {record.user_role !== 'super_admin' &&
                    <button
                        className={`btn text-sm flex items-center gap-2 ${record.is_active ? 'border-[#255625] bg-[#398439] text-white' : 'border-[#761c19] bg-[#c9302c] text-white'}`}
                        disabled={isSavingStatus[record.id]}
                        aria-disabled={isSavingStatus[record.id]}
                        onClick={
                            ()=>toggleCurrentPersonStatus(text, record, index, record.is_active)
                          }
                          >
                            {isSavingStatus[record.id] ? (
                                <>
                                    <LoaderIcon
                                        extraClass="text-white h-2 w-3"
                                        className="animate-spin mr-1"
                                    />
                                </>
                            ) : (
                                record.is_active ? 'Active' : 'Inactive'
                            )}
                    </button>}
                </Space>
            ),
        },
        {
            title: 'Action',
            key: '7',
            render: (_, record) => {
                return (
                        <Space size="middle">
                            <button 
                                className="flex btn-info items-center gap-1 text-xs" 
                                onClick={() => {
                                    setIsEditingUser(true);
                                    setCurrentUser(record);
                                    onUserEditOpen();
                                  }}
                            >
                                <Edit size={14}/>Edit
                            </button>
                            <button className='flex  btn-red items-center gap-1 text-xs  ' onClick={(e)=>deleteUser(record)}><Trash size={12}/> Delete</button>
                            {record.is_active && (
                            <button className='flex  btn-warning items-center gap-1 text-xs  ' onClick={(e)=>loginAsUser(record)}><Recycle size={12}/> Login As</button>)}
                        </Space>
                    )
            
            },
        },
    ];

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        fetchData();

        setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        }, 1000);
    };

    const hasSelected = selectedRowKeys.length > 0;

    const toggleCurrentPersonStatus = async(text, record, index, status) => {
        let key = record.id
        // key = "undefined";
        var msg = '';
        if (key == "undefined") {
            msg = "Record key is not defined:";
            console.error(msg);
            toast.error(msg, {
                position: "top-right"
            });
            return;
        }

        setCurrentUser(record);
        setStatusState(key);
        
        
        if(currentUser){
            
            setIsSavingStatus({
                [key]: true
            });
            try {
                    
                const updatedRecord = { ...record, is_active: record.is_active ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );
        
                await axios.post(`${hostUrl}users/update-active-status/`+record?.id);

                setDataSource(updatedDataSource);
        
                setTimeout(() => {
                    setIsSavingStatus({
                        [key]: false
                    });

                    msg = 'Successfully '+ (updatedRecord.is_active ? 'Activated' : 'Deactivated')  + '!!'
                    toast.success(msg, {
                        successOptions,
                        position: "top-right"
                    });
                }, 500);
            } catch (err) {
                setIsSavingStatus({
                    [key]: false
                });
                toast.error(err.message);
            }
        }
    };

    useEffect(() => {
    }, [currentUser, isSavingStatus]);

    const deleteUser = (data) => {
        Swal.fire({
            title: 'You\'re currently deleting' + ' ' + data.email,
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                  const response = await axios.delete(hostUrl + 'users/delete/'+ parseInt(data.id));
                  if(response.data.success) {
                    const newData = dataSource.filter((item) => item.id !== data.id);
                    setDataSource(newData);
                    Swal.fire(
                      'Deleted!',
                      'The User has been deleted.',
                     'success'
                    );
                  } else{
                    Swal.fire(
                        'Error',
                        'Delete Failed!',
                        'error'
                    );
                  }
                } catch (error) {
                  toast.error('An error occurred while deleting')
                }
            },
        }).then((result) => {
            
            // if (result.isConfirmed) {
            //     Swal.fire(
            //     'Deleted!',
            //     'The Role has been deleted.',
            //     'success'
            //     );
            // }
        });
    };

    return (
        <>
            {isLoading ? 
            (
                <div className='h-full flex items-center justify-center'>
                    <LoaderIcon
                        extraClass="text-[#034343] h-6 w-8"
                        className="animate-spin"
                    />
                </div>
            ) :(
                <Form form={form} component={false}>
                    <Flex gap="middle" vertical>
                        <Flex align="center" gap="middle" justify='end'>
                            <Flex align="center" gap="middle">

                                <Button type="primary" onClick={start} loading={loading}>
                                    Reload
                                </Button>
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                            </Flex>
                            <Button className='text-[#008000]' 
                                onClick={() => {
                                    setIsEditingUser(false);
                                    setCurrentUser(null);
                                    onUserEditOpen();
                                }}
                                >
                                Add User
                            </Button>
                        </Flex>
                        <Table 
                            scroll={{ x: 'max-content' }}
                            columns={columns} 
                            dataSource={dataSource} 
                            bordered
                            rowClassName="editable-row"
                            pagination={{
                                current: currentPage, // Current page state
                                pageSize: pageSize, // Page size state
                                pageSizeOptions: ['5', '10', '20', '50', '100', '200'], // Options for page size
                                showSizeChanger: true, // Enable the page size changer
                                onShowSizeChange: (current, size) => {
                                  setPageSize(size); // Update page size state
                                  setCurrentPage(1); // Reset to first page
                                },
                                onChange: (page) => {
                                  setCurrentPage(page); // Update current page state
                                },
                            }}
                            rowKey="id"
                        />
                    </Flex>
                </Form>
            )}

            {/* {currentUser ? ( */}
                <EditUserModal
                    user={user}
                    isOpen={userEditIsOpen}
                    onClose={onUserEditClose}
                    dataSource={dataSource}
                    currentUser={currentUser}
                    setDataSource={setDataSource}
                    setCurrentUser={setCurrentUser}
                    isEditing={isEditingUser}
                    setIsEditingUser={setIsEditingUser}
                    start={start}
                    roles={roles}
                />
            {/* ) : (
                ' '
            )} */}
        </>
    );
};
export default UsersTable;