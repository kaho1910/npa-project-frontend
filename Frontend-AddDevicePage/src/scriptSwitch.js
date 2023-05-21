function showInterSwitchForm() {
    interfaceSwitchForm.style.display = 'grid';
    vlanForm.style.display = 'none';
    stpForm.style.display = 'none';
    swportForm.style.display = 'none';
}

function showVlanForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'grid';
    stpForm.style.display = 'none';
    swportForm.style.display = 'none';
    populateVlanTable();
}

function showStpForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'none';
    stpForm.style.display = 'grid';
    swportForm.style.display = 'none';
    stpFormClick();
}

function showSwportForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'none';
    stpForm.style.display = 'none';
    swportForm.style.display = 'grid';
    populateSwitchportTable();
}

var interfaceSwitchButton = document.getElementById('interfaceSwitchButton');
var interfaceSwitchForm = document.getElementById('interfaceSwitchForm');
var vlanButton = document.getElementById('vlanButton');
var vlanForm = document.getElementById('vlanForm');
var stpButton = document.getElementById('stpButton');
var stpForm = document.getElementById('stpForm');
var swportButton = document.getElementById('swportButton');
var swportForm = document.getElementById('swportForm');

interfaceSwitchButton.addEventListener('click', showInterSwitchForm);
vlanButton.addEventListener('click', showVlanForm);
stpButton.addEventListener('click', showStpForm);
swportButton.addEventListener('click', showSwportForm);

var interfaceButtonSwitch = document.getElementsByClassName('interfaceButtonSwitch');
for (var i = 0; i < interfaceButtonSwitch.length; i++) {
    interfaceButtonSwitch[i].addEventListener('click', interfaceButtonSwitchClick);
}

function interfaceButtonSwitchClick(event) {
    var test = event.target.dataset.interface; // Get the interface value

    // Get the corresponding interface details from the dictionary
    var interfaceDetails = {
        "G0/0": { status: "on", method: "Static", ip: "192.18.1.1", subnet: '255.255.255.0', description: "test" },
        "G0/1": { status: "on", method: "DHCP", ip: "192.18.1.2", subnet: '255.255.255.0', description: "2" },
        "G0/2": { status: "on", method: "Static", ip: "192.18.1.3", subnet: '255.255.255.0', description: "3" },
        "G0/3": { status: "on", method: "Static", ip: "192.18.1.4", subnet: '255.255.255.0', description: "4" },
        "G0/4": { status: "on", method: "DHCP", ip: "192.18.1.5", subnet: '255.255.255.0', description: "5" },
        "G0/5": { status: "off", method: "Static", ip: "192.18.1.6", subnet: '255.255.255.0', description: "test" },
        // Add more interface details here
    };

    // Update the input fields with the interface details
    document.getElementById('ip').value = interfaceDetails[test].ip;
    document.getElementById('subnet').value = interfaceDetails[test].subnet;
    document.getElementById('description').value = interfaceDetails[test].description;
    document.getElementById('methodip').value = interfaceDetails[test].method;
    document.getElementById('interfaceSwitch').textContent = test;

    var checkbox = document.getElementById('statusSwitch');

    if (interfaceDetails[test].status === "on") {
        checkbox.checked = true; // Set the checkbox to checked
    } else {
        checkbox.checked = false; // Set the checkbox to unchecked
    }
}

var vlanArray = [
    { vlanid: "10", vlanname: "Management", vlandescription: "For Manage Devices" },
    { vlanid: "20", vlanname: "Financial", vlandescription: "For Money" },
    { vlanid: "40", vlanname: "Developer", vlandescription: "For Developer" },
    // Add more objects as needed
];

function populateVlanTable() {
    var tableVlan = document.getElementById("tableVlan");
    tableVlan.innerHTML = ""; // Clear existing content

    vlanArray.forEach(function(data) {
        var row = document.createElement("tr");

        var vlanidCell = document.createElement("td");
        vlanidCell.textContent = data.vlanid;
        row.appendChild(vlanidCell);

        var vlannameCell = document.createElement("td");
        vlannameCell.textContent = data.vlanname;
        row.appendChild(vlannameCell);

        var vlandescriptionCell = document.createElement("td");
        vlandescriptionCell.textContent = data.vlandescription;
        row.appendChild(vlandescriptionCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableVlan.appendChild(row);
    });
}

var stpArray = [
    { statusStp: "off", stpmode: "MSTP", stppriority: "1", hellotime: "10", maxage: "30", forwardtime: "15", lpguard: "on" },
];

function stpFormClick() {
    stpArray.forEach(function(stpArray) {
        document.getElementById('hellotime').value = stpArray.hellotime;
        document.getElementById('maxage').value = stpArray.maxage;
        document.getElementById('forwardtime').value = stpArray.forwardtime;
        document.getElementById('stppriority').value = stpArray.stppriority;

        var statusStp = document.getElementById('statusStp');
        if (stpArray.statusStp === "on") {
            statusStp.checked = true; // Set the checkbox to checked
        } else {
            statusStp.checked = false; // Set the checkbox to unchecked
        }
        var lpguard = document.getElementById('lpguard');
        if (stpArray.lpguard === "on") {
            lpguard.checked = true; // Set the checkbox to checked
        } else {
            lpguard.checked = false; // Set the checkbox to unchecked
        }
    });
}

var switchportArray = [
    { swportinterface: "G0/1", swportmode: "Trunk", swporttrunknative: "99", swportallowednative: "1,2,3", swportaccess: "-" },
    { swportinterface: "G0/2", swportmode: "Access", swporttrunknative: "-", swportallowednative: "-", swportaccess: "10,20" },
    { swportinterface: "G0/3", swportmode: "Trunk", swporttrunknative: "100", swportallowednative: "5,6,8", swportaccess: "-" },

    // Add more objects as needed
];

function populateSwitchportTable() {
    var tableSwitchport = document.getElementById("tableSwitchport");
    tableSwitchport.innerHTML = ""; // Clear existing content

    switchportArray.forEach(function(data) {
        var row = document.createElement("tr");

        var swportinterfaceCell = document.createElement("td");
        swportinterfaceCell.textContent = data.swportinterface;
        row.appendChild(swportinterfaceCell);

        var swportmodeCell = document.createElement("td");
        swportmodeCell.textContent = data.swportmode;
        row.appendChild(swportmodeCell);

        var swporttrunknativeCell = document.createElement("td");
        swporttrunknativeCell.textContent = data.swporttrunknative;
        row.appendChild(swporttrunknativeCell);

        var swportallowednativeCell = document.createElement("td");
        swportallowednativeCell.textContent = data.swportallowednative;
        row.appendChild(swportallowednativeCell);

        var swportaccessCell = document.createElement("td");
        swportaccessCell.textContent = data.swportaccess;
        row.appendChild(swportaccessCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableSwitchport.appendChild(row);
    });
}