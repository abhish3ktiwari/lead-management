// JavaScript for managing leads
let leads = JSON.parse(localStorage.getItem('leads')) || [];

// Function to add a lead
function addLead(name, status) {
    const newLead = {
        id: leads.length + 1,
        name,
        status,
    };
    leads.push(newLead);
    localStorage.setItem('leads', JSON.stringify(leads));
    updateLeadTable();
    updateDashboard();
}

// Function to update the lead table
function updateLeadTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    leads.forEach((lead) => {
        const row = `
            <tr>
                <td>${lead.id}</td>
                <td>${lead.name}</td>
                <td>${lead.status}</td>
                <td><a href="lead-details.html?id=${lead.id}">View Details</a></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to update the dashboard
function updateDashboard() {
    const totalLeads = leads.length;
    const contactedLeads = leads.filter((lead) => lead.status === 'Contacted').length;
    const newLeads = leads.filter((lead) => lead.status === 'New').length;
    const notInterestedLeads = leads.filter((lead) => lead.status === 'Not Interested').length;

    document.querySelector('#totalLeads').innerText = totalLeads;
    document.querySelector('#contactedLeads').innerText = contactedLeads;
    document.querySelector('#newLeads').innerText = newLeads;
    document.querySelector('#notInterestedLeads').innerText = notInterestedLeads;
}

// Event Listener for adding a new lead
if (document.querySelector('#leadForm')) {
    document.querySelector('#leadForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.querySelector('#leadName').value;
        const status = document.querySelector('#status').value;
        addLead(name, status);
        this.reset();
    });
}

// Initial load
if (document.querySelector('tbody')) updateLeadTable();
if (document.querySelector('#totalLeads')) updateDashboard();
