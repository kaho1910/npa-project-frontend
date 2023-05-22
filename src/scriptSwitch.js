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
        // Handle the response data
        console.log(data);
        interfaces = data.interface
        createInterfaceButtons(data.interface);

    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });
const interfaceContainer = document.getElementById('interfaceContainerSwitch');
// Function to create and add buttons dynamically
function createInterfaceButtons(interfaces) {

    for (const interfaceName in interfaces) {
        // Create a button element
        const button = document.createElement('button');
        if (!interfaceName.includes('GigabitEthernet')) {
            continue; // Skip interfaces of type "vlan" and those not containing "GigabitEthernet"
        }
        // Add the interfaceName as a data attribute
        button.setAttribute('data-interface', interfaceName);

        // Add classes to the button
        button.classList.add('interfaceButtonSwitch', 'hover:bg-primary-600', 'focus:bg-primary-600', 'active:bg-primary-700', 'block', 'rounded', 'bg-primary', 'px-6', 'pb-2', 'pt-2.5', 'text-xs', 'font-medium', 'uppercase', 'leading-normal', 'text-white', 'shadow-[0_4px_9px_-4px_#3b71ca]', 'transition', 'duration-150', 'ease-in-out', 'hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'focus:outline-none', 'focus:ring-0', 'active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]', 'dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]', 'dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]', 'dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]');

        // Set the button text
        button.textContent = `Interface ${interfaceName}`;

        // Append the button to the container
        interfaceContainer.appendChild(button);
    }
}
createInterfaceButtons(interfaces);

function showInterSwitchForm() {
    interfaceSwitchForm.style.display = 'grid';
    vlanForm.style.display = 'none';
    stpForm.style.display = 'none';
    swportForm.style.display = 'none';
    aclForm.style.display = 'none';
    var interfaceButtonRouter = document.getElementsByClassName('interfaceButtonSwitch');
    for (var i = 0; i < interfaceButtonRouter.length; i++) {
        interfaceButtonRouter[i].addEventListener('click', interfaceButtonSwitchClick);
    }
}

function showVlanForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'grid';
    stpForm.style.display = 'none';
    swportForm.style.display = 'none';
    aclForm.style.display = 'none';
    populateVlanTable();
}

function showStpForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'none';
    stpForm.style.display = 'grid';
    swportForm.style.display = 'none';
    aclForm.style.display = 'none';
    stpFormClick();
}

function showSwportForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'none';
    stpForm.style.display = 'none';
    swportForm.style.display = 'grid';
    aclForm.style.display = 'none';
    populateSwitchportTable();
}

function showAclForm() {
    interfaceSwitchForm.style.display = 'none';
    vlanForm.style.display = 'none';
    stpForm.style.display = 'none';
    swportForm.style.display = 'none';
    aclForm.style.display = 'grid';
    populateExtendedAclTable();
    populateAclApplyInterfaceTable();
}

var interfaceSwitchButton = document.getElementById('interfaceSwitchButton');
var interfaceSwitchForm = document.getElementById('interfaceSwitchForm');
var vlanButton = document.getElementById('vlanButton');
var vlanForm = document.getElementById('vlanForm');
var stpButton = document.getElementById('stpButton');
var stpForm = document.getElementById('stpForm');
var swportButton = document.getElementById('swportButton');
var swportForm = document.getElementById('swportForm');
var aclButton = document.getElementById('aclButton');
var aclForm = document.getElementById('aclForm');


interfaceSwitchButton.addEventListener('click', showInterSwitchForm);
vlanButton.addEventListener('click', showVlanForm);
stpButton.addEventListener('click', showStpForm);
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


var test;
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
    test = event.target.dataset.interface; // Get the interface value
    console.log(interfaces[test]);
    // Get the corresponding interface details from the dictionary


    // Update the input fields with the interface details
    document.getElementById('ip').value = interfaces[test].ip_address;
    // document.getElementById('ipsubnet').value = interfaces[test].ipsubnet;
    // document.getElementById('description').value = interfaces[test].description;
    document.getElementById('methodip').value = interfaces[test].method;
    document.getElementById('interfaceSwitch').textContent = test;

    var checkbox = document.getElementById('statusSwitch');
    if (interfaces[test].status === "administratively down") {
        checkbox.checked = false; // Set the checkbox to unchecked
    } else {
        checkbox.checked = true; // Set the checkbox to checked
    }
    if (interfaces[test].method === "manual") {
        ipInput.disabled = false;
        subnetInput.disabled = false;
    } else {
        ipInput.disabled = true;
        subnetInput.disabled = true;
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
    { statusStp: "on", stpmode: "pvst", stppriority: "1", hellotime: "10", maxage: "30", forwardtime: "15", lpguard: "on" },
];

function stpFormClick() {
    stpArray.forEach(function(stpArray) {
        document.getElementById('hellotime').value = stpArray.hellotime;
        document.getElementById('maxage').value = stpArray.maxage;
        document.getElementById('forwardtime').value = stpArray.forwardtime;
        document.getElementById('stppriority').value = stpArray.stppriority;
        document.getElementById('stpmode').value = stpArray.stpmode;


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

var swportmode = document.getElementById("swportmode");
var swporttrunknative = document.getElementById("swporttrunknative");
var swportallowednative = document.getElementById("swportallowednative");
var swportaccess = document.getElementById("swportaccess");

swportmode.addEventListener("change", function() {
    if (swportmode.value === "Trunk") {
        swportaccess.disabled = true;
        swporttrunknative.disabled = false;
        swportallowednative.disabled = false;
    } else {
        swportaccess.disabled = false;
        swporttrunknative.disabled = true;
        swportallowednative.disabled = true;
    }
    swportaccess.value = "";
    swporttrunknative.value = "";
    swportallowednative.value = "";
});


var extendedAclArray = [
    { aclnumber: "99", aclpermission: "permit", aclprotocol: "tcp", aclsource: "192.168.1.0", aclwildcardsource: "0.0.0.255", acldestination: "10.10.0.0", aclwildcardsestination: "0.0.0.255", acloperation: "eq", aclportnumber: "80" },
    { aclnumber: "100", aclpermission: "deny", aclprotocol: "tcp", aclsource: "192.168.5.0", aclwildcardsource: "0.0.0.255", acldestination: "172.10.0.0", aclwildcardsestination: "0.0.0.255", acloperation: "eq", aclportnumber: "80" },
    { aclnumber: "101", aclpermission: "permit", aclprotocol: "udp", aclsource: "192.168.10.0", aclwildcardsource: "0.0.0.255", acldestination: "10.10.0.0", aclwildcardsestination: "0.0.255.255", acloperation: "gt", aclportnumber: "443" },

    // Add more objects as needed
];

function populateExtendedAclTable() {
    var tableExtenedAcl = document.getElementById("tableExtenedAcl");
    tableExtenedAcl.innerHTML = ""; // Clear existing content

    extendedAclArray.forEach(function(data) {
        var row = document.createElement("tr");

        var aclnumberCell = document.createElement("td");
        aclnumberCell.textContent = data.aclnumber;
        row.appendChild(aclnumberCell);

        var aclpermissionCell = document.createElement("td");
        aclpermissionCell.textContent = data.aclpermission;
        row.appendChild(aclpermissionCell);

        var aclprotocolCell = document.createElement("td");
        aclprotocolCell.textContent = data.aclprotocol;
        row.appendChild(aclprotocolCell);

        var aclsourceCell = document.createElement("td");
        aclsourceCell.textContent = data.aclsource;
        row.appendChild(aclsourceCell);

        var aclwildcardsourceCell = document.createElement("td");
        aclwildcardsourceCell.textContent = data.aclwildcardsource;
        row.appendChild(aclwildcardsourceCell);

        var acldestinationCell = document.createElement("td");
        acldestinationCell.textContent = data.acldestination;
        row.appendChild(acldestinationCell);

        var aclwildcardsestinationCell = document.createElement("td");
        aclwildcardsestinationCell.textContent = data.aclwildcardsestination;
        row.appendChild(aclwildcardsestinationCell);

        var acloperationCell = document.createElement("td");
        acloperationCell.textContent = data.acloperation;
        row.appendChild(acloperationCell);

        var aclportnumberCell = document.createElement("td");
        aclportnumberCell.textContent = data.aclportnumber;
        row.appendChild(aclportnumberCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableExtenedAcl.appendChild(row);
    });
}

var applyAclArray = [
    { aclpolicy: "99", aclapplyinterface: "G0/0", aclinout: "in" },
    { aclpolicy: "100", aclapplyinterface: "G0/1", aclinout: "out" },
    { aclpolicy: "101", aclapplyinterface: "G0/2", aclinout: "in" },

    // Add more objects as needed
];

function populateAclApplyInterfaceTable() {
    var tableApplyPolicyAcl = document.getElementById("tableApplyPolicyAcl");
    tableApplyPolicyAcl.innerHTML = ""; // Clear existing content

    applyAclArray.forEach(function(data) {
        var row = document.createElement("tr");

        var aclpolicyCell = document.createElement("td");
        aclpolicyCell.textContent = data.aclpolicy;
        row.appendChild(aclpolicyCell);

        var aclapplyinterfaceCell = document.createElement("td");
        aclapplyinterfaceCell.textContent = data.aclapplyinterface;
        row.appendChild(aclapplyinterfaceCell);

        var aclinoutCell = document.createElement("td");
        aclinoutCell.textContent = data.aclinout;
        row.appendChild(aclinoutCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableApplyPolicyAcl.appendChild(row);
    });
}