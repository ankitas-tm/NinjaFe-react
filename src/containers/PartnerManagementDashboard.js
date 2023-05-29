import React , {useMemo, useEffect} from 'react';
import { 
  enrolmentStatusFilter, 
  profileStatusFilter, 
  qcStatusFilter, 
  bankAccountStatusFilter, 
  supervisorStatusFilter,
  SelectColumnFilter } from '../component/ColumnHeaderFilter';
import SelectComponent from '../component/CustomSelect';
import {format, isValid} from 'date-fns';
import APIDataColumns from '../APIDataColumns.json'
import  Table  from '../component/Table';
import Header from '../component/Header';
import { Checkbox } from "@mui/material";
import ButtonComponent from '../component/CustomButton';

function PartnerManagementDashboard() {

  const [showData,  setShowData] = React.useState('turtlemint');

  const showDataIfTM = (e) => {
    setShowData(e.target.value)
  }
  const data = useMemo(() => showData === 'turtlemint' ? APIDataColumns : [] , [showData]);

  const MultipleFilter = (rows, filler, filterValue) => {
    const arr = [];
    console.log(rows)
    rows.forEach((val) => {
      if(![null, undefined].includes(val.original.verificationOwner)){
        if (filterValue.includes(val.original.verificationOwner.email)) arr.push(val);
      }
    });
    return arr;
  };

//columns
  const columns = React.useMemo(() => [
    {
      id: 'selection',
      Header: ({ getToggleAllPageRowsSelectedProps }) => (
        <div>
          <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} className='hell' />
        </div>
      ),
      Cell: ({ row }) => (
        <div>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
    {
      Header: 'DP Number',
      id: "dpNo",
      accessor: `dpNo`,
      disableGlobalFilter: false,
      Cell: ({ row }) => {
        return (
         <div>DP - {row.values.dpNo}</div>
        );
      },      
    },
    {
      Header: 'Full Name',
      id: "name",
      accessor: 'name',
      disableGlobalFilter: false,
    },
    {
      Header: 'Sales Excecutive',
      id: "supervisorName",
      accessor: row => (row.supervisor !== null && row.supervisor.name !== null ) ? true : false,
      Filter: supervisorStatusFilter,  
      Cell: ({ row }) => {
        return (
          <span>
          {(![undefined, null].includes(row.original.supervisor) && ![undefined, null].includes(row.original.supervisor.name)) ? (
            <span>{row.original.supervisor.name}</span>
          ) : (
            <span></span>
          )}
        </span>
        );
      },   
    },
    {
      Header: 'To be Verified Date',
      id: "toBeVerifiedDate",
      accessor: 'toBeVerifiedDate',
      disableGlobalFilter: true,
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.toBeVerifiedDate !== null ? (
              <div>{isValid(new Date(row.original.toBeVerifiedDate)) ? format(row.original.toBeVerifiedDate,"dd MMM yyyy hh:mm"): null}</div>
            ): null}
          </div>
        );
      },    
    },
    {
      Header: 'Verification Date',
      id: "verificationDate",
      accessor: 'verificationDate',
      disableGlobalFilter: true,
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.verificationDate !== null ? (
              <div>{isValid(new Date(row.original.verificationDate)) ? format(row.original.verificationDate,"dd MMM yyyy hh:mm"): null}</div>
            ): null}
          </div>        );
      }, 
    },
    {
      Header: 'Profile Status',
      id: "status",
      accessor: "status",
      disableGlobalFilter: true,
      filter: "equals",
      Filter: profileStatusFilter,
      Cell: ({ row }) => {
        return (
         <div>{row.original.status === 'verified' ? 'Verified' : row.original.status === 'not_verified' ? 'Not Verified' : row.original.status === 'to_verify' ? 'To Verify' : row.original.status === 'rejected' ? 'Rejected' : ''}</div>
        );
      },    
    },
    {
      Header: 'Enrollemnt Status',
      id: "eligibleForLMS",
      // accessor: "eligibleForLMS",
      accessor: row => (row.eligibleForLMS !== null && row.eligibleForLMS) ? true : false,
      Filter: enrolmentStatusFilter,
      disableGlobalFilter: true,
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.eligibleForLMS ? 'Eligible' : 'Not Eligible'}
          </div>
        );
      },    
    },
    {
      Header: 'QC Status',
      filter: "weakEquals",
      Filter: qcStatusFilter,
      disableGlobalFilter: true,
      accessor: "partnerQc.qcStatus",
      Cell: ({ row }) => {
        return (
          <span>
            {(row.original.partnerQc !== undefined && row.original.partnerQc !== null && row.original.partnerQc.qcStatus !== null) ? (
              <span>{row.original.partnerQc.qcStatus === 'qc_verified' ? 'QC Verified' : row.original.partnerQc.qcStatus === 'qc_rejected' ? 'QC Rejected' : '-'}</span>
            ) : (
              <span>-</span>
            )}
          </span>
        ); 
      },
    },
    {
      Header: 'Verification Owners',
      accessor: 'verificationOwner.name',
      disableGlobalFilter: true,
      filter: MultipleFilter,
      Filter: SelectColumnFilter,
      Cell: ({ row }) => {
        return (
          <span>
              <span>
                {(row.original.verificationOwner !== undefined && row.original.verificationOwner !== null && row.original.verificationOwner.name !== null ) ? (
                  <span>{row.original.verificationOwner.name}</span>
                ) : (
                  <span>-</span>
                )}
              </span>
          </span>
        ); 
      },
    },
    {
      Header: 'Bank Account Status',
      filter: "weakEquals",
      Filter: bankAccountStatusFilter,
      disableGlobalFilter: true,
      accessor: "bankDetails.verificationMode",
      Cell: ({ row }) => {
        return (
          <span>
            {(row.original.bankDetails !== undefined && row.original.bankDetails !== null && row.original.bankDetails.verificationMode !== null ) ? (
              <span>{row.original.bankDetails.verificationMode === 'signzy' ? 'Signzy Verified' : row.original.bankDetails.verificationMode === 'cashfree' ? 'Cashfree Verified' : row.original.bankDetails.verificationMode === 'manual' ? 'Manually Verified' : '-'}</span>
            ) : (
              <span>-</span>
            )}
          </span>
        ); 
      },
    }
  ], []);
  
  //tenant data
  const tenant = [
    {
      displayName: 'TURTLEMINT',
      value: 'turtlemint'
    },
    {
      displayName: 'AIRTEL',
      value: 'airtel'
    },
    {
      displayName: 'TURTLEPOSP',
      value: 'turtleposp'
    }
  ];

//remove from local storage
  useEffect(() => {
    localStorage.removeItem('profileStatus');
  }, []);

  let profileStatusVal = localStorage.getItem('profileStatus');
  
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <div>
        <Checkbox 
          ref={resolvedRef} 
          {...rest}
        />
         
        </div>
      )
    }
  )

  return (
    <div>
      <Header data={data} />
      <div className='App-body'>
        <div className='container-fluid'>
          <div className='App-body-container'>
            <div className='App-body-subHeader'>
              <div>{profileStatusVal === 'not_verified' ? 'Not Verified Records' : profileStatusVal === 'to_verify' ? 'To Verify Records' : profileStatusVal === 'rejected' ? 'Rejected Records' : 'Verified Records' }</div>
              <div className='wrapper-data'>
                <ButtonComponent buttonClass={''} buttonText={'Assign Owner'}/>
                <SelectComponent options={tenant} changeFun={showDataIfTM} customClassWrapper={'hideIcon'} />
              </div>
            </div>
            <Table Cols={columns} Records={data} pageSizeR={5} pageLimitD={[5,10,25,30]} customClass={'tableWrapper'} 
            defaultColHead={'status'} defaultColData={'verified'} resetButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerManagementDashboard;