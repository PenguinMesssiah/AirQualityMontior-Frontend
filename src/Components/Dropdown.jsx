import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

function DeviceDropdown({deviceNames, onDeviceSelect}) {
    const [selectedDevice, setSelectedDevice] = useState("Average");

    function handleSelect(deviceName) {
        setSelectedDevice(deviceName);
        onDeviceSelect(deviceName); //Callback Fnc
    }
    
    var dropdownList = deviceNames.filter((item) => item!=selectedDevice).map((item,index) =>
        <Dropdown.Item key={index} onClick={() => handleSelect(item)}>{item}</Dropdown.Item>
    )

    return (
    <Dropdown className="flex justify-end">
      <Dropdown.Toggle variant="info" id="dropdown-basic" size="lg">
        {selectedDevice}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {dropdownList}
        {/*
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DeviceDropdown;