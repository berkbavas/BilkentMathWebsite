// Administrative Staff Data
// Categories: secretary, assistant, technical

export const ADMINISTRATIVE_STAFF = [
    // Department Secretary
    {
        name: "Gizem Ramanlı",
        category: "secretary",
        title: { 
            en: "Department Secretary", 
            tr: "Bölüm Sekreteri" 
        },
        responsibilities: {
            en: "",
            tr: ""
        },
        office: "SA-130",
        phone: "+90 (312) 290-1260",
        email: "mathsec [-at-] bilkent.edu.tr",
        photo: "https://math.bilkent.edu.tr/staff-placeholder.jpg"
    },
];

// Helper function to get staff by category
export function getStaffByCategory(category) {
    return ADMINISTRATIVE_STAFF.filter(staff => staff.category === category);
}

// Get department secretaries
export function getSecretaries() {
    return getStaffByCategory("secretary");
}

// Get administrative assistants
export function getAssistants() {
    return getStaffByCategory("assistant");
}

// Get technical staff
export function getTechnicalStaff() {
    return getStaffByCategory("technical");
}
