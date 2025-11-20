// scripts/thankyou.js

document.addEventListener("DOMContentLoaded", () => {
    const summaryDiv = document.getElementById("summary");
    if (!summaryDiv) return; // Exit if not on the thankyou page

    // Create a new URLSearchParams object from the current window's query string
    const params = new URLSearchParams(window.location.search);

    // Get all the *required* fields from the URL
    const fname = params.get("fname") || "Not provided";
    const lname = params.get("lname") || "Not provided";
    const email = params.get("email") || "Not provided";
    const phone = params.get("phone") || "Not provided";
    const bizname = params.get("bizname") || "Not provided";
    const timestamp = params.get("timestamp") || "Not provided";

    // Format the timestamp for readability
    let formattedDate = "Not provided";
    if (timestamp !== "Not provided") {
        formattedDate = new Date(timestamp).toLocaleString();
    }

    // Display the data
    summaryDiv.innerHTML = `
        <ul>
            <li><strong>First Name:</strong> ${fname}</li>
            <li><strong>Last Name:</strong> ${lname}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Organization:</strong> ${bizname}</li>
            <li><strong>Application Date:</strong> ${formattedDate}</li>
        </ul>
    `;
});