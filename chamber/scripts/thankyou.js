document.addEventListener("DOMContentLoaded", () => {
    // Read the GET URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const resultsContainer = document.getElementById("results-summary");

    // Extracting required form data
    const firstName = urlParams.get("first_name") || "N/A";
    const lastName = urlParams.get("last_name") || "N/A";
    const email = urlParams.get("email") || "N/A";
    const phone = urlParams.get("phone") || "N/A";
    const businessName = urlParams.get("business_name") || "N/A";
    const timestamp = urlParams.get("timestamp") || "N/A";

    // Injecting into the DOM cleanly
    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <hr style="margin: 1.5rem 0;">
        <p><em>Application timestamp: ${timestamp}</em></p>
    `;
});