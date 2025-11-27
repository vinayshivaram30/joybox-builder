/**
 * Maps Supabase error codes to user-friendly messages
 * Prevents internal system details from being exposed to users
 */
export const getErrorMessage = (error: any): string => {
  // Handle specific Supabase error codes
  if (error?.code) {
    switch (error.code) {
      case '23505':
        return 'This record already exists. Please try a different value.';
      case '42501':
        return 'You don\'t have permission to perform this action.';
      case '23503':
        return 'This action cannot be completed due to related data.';
      case '22001':
        return 'The input is too long. Please shorten your entry.';
      case 'PGRST116':
        return 'The requested resource was not found.';
      case '23502':
        return 'Required information is missing. Please fill in all required fields.';
      case 'P0001':
        return 'This action is not allowed.';
      default:
        // Log the error for debugging but don't expose to user
        console.error('Unhandled error code:', error.code, error);
    }
  }

  // Handle authentication errors
  if (error?.message) {
    const msg = error.message.toLowerCase();
    if (msg.includes('jwt') || msg.includes('token')) {
      return 'Your session has expired. Please sign in again.';
    }
    if (msg.includes('password')) {
      return 'Invalid email or password.';
    }
    if (msg.includes('email')) {
      return 'Please enter a valid email address.';
    }
    if (msg.includes('network')) {
      return 'Network error. Please check your connection and try again.';
    }
  }

  // Default generic message
  return 'Something went wrong. Please try again.';
};
