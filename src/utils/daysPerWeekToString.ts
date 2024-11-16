export const daysPerWeekToString = (days: boolean[]) => {
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']; // Abbreviations for the days

    return days
        .map((isSelected, index) => (isSelected ? dayNames[index] : null)) // Map true values to day names
        .filter(Boolean) // Remove null values
        .join(', '); // Join the selected day names into a string
}