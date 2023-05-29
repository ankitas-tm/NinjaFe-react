import React, {Fragment, useEffect, useState} from 'react';
import SelectComponent from './CustomSelect';
import ButtonComponent from './CustomButton';
import { Menu, IconButton } from "@mui/material";
import Funnel from '@mui/icons-material/FilterAltOutlined';
import CustomCheckbox from './CustomCheckbox';


export function enrolmentStatusFilter({column: {filterValue, setFilter }}) {
  var eligible = [
    {
      value: '',
      displayName: "All"
    },
    {
      value: "true",
      displayName: "Eligible"
    },
    {
      value: "false",
      displayName: "Not Eligible"
    }
  ];
  const setEnrolmentStatus = (e) => {
    setFilter(e.target.value)
  }

  return (
    <SelectComponent value={filterValue} options={eligible} changeFun={setEnrolmentStatus} labelName={'Enrollment Status'}/>
  );
}

export function profileStatusFilter({
    column: { filterValue, setFilter }
  }) {
  var leadStatus = [
    {
      displayName: "Verified",
      value: "verified",
      completed: true,
      id: 0,
      label: "Verified Records"
    },
    {
      displayName: "Incomplete",
      value: "not_verified",
      completed: false,
      id: 1,
      label: "Non verified Records"
    },
    {
      displayName: "To verify",
      value: "to_verify",
      completed: true,
      id: 2,
      label: "To Verify Records"
    },
    {
      displayName: "Rejected",
      value: "rejected",
      completed: true,
      id: 3,
      label: "Rejected Records"
    }
  ];
  const setProfileStatus = (e) => {
    localStorage.setItem('profileStatus', e.target.value);
    setFilter(e.target.value)
  }
  return (
    <Fragment>
      <SelectComponent value={filterValue} options={leadStatus} changeFun={setProfileStatus} labelName={'Profile Status'} />
    </Fragment>
  );
}

export function qcStatusFilter( {
  column: { filterValue, setFilter }
  }) {
  var qcStatusState = [
    {
      displayName: "All",
      value: ''
    },
    {
      displayName: "-",
      value: "-",
      id: 1
    },
    {
      displayName: "QC Verified",
      value: "qc_verified",
      id: 2
    },
    {
      displayName: "QC Rejected",
      value: "qc_rejected",
      id: 3
    }
  ];
  const setQcStatus = (e) => {
    setFilter(e.target.value)
  }
  return (
    <SelectComponent value={filterValue} options={qcStatusState} changeFun={setQcStatus} labelName={'QC Status'} />
  );
}

export function bankAccountStatusFilter( {
  column: { filterValue, setFilter }
  }) {
  var bankDetailsStatusState = [
    {
      value: '',
      displayName: "All"
    },
    {
      displayName: "-",
      value: "-",
      id: 1
    },
    {
      displayName: "Signzy Verified",
      value: "signzy",
      id: 2
    },
    {
      displayName: "Cashfree Verified",
      value: "cashfree",
      id: 3
    },
    {
      displayName: "Manually Verified",
      value: "manual",
      id: 4
    },
    {
      displayName: "To Verify",
      value: "to-verify",
      id: 5
    }
  ];
  const setBankStatus = (e) => {
    setFilter(e.target.value)
  }
  return (
    <SelectComponent value={filterValue} options={bankDetailsStatusState} changeFun={setBankStatus} labelName={'Bank Account Status'} />
  );
}

export function supervisorStatusFilter( {
  column: { filterValue, setFilter }
  }) {
  var supervisorStatus = [
    {
      displayName: "All",
      value: ''
    },
    {
      displayName: "Assigned",
      value: true,
    },
    {
      displayName: "Not Assigned",
      value: false
    }
  ];
  const setSupervisorStatus = (e) => {
    setFilter((e.target.value).toString())
  }

  return (
    <SelectComponent value={filterValue !== undefined ?  filterValue :  ''} options={supervisorStatus} changeFun={setSupervisorStatus} labelName={'Sales Executive'} />
  );
}

export function SelectColumnFilter({column: { setFilter, disableFilters }}) {
  const [targetAudiences1, setTargetAudiences1] = React.useState([]);

  const [todos, setTodos] = useState([]);

  const url = 'https://mocki.io/v1/485a7ef9-27ae-4815-96af-2674009b9c80';

  const fetchTodos = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTodos(data.verificationOwner);
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, [])

  function handleTargetAudienceChange(e) {
    if (e.target.checked) {
      setTargetAudiences1([...targetAudiences1, e.target.value]);
    } else {
      setTargetAudiences1(targetAudiences1.filter((id) => id !== e.target.value));
    }
  }
  function handleFilter(e) {
    setFilter(targetAudiences1);
    if((targetAudiences1.filter((id) => id !== e.target.value).length) < 1){
      setFilter(disableFilters)
    }
    setAnchorEl(null);
  }

  function handleClear() {
    setTargetAudiences1([]);
    setFilter(disableFilters)
    setAnchorEl(null);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (  
    <div className='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root'> 
      <IconButton aria-label="delete" 
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Funnel fontSize={'10px'} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      <ul className="list-group list-group-light">
        {todos.map((option) => {
          return(
            <li key={option.id} className="list-group-item">
              <CustomCheckbox items={option} changeFun={handleTargetAudienceChange} targetedData={targetAudiences1} /> 
            </li>
          )
        })}
      </ul>
      <div className='buttonGroup'>
        <ButtonComponent buttonClass={'secondaryButton'} clickFunc={handleClear} buttonText={'Clear All'}/>
        <ButtonComponent buttonClass={''} clickFunc={handleFilter} buttonText={'Apply'}/>
      </div>
      </Menu>
    </div>
  );
}
