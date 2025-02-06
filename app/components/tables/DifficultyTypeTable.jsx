'use client'

import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
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
import AddDifficultyTypeModal from '../Modals/difficultyType/AddDifficultyTypeModal';
import EditDifficultyTypeModal from '../Modals/difficultyType/EditDifficultyTypeModal';
import { Edit, Trash } from 'iconsax-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { hostUrl } from '@/app/lib/utils';
import { LoaderIcon } from '../ui/IconComponent';

  
const DifficultyTypeTable = ({user, users, data, fetchData, isLoading}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [statusState, setStatusState] = useState('');
    const [currentDifficultyType, setCurrentDifficultyType] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSavingStatus, setIsSavingStatus] = useState({});
    const {
        isOpen: addTypeIsOpen,
        onOpen: onTypeOpen,
        onClose: onTypeClose,
    } = useDisclosure();
    const {
        isOpen: editTypeIsOpen,
        onOpen: onEditTypeOpen,
        onClose: onEditTypeClose,
    } = useDisclosure();
    const pageSize = 10; 

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key:'index',
            width: 10,
            render: (text, record, index) => (
                <a>{(currentPage - 1) * pageSize + index + 1}</a>
            ),
        },
        {
            key: '1',
            title: 'Title',
            dataIndex: 'title',
            width: 40,
            render: (text) => <a className='whitespace-nowrap'>{text}</a>,
        },
        {
            key: '2',
            title: 'Description',
            dataIndex: 'description',
            width: 20,
            render: (text) => <a className='whitespace-nowrap'>{text}</a>,
        },
        {
            key: '3',
            title: 'Status',
            dataIndex: 'status',
            editable: false,
            width: 10,
            render: (text, record, index) => (
                <Space size="middle">
                    <button
                        className={`btn btn-sm flex items-center gap-2 ${record.is_active ? 'btn-success' : 'btn-danger'}`}
                        disabled={isSavingStatus[record.id]}
                        aria-disabled={isSavingStatus[record.id]}
                        onClick={
                            // setIsSavingStatus(true);
                            // setCurrentUser(record);
                            ()=>toggleCurrentTypeStatus(text, record, index, record.is_active)
                          }
                          >
                            {isSavingStatus[record.id] ? (
                                <>
                                    <LoaderIcon
                                        extraClass="text-black h-5 w-5"
                                        className="animate-spin"
                                    />
                                </>
                            ) : (
                                record.is_active ? 'Active' : 'Inactive'
                            )}
                            
                    </button>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: '3',
            width: 20,
            render: (_, record) => (
            <Space size="middle">
                <button 
                    className="flex btn btn-info items-center gap-1 text-xs" 
                    onClick={() => {
                        setCurrentDifficultyType(record);
                        onEditTypeOpen();
                      }}>
                    <Edit size={14}/> Edit
                </button>
                <button 
                    className="flex btn btn-red items-center gap-1 text-xs" 
                    onClick={(e)=>deleteType(record)}>
                        <Trash size={12}/> Delete
                </button>
            </Space>
            ),
        },
    ];
    
    const toggleCurrentTypeStatus = async(text, record, index, status) => {
        let key = record.id
        var msg = '';
        if (key == "undefined") {
            msg = "Record key is not defined:";
            console.error(msg);
            toast.error(msg, {
                position: "top-right"
            });
            return;
        }

        setCurrentDifficultyType(record);
        setStatusState(key);
        
        
            
            setIsSavingStatus({
                [key]: true
            });
            try {
                    
                const updatedRecord = { ...record, status: record.is_active ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );
        
                const resp = await axios.post(hostUrl + `difficulty-types/update-status/`+record?.id);

                setDataSource(updatedDataSource);
        
                setTimeout(() => {
                    setIsSavingStatus({
                        [key]: false
                    });

                    fetchData();
                    msg = 'Successfully '+ (updatedRecord.is_active ? 'Activated' : 'Deactivated')  + '!!'
                    toast.success(resp?.data?.message??msg);
                    setIsSavingStatus({});
                }, 500);
        
            } catch (err) {
                setIsSavingStatus({
                    [key]: false
                });
                setIsSavingStatus({});
                toast.error(err.message);
            }
    };

    const start = () => {
        // setLoading(true);
        fetchData();
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const cancel = (page) => {
        setEditingKey('');
        setCurrentPage(page);
    };


    const deleteType = (data) => {
        Swal.fire({
            title: 'Are you sure?',
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
                    const response = await axios.delete(hostUrl + 'difficulty-types/delete/'+ parseInt(data.id));
                    if(response.data.success) {
                        const newData = dataSource.filter((item) => item.id !== data.id);
                        setDataSource(newData);
                        Swal.fire(
                            'Deleted!',
                            'Difficulty has been deleted.',
                            'success'
                        );
                        fetchData();
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
            
        });
    };
      
    return (
        <>
            {isLoading && !user ? 
            (
                <div className='h-full flex items-center justify-center'>
                    <LoaderIcon
                        extraClass="text-[#034343] h-6 w-8"
                        className="animate-spin"
                    />
                </div>
            ) :(
                <Flex gap="middle" vertical>
                    <Flex align="center" gap="middle" justify='end'>
                        <Flex align="center" gap="middle">
                        </Flex>
                        <Button type="primary" onClick={start} loading={loading}>
                            Reload
                        </Button>
                        <Button type="default" onClick={onTypeOpen}>
                            Add New
                        </Button>
                    </Flex>
                    <Table 
                        scroll={{ x: 'max-content' }}
                        // rowSelection={rowSelection} 
                        columns={columns} 
                        dataSource={data}
                        bordered
                        rowClassName="editable-row"
                        pagination={{
                            // pageSize: 50,
                            onChange: (page)=>cancel(page),
                            pageSize: pageSize,
                        }}
                        rowKey="id"
                    />
                </Flex>
            )}

        <AddDifficultyTypeModal
            isOpen={addTypeIsOpen}
            onClose={onTypeClose}
            dataSource={data}
            start={start}
            users={users}
            loggedInUser={user}
        />
   

        {currentDifficultyType ? (
            <EditDifficultyTypeModal
                user={user}
                isOpen={editTypeIsOpen}
                onClose={onEditTypeClose}
                dataSource={data}
                currentDifficultyType={currentDifficultyType}
                setDataSource={setDataSource}
                setCurrentDifficultyType={setCurrentDifficultyType}
                start={start}
                users={users}
                loggedInUser={user}
            />
        ) : (
            ' '
        )}
        </>
    )
}

export default DifficultyTypeTable
