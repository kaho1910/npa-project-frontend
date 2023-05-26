// Parse the query parameters from the API URL
const urlParams = new URLSearchParams(window.location.search);

// Extract the value of the "name" parameter
const routerName = urlParams.get('name');

// Update the content of the <h2> element
const routerNameElement = document.getElementById('routerName');
routerNameElement.textContent = routerName;

var interfaces;
// fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/S-interfaces.json', {
//         method: 'GET' // No need to specify the body for a GET request
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Handle the response data
//         interfaces = data.interface
//         createInterfaceButtons(data.interface);

//     })
//     .catch(error => {
//         // Handle any errors
//         console.log(error);
//     });
    var rawInterfaceRouter = "{\n    \"device\": \"" + routerName + "\"\n}";


var requestOptions = {
  method: 'POST',
  headers: {
        'Content-Type': 'application/json'
      },
  body: rawInterfaceRouter,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/show_ip", requestOptions)
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    interfaces = data.interface
    createInterfaceButtons(data.interface);

})
  .catch(error => console.log('error', error));
var staticRoutesInfo;
// fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/R-routes.json', {
//         method: 'GET' // No need to specify the body for a GET request
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         staticRoutesInfo = data
//     })
//     .catch(error => {
//         // Handle any errors
//         console.log(error);
//     });

var rawStaticRoute = "{\n    \"device\": \"" + routerName + "\"\n}";

var requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: rawStaticRoute,
    redirect: 'follow'
};

fetch("http://127.0.0.1:8000/show_ip_route", requestOptions)
    .then(response => response.json())
    .then(data => {
                staticRoutesInfo = data;
            })
    .catch(error => console.log('error', error));

var ospfRouteInfo;
// fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/R-ospf.json', {
//         method: 'GET' // No need to specify the body for a GET request
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         ospfRouteInfo = data
//     })
//     .catch(error => {
//         // Handle any errors
//         console.log(error);
//     });

var rawOspfRoute = "{\n    \"device\": \"" + routerName + "\"\n}";

var requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: rawOspfRoute,
    redirect: 'follow'
};

fetch("http://127.0.0.1:8000/show_ip_route", requestOptions)
    .then(response => response.json())
    .then(data => {
        ospfRouteInfo = data
    })
    .catch(error => console.log('error', error));


var extendAclInfo;
// fetch('https://raw.githubusercontent.com/kaho1910/npa-project-frontend/main/src/example-data/R-acl.json', {
//         method: 'GET' // No need to specify the body for a GET request
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         extendAclInfo = data
//     })
//     .catch(error => {
//         // Handle any errors
//         console.log(error);
//     });
    var rawExtenedAcl = "{\n    \"device\": \"" + routerName + "\"\n}";


    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: rawExtenedAcl,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/show_acl", requestOptions)
      .then(response => response.json())
      .then(data => {
        extendAclInfo = data
    })
      .catch(error => console.log('error', error));

// Router Interfaces Button
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
        button.classList.add('hover:bg-violet-600', 'active:bg-violet-700', 'focus:outline-none', 'focus:ring', 'focus:ring-violet-300', 'rounded-md', 'border', 'border-primary', 'border-primary', 'mx-2', 'my-2', 'interfaceButtonRouter', 'block', 'px-6', 'pb-2', 'pt-2.5', 'text-xs', 'font-medium', 'uppercase', 'leading-normal', 'text-primary', 'shadow-[0_4px_9px_-4px_#3b71ca]', 'transition', 'duration-150', 'ease-in-out', 'hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'focus:outline-none', 'focus:ring-0', 'active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]', 'dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]', 'dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]', 'dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]', 'dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]');

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
    // dhcpForm.style.display = 'none';
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
    // dhcpForm.style.display = 'none';
    populateStaticRouteTable();
}

function showOpsfForm() {
    interfaceRouterForm.style.display = 'none';
    staticRouteForm.style.display = 'none';
    ospfForm.style.display = 'grid';
    aclForm.style.display = 'none';
    // dhcpForm.style.display = 'none';
    populateOspfRouteTable();
}

function showAclForm() {
    interfaceRouterForm.style.display = 'none';
    staticRouteForm.style.display = 'none';
    ospfForm.style.display = 'none';
    aclForm.style.display = 'grid';
    // dhcpForm.style.display = 'none';
    populateExtendedAclTable();
    populateAclApplyInterfaceTable();
}

// function showDhcpForm() {
//     interfaceRouterForm.style.display = 'none';
//     staticRouteForm.style.display = 'none';
//     ospfForm.style.display = 'none';
//     aclForm.style.display = 'none';
//     dhcpForm.style.display = 'grid';
//     populataDhcpPoolTable();
// }

var interfaceRouterButton = document.getElementById('interfaceRouterButton');
var interfaceRouterForm = document.getElementById('interfaceRouterForm');
var staticRouteButton = document.getElementById('staticRouteButton');
var staticRouteForm = document.getElementById('staticRouteForm');
var ospfButton = document.getElementById('ospfButton');
var ospfForm = document.getElementById('ospfForm');
var aclButton = document.getElementById('aclButton');
var aclForm = document.getElementById('aclForm');
// var dhcpButton = document.getElementById('dhcpButton');
// var dhcpForm = document.getElementById('dhcpForm');
interfaceRouterButton.addEventListener('click', showInterfaceRouterForm);
staticRouteButton.addEventListener('click', showStaticRouteForm);
ospfButton.addEventListener('click', showOpsfForm);
aclButton.addEventListener('click', showAclForm);
// dhcpButton.addEventListener('click', showDhcpForm);



var interfaceNameRouter;
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
var ipInput = document.getElementById("ip");
var ipLabel = document.getElementById("ipLabel");

function interfaceButtonRouterClick(event) {
    interfaceNameRouter = event.target.dataset.interface; // Get the interface value
    // Get the corresponding interface details from the dictionary


    // Update the input fields with the interface details
    document.getElementById('ip').value = interfaces[interfaceNameRouter].ip_address;
    // document.getElementById('ipsubnet').value = interfaces[interfaceName].ipsubnet;
    // document.getElementById('description').value = interfaces[interfaceName].description;
    document.getElementById('methodip').value = interfaces[interfaceNameRouter].method;
    document.getElementById('interfaceRouter').textContent = interfaceNameRouter;

    var checkbox = document.getElementById('statusRouter');
    if (interfaces[interfaceNameRouter].status === "administratively down") {
        checkbox.checked = false; // Set the checkbox to unchecked
    } else {
        checkbox.checked = true; // Set the checkbox to checked
    }
    if (interfaces[interfaceNameRouter].method === "manual") {
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

ipInput.addEventListener("input", function() {
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


function populateStaticRouteTable() {
    var staticRouteArray = [];
    var tableStaticRoute = document.getElementById("tableStaticRoute");
    tableStaticRoute.innerHTML = ""; // Clear existing content
    var routes = staticRoutesInfo.vrf.default.address_family.ipv4.routes;
    for (var route in routes) {
        if (routes.hasOwnProperty(route)) {
            for (var i in routes[route]["next_hop"]) {
                for (var j in routes[route]["next_hop"][i]){
                    if (routes[route]["next_hop"][i][j].outgoing_interface === undefined) {
                        var hop = routes[route]["next_hop"][i][j].next_hop
                    } else {
                        var hop = routes[route]["next_hop"][i][j].outgoing_interface
                    }
                    var data = {
                        destination: route,
                        nextHop: hop
                    };
                    staticRouteArray.push(data);
                }
            }
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
        nextHopCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        nextHopCell.textContent = data.nextHop;
        row.appendChild(nextHopCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline", "top-0");
        var subnetMask = getSubnetMask(data.destination);
        removeLink.addEventListener("click", function(event) {
            event.preventDefault();
            removeStaticRoute(data.destination.split("/")[0], data.nextHop, subnetMask);
        });
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableStaticRoute.appendChild(row);
    });
}
function removeStaticRoute(destination, nextHop, subnetMask) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "device": routerName,
        "routes": [
            {
                "network": destination,
                "subnet": subnetMask,
                "next_hop_ip": nextHop
            }
        ]
    });
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/route", requestOptions)
        .then(response => response.json())
        .then(result => {
            // Handle the result as needed
            console.log(result);
            // Optionally, you can update the UI or perform any other actions here
        })
        .catch(error => console.log('error', error));
}
function getSubnetMask(destination) {
    var subnetPrefixLength = parseInt(destination.split('/')[1], 10);
    var subnetMask = '';

    for (var i = 0; i < 4; i++) {
        var octetValue = Math.min(subnetPrefixLength, 8);
        var octetMask = 256 - Math.pow(2, 8 - octetValue);
        subnetMask += octetMask.toString();
        subnetPrefixLength -= octetValue;
        if (i < 3) {
            subnetMask += '.';
        }
    }

    return subnetMask;
}
var destinationInput = document.getElementById("destination");
var destinationLabel = document.getElementById("destinationLabel");

destinationInput.addEventListener("input", function() {
    var destination = destinationInput.value;

    // Regular expression to match the IP address format
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Check if the input matches the IP address format
    if (ipRegex.test(destination)) {
        var octets = destination.split(".");
        var isValid = octets.every(function(octet) {
            // Convert each octet to a number and check if it falls within the valid range (0-255)
            var num = parseInt(octet);
            return num >= 0 && num <= 255;
        });

        if (isValid) {
            // Input is valid
            destinationLabel.textContent = "*Valid IP address format";
            destinationLabel.classList.remove("text-danger");
            destinationLabel.classList.add("text-success");
        } else {
            // Input is invalid
            destinationLabel.textContent = "*Invalid IP address format";
            destinationLabel.classList.remove("text-success");
            destinationLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        destinationLabel.textContent = "*Invalid IP address format";
        destinationLabel.classList.remove("text-success");
        destinationLabel.classList.add("text-danger");
    }
});
var nexthopInput = document.getElementById("Nexthop");
var nexthopLabel = document.getElementById("nexthopLabel");

nexthopInput.addEventListener("input", function() {
    var nexthop = nexthopInput.value;

    // Regular expression to match the IP address format
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Check if the input matches the IP address format
    if (ipRegex.test(nexthop)) {
        var octets = nexthop.split(".");
        var isValid = octets.every(function(octet) {
            // Convert each octet to a number and check if it falls within the valid range (0-255)
            var num = parseInt(octet);
            return num >= 0 && num <= 255;
        });

        if (isValid) {
            // Input is valid
            nexthopLabel.textContent = "*Valid IP address format";
            nexthopLabel.classList.remove("text-danger");
            nexthopLabel.classList.add("text-success");
        } else {
            // Input is invalid
            nexthopLabel.textContent = "*Invalid IP address format";
            nexthopLabel.classList.remove("text-success");
            nexthopLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        nexthopLabel.textContent = "*Invalid IP address format";
        nexthopLabel.classList.remove("text-success");
        nexthopLabel.classList.add("text-danger");
    }
});
// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const form = event.target;
    const device = routerName;
    const interfaceName = interfaceNameRouter;
    // const description = form.querySelector('textarea[name="description"]').value;
    const ip = form.querySelector('input[name="ip"]').value;
    const subnet = form.querySelector('select[name="ipsubnet"]').value;
    const status = form.querySelector('input[name="statusRouter"]').checked;
  
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
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error('Error:', error));
  }
  
  interfaceRouterForm.addEventListener('submit', handleSubmit);
  
function populateOspfRouteTable() {
    var ospfRouteArray = [];
    var tableOspfRoute = document.getElementById("tableOspfRoute");
    tableOspfRoute.innerHTML = ""; // Clear existing content

    var areas = ospfRouteInfo.instance["1"].areas;
    for (var area in areas) {
        if (areas.hasOwnProperty(area)) {
            var interfaces = areas[area].interfaces;
            for (var iface in interfaces) {
                if (interfaces.hasOwnProperty(iface)) {
                    var data = {
                        area: area,
                        network: interfaces[iface].ip_address,
                        interface: iface
                    };
                    ospfRouteArray.push(data);
                }
            }
        }
    }

    ospfRouteArray.forEach(function(data) {
        var row = document.createElement("tr");

        var areaCell = document.createElement("td");
        areaCell.textContent = data.area;
        row.appendChild(areaCell);

        var networkCell = document.createElement("td");
        networkCell.textContent = data.network;
        networkCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");

        row.appendChild(networkCell);

        var interfaceOspfCell = document.createElement("td");
        interfaceOspfCell.textContent = data.interface;
        interfaceOspfCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(interfaceOspfCell);

        var actionCell = document.createElement("td");
        var removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "Remove";
        removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
        var subnetMask = getSubnetMask(data.network);
        console.log(subnetMask);
        var wildCard = getWildcard(subnetMask);
        removeLink.addEventListener('click', function(event) {
            event.preventDefault();
            removeOspfRoute(data.network.split("/")[0], data.area, wildCard);
          });
      
        actionCell.appendChild(removeLink);
        row.appendChild(actionCell);
        tableOspfRoute.appendChild(row);
    });
}
function getWildcard(subnetMask) {
    var staticMap = {
      '0.0.0.0': '255.255.255.255',
      '128.0.0.0': '127.255.255.255',
      '192.0.0.0': '63.255.255.255',
      '224.0.0.0': '31.255.255.255',
      '240.0.0.0': '15.255.255.255',
      '248.0.0.0': '7.255.255.255',
      '252.0.0.0': '3.255.255.255',
      '254.0.0.0': '1.255.255.255',
      '255.0.0.0': '0.255.255.255',
      '255.128.0.0': '0.127.255.255',
      '255.192.0.0': '0.63.255.255',
      '255.224.0.0': '0.31.255.255',
      '255.240.0.0': '0.15.255.255',
      '255.248.0.0': '0.7.255.255',
      '255.252.0.0': '0.3.255.255',
      '255.254.0.0': '0.1.255.255',
      '255.255.0.0': '0.0.255.255',
      '255.255.128.0': '0.0.127.255',
      '255.255.192.0': '0.0.63.255',
      '255.255.224.0': '0.0.31.255',
      '255.255.240.0': '0.0.15.255',
      '255.255.248.0': '0.0.7.255',
      '255.255.252.0': '0.0.3.255',
      '255.255.254.0': '0.0.1.255',
      '255.255.255.0': '0.0.0.255',
      '255.255.255.128': '0.0.0.127',
      '255.255.255.192': '0.0.0.63',
      '255.255.255.224': '0.0.0.31',
      '255.255.255.240': '0.0.0.15',
      '255.255.255.248': '0.0.0.7',
      '255.255.255.252': '0.0.0.3',
      '255.255.255.254': '0.0.0.1',
      '255.255.255.255': '0.0.0.0'
    };
    console.log(subnetMask);
    console.log(staticMap[subnetMask]);
    return staticMap[subnetMask];
  }
  
  

function removeOspfRoute(network, area, wildCard) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "device": routerName,
      "ospf": [
        {
          "network": network,
          "wildcard": wildCard,
          "area": area
        }
      ]
    });
    console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch("http://127.0.0.1:8000/ospf_del/1", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

ospfForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var areaInput = document.getElementById("area");
    var networkInput = document.getElementById("network");
    var wildcardInput = document.getElementById("wildcard");

    var area = areaInput.value;
    var network = networkInput.value;
    var wildcard = wildcardInput.value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "device": routerName,
        "process": 1,
        "ospf": [{
            "network": network,
            "wildcard": wildcard,
            "area": area
        }]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/ospf", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});

var networkInput = document.getElementById("network");
var networkLabel = document.getElementById("networkLabel");

networkInput.addEventListener("input", function() {
    var network = networkInput.value;

    // Regular expression to match the IP address format
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    // Check if the input matches the IP address format
    if (ipRegex.test(network)) {
        var octets = network.split(".");
        var isValid = octets.every(function(octet) {
            // Convert each octet to a number and check if it falls within the valid range (0-255)
            var num = parseInt(octet);
            return num >= 0 && num <= 255;
        });

        if (isValid) {
            // Input is valid
            networkLabel.textContent = "*Valid IP address format";
            networkLabel.classList.remove("text-danger");
            networkLabel.classList.add("text-success");
        } else {
            // Input is invalid

            networkLabel.textContent = "*Invalid IP address format";
            networkLabel.classList.remove("text-success");
            networkLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        networkLabel.textContent = "*Invalid IP address format";
        networkLabel.classList.remove("text-success");
        networkLabel.classList.add("text-danger");
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
        acesCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(acesCell);

        var forwardCell = document.createElement("td");
        forwardCell.textContent = data.forward;
        forwardCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(forwardCell);

        var protocolCell = document.createElement("td");
        protocolCell.textContent = data.protocol;
        protocolCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(protocolCell);

        var sourceCell = document.createElement("td");
        sourceCell.textContent = data.source;
        sourceCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(sourceCell);

        var destinaionCell = document.createElement("td");
        destinaionCell.textContent = data.destination;
        destinaionCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
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
  "device": routerName,
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
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
// Add event listener for form submission
aclForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get form inputs
  const aclName = document.getElementById('aclname').value;
  const aclPermission = document.getElementById('aclpermission').value;
  const aclProtocol = document.getElementById('aclprotocol').value;
  const aclSource = document.getElementById('aclsource').value;
  const aclWildcardSource = document.getElementById('aclwildcardsource').value;
  const aclOperation = document.getElementById('acloperation').value;
  const aclDestination = document.getElementById('acldestination').value;
  const aclWildcardDestination = document.getElementById('aclwildcardsestination').value;
  const aclPortNumber = document.getElementById('aclportnumber').value;
  
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var formData = {
    device: routerName,
    name: aclName,
    action: aclPermission,
    protocol: aclProtocol,
    ip: aclSource,
    wildcard: aclWildcardSource,
    dst: aclDestination,
    network: aclWildcardDestination,
    eq: aclOperation, // optional
    port: aclPortNumber // optional
};
console.log(formData);
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formData,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/acl", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
 
});


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
            aclsourceLabel.textContent = "*Valid IP address format";
            aclsourceLabel.classList.remove("text-danger");
            aclsourceLabel.classList.add("text-success");
        } else {
            // Input is invalid
            aclsourceLabel.textContent = "*Invalid IP address format";
            aclsourceLabel.classList.remove("text-success");
            aclsourceLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        aclsourceLabel.textContent = "*Invalid IP address format";
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
            acldestinationLabel.textContent = "*Valid IP address format";
            acldestinationLabel.classList.remove("text-danger");
            acldestinationLabel.classList.add("text-success");
        } else {
            // Input is invalid
            acldestinationLabel.textContent = "*Invalid IP address format";
            acldestinationLabel.classList.remove("text-success");
            acldestinationLabel.classList.add("text-danger");
        }
    } else {
        // Input is invalid
        acldestinationLabel.textContent = "*Invalid IP address format";
        acldestinationLabel.classList.remove("text-success");
        acldestinationLabel.classList.add("text-danger");
    }
});
var aclportnumberInput = document.getElementById("aclportnumber");

aclportnumberInput.addEventListener("input", function() {
    var aclportnumber = aclportnumberInput.value;

    // Remove any non-digit characters from the input
    aclportnumber = aclportnumber.replace(/\D/g, "");

    // Ensure the port number is within the valid range
    aclportnumber = Math.min(Math.max(0, aclportnumber), 65536);

    // Update the input value with the sanitized and constrained value
    aclportnumberInput.value = aclportnumber;
});



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
        aclapplyinterfaceCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
        row.appendChild(aclapplyinterfaceCell);

        var aclinoutCell = document.createElement("td");
        aclinoutCell.textContent = data.aclinout;
        aclinoutCell.classList.add("border-2", "border-slate-600", "border-y-transparent", "border-x-primary");
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

// var dhcpPoolArray = [
//     { dhcppoolname: "Toen", dhcpnetwork: "10.0.0.0", dhcpsubnet: "255.255.0.0", exclfrom: "10.0.0.1", exclto: "10.0.0.50", dhcpdfgwip: "10.0.0.1", dhcpdnsipad: "8.8.8.8" },
//     { dhcppoolname: "Gram", dhcpnetwork: "192.168.1.0", dhcpsubnet: "255.255.255.0", exclfrom: "192.168.1.1", exclto: "192.168.1.128", dhcpdfgwip: "192.168.1.1", dhcpdnsipad: "8.8.1.1" },
//     { dhcppoolname: "Ji", dhcpnetwork: "172.168.1.0", dhcpsubnet: "255.255.0.0", exclfrom: "172.168.1.1", exclto: "172.168.1.70", dhcpdfgwip: "172.168.1.1", dhcpdnsipad: "1.1.1.1" },
//     // Add more objects as needed
// ];

// function populataDhcpPoolTable() {
//     var tableDhcpPoolTable = document.getElementById("tableDhcpPoolTable");
//     tableDhcpPoolTable.innerHTML = ""; // Clear existing content

//     dhcpPoolArray.forEach(function(data) {
//         var row = document.createElement("tr");

//         var dhcppoolnameCell = document.createElement("td");
//         dhcppoolnameCell.textContent = data.dhcppoolname;
//         row.appendChild(dhcppoolnameCell);

//         var dhcpnetworkCell = document.createElement("td");
//         dhcpnetworkCell.textContent = data.dhcpnetwork + "/" + data.dhcpsubnet;
//         row.appendChild(dhcpnetworkCell);

//         var exclfromtoCell = document.createElement("td");
//         exclfromtoCell.textContent = data.exclfrom + "-" + data.exclto;
//         row.appendChild(exclfromtoCell);

//         var dhcpdfgwipCell = document.createElement("td");
//         dhcpdfgwipCell.textContent = data.dhcpdfgwip;
//         row.appendChild(dhcpdfgwipCell);

//         var dhcpdnsipadCell = document.createElement("td");
//         dhcpdnsipadCell.textContent = data.dhcpdnsipad;
//         row.appendChild(dhcpdnsipadCell);

//         var actionCell = document.createElement("td");
//         var removeLink = document.createElement("a");
//         removeLink.href = "#";
//         removeLink.textContent = "Remove";
//         removeLink.classList.add("text-blue-600", "dark:text-blue-500", "font-medium", "hover:underline");
//         actionCell.appendChild(removeLink);
//         row.appendChild(actionCell);
//         tableDhcpPoolTable.appendChild(row);
//     });
// }
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

// Dynamic Device Name Zone



// DDNZ