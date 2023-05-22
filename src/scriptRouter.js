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
        interfaces = data.interface
        createInterfaceButtons(data.interface);

    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });
var staticRoutesInfo;
fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/R-routes.json', {
        method: 'GET' // No need to specify the body for a GET request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        staticRoutesInfo = data
    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });
const interfaceContainer = document.getElementById('interfaceContainerRouter');
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
        button.classList.add('interfaceButtonRouter', 'hover:bg-primary-600', 'focus:bg-primary-600', 'active:bg-primary-700', 'block', 'rounded', 'bg-primary', 'px-6', 'pb-2', 'pt-2.5', 'text-xs', 'font-medium', 'uppercase', 'leading-normal', 'text-white', 'shadow-[0_4px_9px_-4px_#3b71ca]', 'transition', 'duration-150', 'ease-in-out', 'hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'focus:outline-none', 'focus:ring-0', 'active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]', 'dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]', 'dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]', 'dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]');

        // Set the button text
        button.textContent = `Interface ${interfaceName}`;

        // Append the button to the container
        interfaceContainer.appendChild(button);
    }
}

// Call the function with your JSON data
createInterfaceButtons(interfaces);

function showInterfaceRouterForm() {
    interfaceRouterForm.style.display = 'grid';
    staticRouteForm.style.display = 'none';
    ospfForm.style.display = 'none';
    aclForm.style.display = 'none';
    dhcpForm.style.display = 'none';
    var interfaceButtonRouter = document.getElementsByClassName('interfaceButtonRouter');
    for (var i = 0; i < interfaceButtonRouter.length; i++) {
        interfaceButtonRouter[i].addEventListener('click', interfaceButtonRouterClick);
    }
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

function interfaceButtonRouterClick(event) {
    test = event.target.dataset.interface; // Get the interface value
    console.log(interfaces[test]);
    // Get the corresponding interface details from the dictionary


    // Update the input fields with the interface details
    document.getElementById('ip').value = interfaces[test].ip_address;
    // document.getElementById('ipsubnet').value = interfaces[test].ipsubnet;
    // document.getElementById('description').value = interfaces[test].description;
    document.getElementById('methodip').value = interfaces[test].method;
    document.getElementById('interfaceRouter').textContent = test;

    var checkbox = document.getElementById('statusRouter');
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

function populateStaticRouteTable() {
    var staticRouteArray = [];
    var tableStaticRoute = document.getElementById("tableStaticRoute");
    tableStaticRoute.innerHTML = ""; // Clear existing content
    var routes = staticRoutesInfo.vrf.default.address_family.ipv4.routes;
    for (var route in routes) {
        if (routes.hasOwnProperty(route)) {
            var data = {
                destination: route,
                // subnet: routes[route].route,
                nextHop: routes[route].next_hop.next_hop_list["1"].next_hop
            };
            staticRouteArray.push(data);
        }
    }

    staticRouteArray.forEach(function(data) {
        var row = document.createElement("tr");

        var destinationCell = document.createElement("td");
        destinationCell.textContent = data.destination;
        row.appendChild(destinationCell);

        // var subnetCell = document.createElement("td");
        // subnetCell.textContent = data.subnet;
        // row.appendChild(subnetCell);

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
    { area: "1", network: "192.168.10.0", wildcard: "0.0.0.255" },
    { area: "1", network: "192.168.10.0", wildcard: "0.0.0.255" },
    // Add more objects as needed
];

function populateOspfRouteTable() {
    var tableOspfRoute = document.getElementById("tableOspfRoute");
    tableOspfRoute.innerHTML = ""; // Clear existing content

    ospfRouteArray.forEach(function(data) {
        var row = document.createElement("tr");

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