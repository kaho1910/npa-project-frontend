function showInterfaceRouterForm() {
    interfaceRouterForm.style.display = 'grid';
    staticRouteForm.style.display = 'none';
    ospfForm.style.display = 'none';
    aclForm.style.display = 'none';
    dhcpForm.style.display = 'none';
}

function showStaticRouteForm() {
    interfaceRouterForm.style.display = 'none';
    staticRouteForm.style.display = 'grid';
    ospfForm.style.display = 'none';
    aclForm.style.display = 'none';
    dhcpForm.style.display = 'none';
    populateStaticRouteTable();
}

function showOpsfForm() {
    interfaceRouterForm.style.display = 'none';
    staticRouteForm.style.display = 'none';
    ospfForm.style.display = 'grid';
    aclForm.style.display = 'none';
    dhcpForm.style.display = 'none';
    populateOspfRouteTable();
}

function showAclForm() {
    interfaceRouterForm.style.display = 'none';
    staticRouteForm.style.display = 'none';
    ospfForm.style.display = 'none';
    aclForm.style.display = 'grid';
    dhcpForm.style.display = 'none';
    populateExtendedAclTable();
    populateAclApplyInterfaceTable();
}

function showDhcpForm() {
    interfaceRouterForm.style.display = 'none';
    staticRouteForm.style.display = 'none';
    ospfForm.style.display = 'none';
    aclForm.style.display = 'none';
    dhcpForm.style.display = 'grid';
    populataDhcpPoolTable();
}
var interfaceRouterButton = document.getElementById('interfaceRouterButton');
var interfaceRouterForm = document.getElementById('interfaceRouterForm');
var staticRouteButton = document.getElementById('staticRouteButton');
var staticRouteForm = document.getElementById('staticRouteForm');
var ospfButton = document.getElementById('ospfButton');
var ospfForm = document.getElementById('ospfForm');
var aclButton = document.getElementById('aclButton');
var aclForm = document.getElementById('aclForm');
var dhcpButton = document.getElementById('dhcpButton');
var dhcpForm = document.getElementById('dhcpForm');
interfaceRouterButton.addEventListener('click', showInterfaceRouterForm);
staticRouteButton.addEventListener('click', showStaticRouteForm);
ospfButton.addEventListener('click', showOpsfForm);
aclButton.addEventListener('click', showAclForm);
dhcpButton.addEventListener('click', showDhcpForm);


var interfaceButtonRouter = document.getElementsByClassName('interfaceButtonRouter');
for (var i = 0; i < interfaceButtonRouter.length; i++) {
    interfaceButtonRouter[i].addEventListener('click', interfaceButtonRouterClick);
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

function interfaceButtonRouterClick(event) {
    var test = event.target.dataset.interface; // Get the interface value

    // Get the corresponding interface details from the dictionary
    var interfaceDetails = {
        "G0/0": { status: "on", method: "static", ip: "192.18.1.1", ipsubnet: '255.255.240.0', description: "test" },
        "G0/1": { status: "on", method: "dhcp", ip: "192.18.1.2", ipsubnet: '255.255.255.0', description: "2" },
        "G0/2": { status: "on", method: "static", ip: "192.18.1.3", ipsubnet: '255.255.255.0', description: "3" },
        "G0/3": { status: "on", method: "static", ip: "192.18.1.4", ipsubnet: '255.255.192.0', description: "4" },
        "G0/4": { status: "on", method: "dhcp", ip: "192.18.1.5", ipsubnet: '255.255.255.0', description: "5" },
        "G0/5": { status: "off", method: "static", ip: "192.18.1.6", ipsubnet: '255.255.255.128', description: "test" },
        // Add more interface details here
    };

    // Update the input fields with the interface details
    document.getElementById('ip').value = interfaceDetails[test].ip;
    document.getElementById('ipsubnet').value = interfaceDetails[test].ipsubnet;
    document.getElementById('description').value = interfaceDetails[test].description;
    document.getElementById('methodip').value = interfaceDetails[test].method;
    document.getElementById('interfaceRouter').textContent = test;

    var checkbox = document.getElementById('statusRouter');
    if (interfaceDetails[test].status === "on") {
        checkbox.checked = true; // Set the checkbox to checked
    } else {
        checkbox.checked = false; // Set the checkbox to unchecked
    }
    if (interfaceDetails[test].method === "dhcp") {
        ipInput.disabled = true;
        subnetInput.disabled = true;
    } else {
        ipInput.disabled = false;
        subnetInput.disabled = false;
    }
}
var staticRouteArray = [
    { destination: "192.168.1.0", subnet: "255.255.255.0", nextHop: "192.168.1.1" },
    { destination: "10.168.2.0", subnet: "255.255.255.0", nextHop: "10.168.2.1" },
    // Add more objects as needed
];

function populateStaticRouteTable() {
    var tableStaticRoute = document.getElementById("tableStaticRoute");
    tableStaticRoute.innerHTML = ""; // Clear existing content

    staticRouteArray.forEach(function(data) {
        var row = document.createElement("tr");

        var destinationCell = document.createElement("td");
        destinationCell.textContent = data.destination;
        row.appendChild(destinationCell);

        var subnetCell = document.createElement("td");
        subnetCell.textContent = data.subnet;
        row.appendChild(subnetCell);

        var nextHopCell = document.createElement("td");
        nextHopCell.textContent = data.nextHop;
        row.appendChild(nextHopCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableStaticRoute.appendChild(row);
    });
}

var ospfRouteArray = [
    { processid: "192.168.1.0", area: "1", network: "192.168.10.0", wildcard: "0.0.0.255" },
    { processid: "192.168.1.0", area: "1", network: "192.168.10.0", wildcard: "0.0.0.255" },
    // Add more objects as needed
];

function populateOspfRouteTable() {
    var tableOspfRoute = document.getElementById("tableOspfRoute");
    tableOspfRoute.innerHTML = ""; // Clear existing content

    ospfRouteArray.forEach(function(data) {
        var row = document.createElement("tr");

        var processidCell = document.createElement("td");
        processidCell.textContent = data.processid;
        row.appendChild(processidCell);

        var areaCell = document.createElement("td");
        areaCell.textContent = data.area;
        row.appendChild(areaCell);

        var networkCell = document.createElement("td");
        networkCell.textContent = data.network;
        row.appendChild(networkCell);
        var wildcardCell = document.createElement("td");
        wildcardCell.textContent = data.wildcard;
        row.appendChild(wildcardCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableOspfRoute.appendChild(row);
    });
}
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

var dhcpPoolArray = [
    { dhcppoolname: "Toen", dhcpnetwork: "10.0.0.0", dhcpsubnet: "255.255.0.0", exclfrom: "10.0.0.1", exclto: "10.0.0.50", dhcpdfgwip: "10.0.0.1", dhcpdnsipad: "8.8.8.8" },
    { dhcppoolname: "Gram", dhcpnetwork: "192.168.1.0", dhcpsubnet: "255.255.255.0", exclfrom: "192.168.1.1", exclto: "192.168.1.128", dhcpdfgwip: "192.168.1.1", dhcpdnsipad: "8.8.1.1" },
    { dhcppoolname: "Ji", dhcpnetwork: "172.168.1.0", dhcpsubnet: "255.255.0.0", exclfrom: "172.168.1.1", exclto: "172.168.1.70", dhcpdfgwip: "172.168.1.1", dhcpdnsipad: "1.1.1.1" },
    // Add more objects as needed
];

function populataDhcpPoolTable() {
    var tableDhcpPoolTable = document.getElementById("tableDhcpPoolTable");
    tableDhcpPoolTable.innerHTML = ""; // Clear existing content

    dhcpPoolArray.forEach(function(data) {
        var row = document.createElement("tr");

        var dhcppoolnameCell = document.createElement("td");
        dhcppoolnameCell.textContent = data.dhcppoolname;
        row.appendChild(dhcppoolnameCell);

        var dhcpnetworkCell = document.createElement("td");
        dhcpnetworkCell.textContent = data.dhcpnetwork + "/" + data.dhcpsubnet;
        row.appendChild(dhcpnetworkCell);

        var exclfromtoCell = document.createElement("td");
        exclfromtoCell.textContent = data.exclfrom + "-" + data.exclto;
        row.appendChild(exclfromtoCell);

        var dhcpdfgwipCell = document.createElement("td");
        dhcpdfgwipCell.textContent = data.dhcpdfgwip;
        row.appendChild(dhcpdfgwipCell);

        var dhcpdnsipadCell = document.createElement("td");
        dhcpdnsipadCell.textContent = data.dhcpdnsipad;
        row.appendChild(dhcpdnsipadCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableDhcpPoolTable.appendChild(row);
    });
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