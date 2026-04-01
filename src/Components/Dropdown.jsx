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
      <Dropdown.Toggle className='bg-primary' id="dropdown-basic" size="md">
        {selectedDevice}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {dropdownList}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DeviceDropdown;