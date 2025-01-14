export const isActiveMembership = (paymentDate: Date | null) => {
    if (!paymentDate) return false;
    const today = new Date();

    // hoy es menor a 10
    
    // Get the current date and check the day of the month
    const currentDay = today.getDate();
    
    // Set the start of the current month
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Calculate the previous month
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    // Define the range for valid dates
    let startDate: Date;
    let endDate: Date;
    
    if (currentDay <= 10) {
      // If today is before or on the 10th, valid date range is from 1st of previous month to today
      startDate = new Date(previousMonthYear, previousMonth, 1);
      endDate = today;
    } else {
      // If today is after the 10th, valid date range is from 1st of previous month to today
      startDate = new Date(previousMonthYear, previousMonth, 1);
      endDate = new Date(currentYear, currentMonth, 10);
    } 
    
    // Check if the given date is within the valid range
    return paymentDate >= startDate && paymentDate <= endDate;
}