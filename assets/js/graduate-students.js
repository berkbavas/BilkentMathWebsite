const GRADUATE_STUDENTS = [
    {
        name: "Hafsah Aamer",
        supervisor: "Gökhan Yıldırım",
        office: "SA-104A",
        phone: "+90 (312) 290-6946",
        email: "h.aamer [-at-] bilkent.edu.tr",
        photo: "https://math.bilkent.edu.tr/Grad_student_photos/Hafsah_Aamer.jpg",
    },
    {
        name: "Hafsah Aamer",
        supervisor: "Gökhan Yıldırım",
        office: "SA-104A",
        phone: "+90 (312) 290-6946",
        email: "h.aamer [-at-] bilkent.edu.tr",
        photo: "https://math.bilkent.edu.tr/Grad_student_photos/Hafsah_Aamer.jpg",
    },
    {
        name: "Hafsah Aamer",
        supervisor: "Gökhan Yıldırım",
        office: "SA-104A",
        phone: "+90 (312) 290-6946",
        email: "h.aamer [-at-] bilkent.edu.tr",
        photo: "https://math.bilkent.edu.tr/Grad_student_photos/Hafsah_Aamer.jpg",
    },
    {
        name: "Hafsah Aamer",
        supervisor: "Gökhan Yıldırım",
        office: "SA-104A",
        phone: "+90 (312) 290-6946",
        email: "h.aamer [-at-] bilkent.edu.tr",
        photo: "https://math.bilkent.edu.tr/Grad_student_photos/Hafsah_Aamer.jpg",
    },
];

function escapeHtml(str) {
    return (str || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function row(s) {
    return `
      <tr>
        <td class="gs-photo-cell">
          <img src="${escapeHtml(s.photo)}" alt="${escapeHtml(s.name)}">
        </td>
        <td class="gs-name">${escapeHtml(s.name)}</td>
        <td>${escapeHtml(s.office)}</td>
        <td>${escapeHtml(s.phone)}</td>
        <td>
          <a href="mailto:${escapeHtml(s.email)}">
            ${escapeHtml(s.email)}
          </a>
         <td>${escapeHtml(s.supervisor)}</td>
        </td>
      </tr>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#graduate-students tbody");
    if (!tbody) return;
    tbody.innerHTML = GRADUATE_STUDENTS.map(row).join("");
});
