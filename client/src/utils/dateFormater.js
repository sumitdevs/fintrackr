
export function formatDate(isoDateString) {
    const date = new Date(isoDateString);
  
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }
  