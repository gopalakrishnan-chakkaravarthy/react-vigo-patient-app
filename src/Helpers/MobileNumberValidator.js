export function MobileNumberValidator(mobileNumber) {
  if (!mobileNumber) return 'Please enter valid mobile number.';
  const isNotANumber = isNaN(mobileNumber);
  if (isNotANumber) {
    return 'Please enter 10 digit mobile number without characters';
  }
  if (!(mobileNumber.length === 10)) {
    return 'Please enter valid mobile number.';
  }
  return '';
}
