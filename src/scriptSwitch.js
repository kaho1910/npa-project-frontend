// Parse the query parameters from the API URL
const urlParams = new URLSearchParams(window.location.search);

// Extract the value of the "name" parameter
const switchName = urlParams.get('name');
const switchIp = urlParams.get('ip');

// Update the content of the <h2> element
const switchNameElement = document.getElementById('switchName');
switchNameElement.textContent = switchName;

var extendAclInfo;
fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/R-acl.json', {
        method: 'GET' // No need to specify the body for a GET request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        extendAclInfo = data
    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });
var vlanInfo;
fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/S-vlan.json', {
        method: 'GET' // No need to specify the body for a GET request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        vlanInfo = data
    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });
//     var rawVlan = "{\n    \"device\": \"" + switchName + "\"\n}";

// var requestOptions = {
//   method: 'GET',
//   body: rawVlan,
//   redirect: 'follow'
// };

// fetch("127.0.0.1:8000/show_vlan", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
const interfaceContainer = document.getElementById('interfaceContainerSwitch');
// Function to create and add buttons dynamically
function createInterfaceButtons(interfaces) {

    for (const interfaceName in interfaces) {
        // Create a button element
        interfaceSwitchNames.push(interfaceName);
        const button = document.createElement('button');
        if (!interfaceName.includes('GigabitEthernet')) {
            continue; // Skip interfaces of type "vlan" and those not containing "GigabitEthernet"
        }
        // Add the interfaceName as a data attribute
        button.setAttribute('data-interface', interfaceName);

        // Add classes to the button
        button.classList.add('hover:bg-violet-600', 'active:bg-violet-700', 'focus:outline-none', 'focus:ring', 'focus:ring-violet-300', 'rounded-md', 'border', 'border-primary', 'mx-2', 'my-2', 'interfaceButtonSwitch', 'block', 'px-6', 'pb-2', 'pt-2.5', 'text-xs', 'font-medium', 'uppercase', 'leading-normal', 'text-primary', 'shadow-[0_4px_9px_-4px_#3b71ca]', 'transition', 'duration-150', 'ease-in-out', 'hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'focus:outline-none', 'focus:ring-0', 'active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]', 'dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]', 'dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]', 'dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]');

        // Set the button text
        button.textContent = `Interface ${interfaceName}`;

        // Append the button to the container
        interfaceContainer.appendChild(button);
    }
}

var interfaces;
fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/S-interfaces.json', {
        method: 'GET' // No need to specify the body for a GET request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        interfaces = data.interface
        createInterfaceButtons(data.interface);
    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });
//     var rawInterface = "{\n    \"device\": \"" + switchName + "\"\n}";

// var requestOptions = {
//   method: 'GET',
//   body: rawInterface,
//   redirect: 'follow'
// };

// fetch("127.0.0.1:8000/show_ip", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
function showInterSwitchForm() {
    console.log(interfaceSwitchNames);
    interfaceSwitchForm.style.display = 'grid';
    vlanForm.style.display = 'none';
    // stpForm.style.display = 'none';
    swportForm.style.display = 'none';
    aclForm.style.display = 'none';
    var interfaceButtonRouter = document.getElementsByClassName('interfaceButtonSwitch');
    for (var i = 0; i < interfaceButtonRouter.length; i++) {
        interfaceButtonRouter[i].addEventListener('click', interfaceButtonSwitchClick);
    }

    fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/S-interfaces.json', {
            method: 'GET' // No need to specify the body for a GET request
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            interfaces = data.interface
            createInterfaceButtons(data.interface);
        })
        .catch(error => {
            // Handle any errors
            console.log(error);
        });
        //     var rawInterface = "{\n    \"device\": \"" + switchName + "\"\n}";

// var requestOptions = {
//   method: 'GET',
//   body: rawInterface,
//   redirect: 'follow'
// };

// fetch("127.0.0.1:8000/show_ip", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
}

function showVlanForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'grid';
    // stpForm.style.display = 'none';
    swportForm.style.display = 'none';
    aclForm.style.display = 'none';
    //     var rawVlan = "{\n    \"device\": \"" + switchName + "\"\n}";

// var requestOptions = {
//   method: 'GET',
//   body: rawVlan,
//   redirect: 'follow'
// };

// fetch("127.0.0.1:8000/show_vlan", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
    populateVlanTable();
}

// function showStpForm() {
//     interfaceSwitchForm.style.display = 'none';
//     vlanForm.style.display = 'none';
//     stpForm.style.display = 'grid';
//     swportForm.style.display = 'none';
//     aclForm.style.display = 'none';
//     stpFormClick();
// }

function showSwportForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'none';
    // stpForm.style.display = 'none';
    swportForm.style.display = 'grid';
    aclForm.style.display = 'none';
    var selectInput = document.getElementById('swportinterface');
    
  // Clear existing options
  selectInput.innerHTML = '<option value="" selected >Choose a Interface</option>';

  // Create options for each interfaceSwitchName in the array
  interfaceSwitchNames.forEach(function(interfaceName) {
    var option = document.createElement('option');
    option.value = interfaceName;
    option.textContent = interfaceName;
    selectInput.appendChild(option);
  });
    populateSwitchportTable();
}

function showAclForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'none';
    // stpForm.style.display = 'none';
    swportForm.style.display = 'none';
    aclForm.style.display = 'grid';
    fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/R-acl.json', {
        method: 'GET' // No need to specify the body for a GET request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        extendAclInfo = data
    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });
    populateExtendedAclTable();
    // populateAclApplyInterfaceTable();
}

var interfaceSwitchButton = document.getElementById('interfaceSwitchButton');
var interfaceSwitchForm = document.getElementById('interfaceSwitchForm');
var vlanButton = document.getElementById('vlanButton');
var vlanForm = document.getElementById('vlanForm');
// var stpButton = document.getElementById('stpButton');
// var stpForm = document.getElementById('stpForm');
var swportButton = document.getElementById('swportButton');
var swportForm = document.getElementById('swportForm');
var aclButton = document.getElementById('aclButton');
var aclForm = document.getElementById('aclForm');


interfaceSwitchButton.addEventListener('click', showInterSwitchForm);
vlanButton.addEventListener('click', showVlanForm);
// stpButton.addEventListener('click', showStpForm);
swportButton.addEventListener('click', showSwportForm);
aclButton.addEventListener('click', showAclForm);

var interfaceButtonSwitch = document.getElementsByClassName('interfaceButtonSwitch');
for (var i = 0; i < interfaceButtonSwitch.length; i++) {
    interfaceButtonSwitch[i].addEventListener('click', interfaceButtonSwitchClick);
    
}

var methodIpSelect = document.getElementById("methodip");
var ipInput = document.getElementById("ip");
var subnetInput = document.getElementById("ipsubnet");

methodIpSelect.addEventListener("change", function() {
    if (methodIpSelect.value === "dhcp") {
        ipInput.disabled = true;
        subnetInput.disabled = true;
    } else {
        ipInput.disabled = false;
        subnetInput.disabled = false;
    }
});


var interfaceSwitchName;
var interfaceSwitchNames = [];
var methodIpSelect = document.getElementById("methodip");
var ipInput = document.getElementById("ip");
var subnetInput = document.getElementById("ipsubnet");

methodIpSelect.addEventListener("change", function() {
    console.log(methodIpSelect.value);
    if (methodIpSelect.value === "manual") {
        ipInput.disabled = false;
        subnetInput.disabled = false;
        console.log("m");
    } else {
        ipInput.disabled = true;
        subnetInput.disabled = true;
        console.log("du");
    }
});

function interfaceButtonSwitchClick(event) {
    interfaceSwitchName = event.target.dataset.interface; // Get the interface value
    console.log(interfaces[interfaceSwitchName]);
    
    // Get the corresponding interface details from the dictionary
    // Update the input fields with the interface details
    document.getElementById('ip').value = interfaces[interfaceSwitchName].ip_address;
    // document.getElementById('ipsubnet').value = interfaces[interfaceSwitchName].ipsubnet;
    // document.getElementById('description').value = interfaces[interfaceSwitchName].description;
    document.getElementById('methodip').value = interfaces[interfaceSwitchName].method;
    document.getElementById('interfaceSwitch').textContent = interfaceSwitchName;

    var checkbox = document.getElementById('statusSwitch');
    if (interfaces[interfaceSwitchName].status === "administratively down") {
        checkbox.checked = false; // Set the checkbox to unchecked
    } else {
        checkbox.checked = true; // Set the checkbox to checked
    }
    if (interfaces[interfaceSwitchName].method === "manual") {
        ipInput.disabled = false;
        subnetInput.disabled = false;
    } else {
        ipInput.disabled = true;
        subnetInput.disabled = true;
    }
    var ipAddress = ipInput.value;
    // Regular expression to match the IP address format
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Check if the input matches the IP address format
    if (ipRegex.test(ipAddress)) {
        var octets = ipAddress.split(".");
        var isValid = octets.every(function(octet) {
            // Convert each octet to a number and check if it falls within the valid range (0-255)
            var num = parseInt(octet);
            return num >= 0 && num <= 255;
        });
        if (isValid) {
            // Input is valid
            ipLabel.textContent = "*Valid IP address format";
            ipLabel.classList.remove("text-danger");
            ipLabel.classList.remove("text-primary");
            ipLabel.classList.add("text-success");
        } else {
            // Input is invalid
            ipLabel.textContent = "*Invalid IP address format";
            ipLabel.classList.remove("text-success");
            ipLabel.classList.remove("text-primary");
            ipLabel.classList.add("text-danger");
        }
    } else if (ipInput.value == "unassigned") {
        ipLabel.textContent = "*Waiting for IP address ...";
        ipLabel.classList.remove("text-danger");
        ipLabel.classList.remove("text-success");
        ipLabel.classList.add("text-primary");
    } else {
        // Input is invalid
        ipLabel.textContent = "*Invalid IP address format";
        ipLabel.classList.remove("text-success");
        ipLabel.classList.remove("text-primary");
        ipLabel.classList.add("text-danger");
    }
}
var ipInput = document.getElementById("ip");
var ipLabel = document.getElementById("ipLabel");

ipInput.addEventListener("input", function() {
    console.log(1);
    var ipAddress = ipInput.value;

    // Regular expression to match the IP address format
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Check if the input matches the IP address format
    if (ipRegex.test(ipAddress)) {
        var octets = ipAddress.split(".");
        var isValid = octets.every(function(octet) {
            // Convert each octet to a number and check if it falls within the valid range (0-255)
            var num = parseInt(octet);
            return num >= 0 && num <= 255;
        });

        if (isValid) {
            // Input is valid
            ipLabel.textContent = "*Valid IP address format";
            ipLabel.classList.remove("text-danger");
            ipLabel.classList.remove("text-primary");
            ipLabel.classList.add("text-success");
        } else if (ipInput.value == "unassigned") {
            ipLabel.textContent = "Waiting for IP address...";
            ipLabel.classList.remove("text-danger");
            ipLabel.classList.remove("text-success");
            ipLabel.classList.add("text-primary");
        } else {
            // Input is invalid
            ipLabel.textContent = "*Invalid IP address format";
            ipLabel.classList.remove("text-success");
            ipLabel.classList.remove("text-primary");
            ipLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        ipLabel.textContent = "*Invalid IP address format";
        ipLabel.classList.remove("text-success");
        ipLabel.classList.add("text-danger");
    }
});

function handleSubmit(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const form = event.target;
    const device = switchName;
    const interfaceName = interfaceSwitchName;
    // const description = form.querySelector('textarea[name="description"]').value;
    const ip = form.querySelector('input[name="ip"]').value;
    const subnet = form.querySelector('select[name="ipsubnet"]').value;
    const status = form.querySelector('input[name="statusSwitch"]').checked;
  
    // Prepare payload
    const payload = {
      device,
      interfaceName,
    //   description,
      ip,
      subnet,
      status
    };
    console.log(payload);
    // Prepare request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
  
    // Send POST request
    fetch('http://127.0.0.1:8000/interface', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error('Error:', error));
  }
  
  interfaceSwitchForm.addEventListener('submit', handleSubmit);

function populateVlanTable() {
    var tableVlan = document.getElementById("tableVlan");
    tableVlan.innerHTML = ""; // Clear existing content
    var vlanArray = [];
    Object.keys(vlanInfo.vlans).forEach(function(key) {
        var vlanData = vlanInfo.vlans[key];
        var vlanObject = {
            vlanid: vlanData.vlan_id,
            vlanname: vlanData.name,
            interfaces: vlanData.interfaces,
            vlandescription: "For Manage Devices"
        };
        vlanArray.push(vlanObject);
    });

    vlanArray.forEach(function(data) {
        var row = document.createElement("tr");

        var vlanidCell = document.createElement("td");
        vlanidCell.textContent = data.vlanid;
        row.appendChild(vlanidCell);

        var vlannameCell = document.createElement("td");
        vlannameCell.textContent = data.vlanname;
        vlannameCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(vlannameCell);

        var interfaceCell = document.createElement("td");
        interfaceCell.textContent = data.interfaces;
        interfaceCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(interfaceCell);

        var vlandescriptionCell = document.createElement("td");
        vlandescriptionCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(vlandescriptionCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);

        tableVlan.appendChild(row);
        removeLink.addEventListener("click", function() {
            removeVlan(data.vlanid);
        });
    });
}
function removeVlan(vlanId) {

    var raw = JSON.stringify({
        "switchName": switchName,
        "vlanId": vlanId
    });

    var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
    };
    console.log(raw);
    fetch("127.0.0.1:8000/vlan_del", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    console.log("Removing VLAN with ID: " + vlanId);
    // ...
}
var vlanipInput = document.getElementById("vlanip");
var vlanipLabel = document.getElementById("vlaniplabel");
vlanipInput.addEventListener("input", function() {
    var vlanip = vlanipInput.value;
    console.log(111);
    // Regular expression to match the IP address format
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Check if the input matches the IP address format
    if (ipRegex.test(vlanip)) {
        var octets = vlanip.split(".");
        var isValid = octets.every(function(octet) {
            // Convert each octet to a number and check if it falls within the valid range (0-255)
            var num = parseInt(octet);
            return num >= 0 && num <= 255;
        });

        if (isValid) {
            // Input is valid
            vlanipLabel.textContent = "*Valid IP address format";
            vlanipLabel.classList.remove("text-danger");
            vlanipLabel.classList.add("text-success");
        } else {
            // Input is invalid
            vlanipLabel.textContent = "*Invalid IP address format";
            vlanipLabel.classList.remove("text-success");
            vlanipLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        vlanipLabel.textContent = "*Invalid IP address format";
        vlanipLabel.classList.remove("text-success");
        vlanipLabel.classList.add("text-danger");
    }
});
vlanForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the form values
    var statusVlan = document.getElementById("statusVlan").value;
    var vlanId = document.getElementById("vlanid").value;
    var vlanName = document.getElementById("vlanname").value;
    var vlanIp = document.getElementById("vlanip").value;
    var vlanSubnet = document.getElementById("vlansubnet").value;
    var vlanDescription = document.getElementById("vlandescription").value;

    // Create the payload object
    var payload = {
        device: switchName,
        vlan: vlanId,
        name: vlanName,
        ip: vlanIp,
        subnet: vlanSubnet,
        description: vlanDescription,
        status: statusVlan
    };
    fetch("http://127.0.0.1:8000/vlan", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("Error", error));
});


// var stpArray = [
//     { statusStp: "on", stpmode: "pvst", stppriority: "1", hellotime: "10", maxage: "30", forwardtime: "15", lpguard: "on" },
// ];

// function stpFormClick() {
//     stpArray.forEach(function(stpArray) {
//         document.getElementById('hellotime').value = stpArray.hellotime;
//         document.getElementById('maxage').value = stpArray.maxage;
//         document.getElementById('forwardtime').value = stpArray.forwardtime;
//         document.getElementById('stppriority').value = stpArray.stppriority;
//         document.getElementById('stpmode').value = stpArray.stpmode;


//         var statusStp = document.getElementById('statusStp');
//         if (stpArray.statusStp === "on") {
//             statusStp.checked = true; // Set the checkbox to checked
//         } else {
//             statusStp.checked = false; // Set the checkbox to unchecked
//         }
//         var lpguard = document.getElementById('lpguard');
//         if (stpArray.lpguard === "on") {
//             lpguard.checked = true; // Set the checkbox to checked
//         } else {
//             lpguard.checked = false; // Set the checkbox to unchecked
//         }
//     });
// }
var vlanIdInput = document.getElementById("vlanid");
var vlanRangeLabel = document.getElementById("vlanRange");

vlanIdInput.addEventListener("input", function() {
    var inputValue = vlanIdInput.value;

    // Remove any non-digit characters from the input
    var numericValue = inputValue.replace(/\D/g, "");

    // Ensure the input is within the valid range
    if (numericValue < 2 || numericValue > 4094) {
        // If the input is invalid, clear the input field
        vlanIdInput.value = "";
        vlanRangeLabel.textContent = "Invalid VLAN ID";
        vlanRangeLabel.classList.remove("text-success");
        vlanRangeLabel.classList.add("text-danger");
    } else {
        // Update the input value with the sanitized numeric value
        vlanIdInput.value = numericValue;

        var vlanRange = getVlanRange(numericValue);
        vlanRangeLabel.textContent = vlanRange;

        // Add tailwind classes based on input validity
        if (vlanRange === "Invalid VLAN Range") {
            vlanRangeLabel.classList.remove("text-success");
            vlanRangeLabel.classList.add("text-danger");
        } else {
            vlanRangeLabel.classList.remove("text-danger");
            vlanRangeLabel.classList.add("text-success");
        }
    }
});

function getVlanRange(vlanId) {
    if (vlanId >= 2 && vlanId <= 1005) {
        return "Normal VLAN Range (2-1005)";
    } else if ((vlanId >= 1006 && vlanId <= 3967) || (vlanId >= 4048 && vlanId <= 4093)) {
        return "Extended VLAN Range (1006-3967, 4048-4093)";
    } else if ((vlanId >= 3968 && vlanId <= 4047) || vlanId === 4094) {
        return "Internally Allocated VLAN Range (3968-4047, 4094)";
    } else {
        return "Invalid VLAN Range";
    }
}


function populateSwitchportTable() {
    var tableSwitchport = document.getElementById("tableSwitchport");
    tableSwitchport.innerHTML = ""; // Clear existing content

    fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/S-switchport.json', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var switchportArray = Object.keys(data).map(function(key) {
                var portData = data[key];
                return {
                    swportinterface: key,
                    swportmode: portData.switchport_mode,
                    swportaccess: portData.access_vlan,
                    swporttrunknative: portData.encapsulation.native_vlan,
                    swportallowednative: portData.pruning_vlans
                };
            });

//     var rawInterface = "{\n    \"device\": \"" + switchName + "\"\n}";
// var requestOptions = {
//   method: 'GET',
//   body: rawInterface,
//   redirect: 'follow'
// };

// fetch("127.0.0.1:8000/show_swp", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

            switchportArray.forEach(function(data) {
                var row = document.createElement("tr");

                var swportinterfaceCell = document.createElement("td");
                swportinterfaceCell.textContent = data.swportinterface;
                row.appendChild(swportinterfaceCell);

                var swportmodeCell = document.createElement("td");
                swportmodeCell.textContent = data.swportmode;
                swportmodeCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
                row.appendChild(swportmodeCell);

                var swportaccessCell = document.createElement("td");
                swportaccessCell.textContent = data.swportaccess;
                swportaccessCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
                row.appendChild(swportaccessCell);

                var swporttrunknativeCell = document.createElement("td");
                swporttrunknativeCell.textContent = data.swporttrunknative;
                swporttrunknativeCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
                row.appendChild(swporttrunknativeCell);

                var swportallowednativeCell = document.createElement("td");
                swportallowednativeCell.textContent = data.swportallowednative;
                swportallowednativeCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
                row.appendChild(swportallowednativeCell);

                var actionCell = document.createElement("td");
                var removeLink = document.createElement("a");
                removeLink.href = "#";
                removeLink.textContent = "Remove";
                removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
                actionCell.appendChild(removeLink);
                row.appendChild(actionCell);

                tableSwitchport.appendChild(row);
            });
        })
        .catch(error => {
            console.log(error);
        });
}



var swportmode = document.getElementById("swportmode");
var swporttrunknative = document.getElementById("swporttrunknative");
var swportallowednative = document.getElementById("swportallowednative");
var swportaccess = document.getElementById("swportaccess");

swportmode.addEventListener("change", function() {
    if (swportmode.value === "access") {
        swportaccess.disabled = false;
        swporttrunknative.disabled = true;
        swportallowednative.disabled = true;
    } else if (swportmode.value === "trunk") {
        swportaccess.disabled = true;
        swporttrunknative.disabled = false;
        swportallowednative.disabled = false;
    } else {
        swportaccess.disabled = true;
        swporttrunknative.disabled = true;
        swportallowednative.disabled = true;
    }
    swportaccess.value = "";
    swporttrunknative.value = "";
    swportallowednative.value = "";
});

swportForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var swportmode = document.getElementById('swportmode').value;
  var swportinterface = document.getElementById('swportinterface').value;

  if (swportmode === 'access') {
    var vlan = document.getElementById('swportaccess').value;
    var requestData = {
      device: switchName,
      interface: swportinterface,
      vlan: parseInt(vlan),
      status: true
    };

    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestData),
      redirect: 'follow'
    };
    console.log(requestOptions);
    console.log(1);

    fetch("http://127.0.0.1:8000/vlan_access", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  } else if (swportmode === 'trunk') {
    var nativeVlan = document.getElementById('swporttrunknative').value;
    var allowedVlan = document.getElementById('swportallowednative').value;
    var requestData = {
      device: switchName,
      interface: swportinterface,
      vlan: parseInt(nativeVlan),
      allow: allowedVlan,
      status: true
    };
    console.log(requestData);
    console.log(2);
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestData),
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/vlan_trunk", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
});


function populateExtendedAclTable() {
    var extendedAclArray = [];
    var tableExtenedAcl = document.getElementById("tableExtenedAcl");
    tableExtenedAcl.innerHTML = ""; // Clear existing content

    for (var key in extendAclInfo) {
        var aclData = extendAclInfo[key];
        for (var aceKey in aclData.aces) {
            var aceData = aclData.aces[aceKey];

            extendedAclArray.push({
                aclname: aclData.name,
                aces: aceKey,
                forward: aceData.actions.forwarding,
                protocol: aceData.matches.l3.ipv4.protocol,
                source: Object.keys(aceData.matches.l3.ipv4.source_network)[0],
                destination: Object.keys(aceData.matches.l3.ipv4.destination_network)[0]
            });
        }
    }
    extendedAclArray.forEach(function(data) {
        var row = document.createElement("tr");

        var aclnameCell = document.createElement("td");
        aclnameCell.textContent = data.aclname;
        row.appendChild(aclnameCell);

        var acesCell = document.createElement("td");
        acesCell.textContent = data.aces;
        row.appendChild(acesCell);

        var forwardCell = document.createElement("td");
        forwardCell.textContent = data.forward;
        row.appendChild(forwardCell);

        var protocolCell = document.createElement("td");
        protocolCell.textContent = data.protocol;
        row.appendChild(protocolCell);

        var sourceCell = document.createElement("td");
        sourceCell.textContent = data.source;
        row.appendChild(sourceCell);

        var destinaionCell = document.createElement("td");
        destinaionCell.textContent = data.destination;
        row.appendChild(destinaionCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableExtenedAcl.appendChild(row);
        removeLink.addEventListener("click", function() {
            removeExtendedAclEntry(data.aclname, data.aces);
        });
    });
}
function removeExtendedAclEntry(aclname, aces) {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "device": switchName,
  "name": aclname,
  "label": aces
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
console.log(raw);
fetch("http://127.0.0.1:8000/acl_del", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form values
    var aclName = document.getElementById('aclname').value;
    var aclPermission = document.getElementById('aclpermission').value;
    var aclProtocol = document.getElementById('aclprotocol').value;
    var aclSource = document.getElementById('aclsource').value;
    var aclWildcardSource = document.getElementById('aclwildcardsource').value;
    var aclOperation = document.getElementById('acloperation').value;
    var aclDestination = document.getElementById('acldestination').value;
    var aclWildcardDestination = document.getElementById('aclwildcardsestination').value;
    var aclPortNumber = document.getElementById('aclportnumber').value;
  
    // Create the request body object
    var requestBody = {
      device: switchName,
      name: aclName,
      action: aclPermission,
      protocol: aclProtocol,
      ip: aclSource,
      wildcard: aclWildcardSource,
      dst: aclDestination,
      network: aclWildcardDestination,
      eq: aclOperation,
      port: aclPortNumber
    };
    console.log(requestBody);
    // Send the POST request
    fetch("http://127.0.0.1:8000/acl", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  // Add event listener to the form submit event
  aclForm.addEventListener('submit', handleFormSubmit);
  

// var applyAclArray = [
//     { aclpolicy: "99", aclapplyinterface: "G0/0", aclinout: "in" },
//     { aclpolicy: "100", aclapplyinterface: "G0/1", aclinout: "out" },
//     { aclpolicy: "101", aclapplyinterface: "G0/2", aclinout: "in" },

//     // Add more objects as needed
// ];

// function populateAclApplyInterfaceTable() {
//     var tableApplyPolicyAcl = document.getElementById("tableApplyPolicyAcl");
//     tableApplyPolicyAcl.innerHTML = ""; // Clear existing content

//     applyAclArray.forEach(function(data) {
//         var row = document.createElement("tr");

//         var aclpolicyCell = document.createElement("td");
//         aclpolicyCell.textContent = data.aclpolicy;
//         row.appendChild(aclpolicyCell);

//         var aclapplyinterfaceCell = document.createElement("td");
//         aclapplyinterfaceCell.textContent = data.aclapplyinterface;
//         row.appendChild(aclapplyinterfaceCell);

//         var aclinoutCell = document.createElement("td");
//         aclinoutCell.textContent = data.aclinout;
//         row.appendChild(aclinoutCell);

//         var actionCell = document.createElement("td");
//         var removeLink = document.createElement("a");
//         removeLink.href = "#";
//         removeLink.textContent = "Remove";
//         removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
//         actionCell.appendChild(removeLink);
//         row.appendChild(actionCell);
//         tableApplyPolicyAcl.appendChild(row);
//     });
// }
var aclsourceInput = document.getElementById("aclsource");
var aclsourceLabel = document.getElementById("aclsourceLabel");

aclsourceInput.addEventListener("input", function() {
    var aclsource = aclsourceInput.value;

    // Regular expression to match the IP address format
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Check if the input matches the IP address format
    if (ipRegex.test(aclsource)) {
        var octets = aclsource.split(".");
        var isValid = octets.every(function(octet) {
            // Convert each octet to a number and check if it falls within the valid range (0-255)
            var num = parseInt(octet);
            return num >= 0 && num <= 255;
        });

        if (isValid) {
            // Input is valid
            aclsourceLabel.textContent = "Valid IP address format";
            aclsourceLabel.classList.remove("text-danger");
            aclsourceLabel.classList.add("text-success");
        } else {
            // Input is invalid
            aclsourceLabel.textContent = "Invalid IP address format";
            aclsourceLabel.classList.remove("text-success");
            aclsourceLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        aclsourceLabel.textContent = "Invalid IP address format";
        aclsourceLabel.classList.remove("text-success");
        aclsourceLabel.classList.add("text-danger");
    }
});
var acldestinationInput = document.getElementById("acldestination");
var acldestinationLabel = document.getElementById("acldestinationLabel");

acldestinationInput.addEventListener("input", function() {
    var acldestination = acldestinationInput.value;

    // Regular expression to match the IP address format
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Check if the input matches the IP address format
    if (ipRegex.test(acldestination)) {
        var octets = acldestination.split(".");
        var isValid = octets.every(function(octet) {
            // Convert each octet to a number and check if it falls within the valid range (0-255)
            var num = parseInt(octet);
            return num >= 0 && num <= 255;
        });

        if (isValid) {
            // Input is valid
            acldestinationLabel.textContent = "Valid IP address format";
            acldestinationLabel.classList.remove("text-danger");
            acldestinationLabel.classList.add("text-success");
        } else {
            // Input is invalid
            acldestinationLabel.textContent = "Invalid IP address format";
            acldestinationLabel.classList.remove("text-success");
            acldestinationLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        acldestinationLabel.textContent = "Invalid IP address format";
        acldestinationLabel.classList.remove("text-success");
        acldestinationLabel.classList.add("text-danger");
    }
});

// Dynamic Device Name Zone



// DDNZ