document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const demoFillBtn = document.getElementById('demoFillBtn');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const summaryCard = document.getElementById('summaryCard');

  // Input Fields
  const fullNameInput = document.getElementById('fullName');
  const rollNumberInput = document.getElementById('rollNumber');
  const emailInput = document.getElementById('email');
  const mobileInput = document.getElementById('mobile');
  const dobInput = document.getElementById('dob');
  const departmentSelect = document.getElementById('department');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const strengthBar = document.getElementById('strengthBar');

  // Regex Patterns
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^[0-9]{10}$/;

  /* -------------------------------------------------------------------------- */
  /* Helper Functions for Form UI & Errors                                       */
  /* -------------------------------------------------------------------------- */

  function showError(groupId, errId, customMessage) {
    const group = document.getElementById(groupId);
    const errElem = document.getElementById(errId);

    if (group) {
      group.classList.add('has-error');
      group.classList.remove('has-success');
    }
    if (errElem && customMessage) {
      errElem.textContent = customMessage;
    }
  }

  function clearError(groupId) {
    const group = document.getElementById(groupId);
    if (group) {
      group.classList.remove('has-error');
      group.classList.add('has-success');
    }
  }

  function resetGroupState(groupId) {
    const group = document.getElementById(groupId);
    if (group) {
      group.classList.remove('has-error', 'has-success');
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Individual Field Validations                                              */
  /* -------------------------------------------------------------------------- */

  function validateFullName() {
    const value = fullNameInput.value.trim();
    if (!value) {
      showError('group-fullName', 'err-fullName', 'Full Name should not be empty.');
      return false;
    }
    clearError('group-fullName');
    return true;
  }

  function validateRollNumber() {
    const value = rollNumberInput.value.trim();
    if (!value) {
      showError('group-rollNumber', 'err-rollNumber', 'Roll Number should not be empty.');
      return false;
    }
    if (!alphanumericRegex.test(value)) {
      showError('group-rollNumber', 'err-rollNumber', 'Roll Number must contain only letters and numbers.');
      return false;
    }
    clearError('group-rollNumber');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      showError('group-email', 'err-email', 'Email ID should not be empty.');
      return false;
    }
    if (!emailRegex.test(value)) {
      showError('group-email', 'err-email', 'Email must be in a valid format (e.g. user@domain.com).');
      return false;
    }
    clearError('group-email');
    return true;
  }

  function validateMobile() {
    const value = mobileInput.value.trim();
    if (!value) {
      showError('group-mobile', 'err-mobile', 'Mobile Number should not be empty.');
      return false;
    }
    if (!mobileRegex.test(value)) {
      showError('group-mobile', 'err-mobile', 'Mobile Number must contain exactly 10 digits.');
      return false;
    }
    clearError('group-mobile');
    return true;
  }

  function validateDOB() {
    const value = dobInput.value;
    if (!value) {
      showError('group-dob', 'err-dob', 'Date of Birth should not be empty.');
      return false;
    }
    clearError('group-dob');
    return true;
  }

  function validateDepartment() {
    const value = departmentSelect.value;
    if (!value) {
      showError('group-department', 'err-department', 'Department must be selected.');
      return false;
    }
    clearError('group-department');
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      showError('group-password', 'err-password', 'Password should not be empty.');
      updatePasswordStrength('');
      return false;
    }
    if (value.length < 8) {
      showError('group-password', 'err-password', 'Password must be at least 8 characters long.');
      updatePasswordStrength(value);
      return false;
    }
    clearError('group-password');
    updatePasswordStrength(value);
    return true;
  }

  function validateConfirmPassword() {
    const confirmVal = confirmPasswordInput.value;
    const passVal = passwordInput.value;

    if (!confirmVal) {
      showError('group-confirmPassword', 'err-confirmPassword', 'Please confirm your password.');
      return false;
    }
    if (confirmVal !== passVal) {
      showError('group-confirmPassword', 'err-confirmPassword', 'Password and Confirm Password must match.');
      return false;
    }
    clearError('group-confirmPassword');
    return true;
  }

  function validateGender() {
    const selectedGender = Array.from(genderInputs).find(radio => radio.checked);
    if (!selectedGender) {
      showError('group-gender', 'err-gender', 'Gender must be selected.');
      return false;
    }
    clearError('group-gender');
    return true;
  }

  /* -------------------------------------------------------------------------- */
  /* Password Strength Indicator Logic                                          */
  /* -------------------------------------------------------------------------- */

  function updatePasswordStrength(password) {
    strengthBar.className = 'strength-bar';
    if (!password) {
      strengthBar.style.width = '0%';
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      strengthBar.classList.add('weak');
    } else if (score <= 3) {
      strengthBar.classList.add('medium');
    } else {
      strengthBar.classList.add('strong');
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Real-time Field Listeners                                                  */
  /* -------------------------------------------------------------------------- */

  fullNameInput.addEventListener('input', validateFullName);
  fullNameInput.addEventListener('blur', validateFullName);

  rollNumberInput.addEventListener('input', () => {
    rollNumberInput.value = rollNumberInput.value.toUpperCase();
    validateRollNumber();
  });
  rollNumberInput.addEventListener('blur', validateRollNumber);

  emailInput.addEventListener('input', validateEmail);
  emailInput.addEventListener('blur', validateEmail);

  mobileInput.addEventListener('input', () => {
    // Keep only numbers
    mobileInput.value = mobileInput.value.replace(/\D/g, '');
    validateMobile();
  });
  mobileInput.addEventListener('blur', validateMobile);

  dobInput.addEventListener('change', validateDOB);
  dobInput.addEventListener('blur', validateDOB);

  departmentSelect.addEventListener('change', validateDepartment);
  departmentSelect.addEventListener('blur', validateDepartment);

  passwordInput.addEventListener('input', () => {
    validatePassword();
    if (confirmPasswordInput.value) validateConfirmPassword();
  });
  passwordInput.addEventListener('blur', validatePassword);

  confirmPasswordInput.addEventListener('input', validateConfirmPassword);
  confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

  genderInputs.forEach(radio => {
    radio.addEventListener('change', validateGender);
  });

  /* -------------------------------------------------------------------------- */
  /* Password Visibility Toggles                                                */
  /* -------------------------------------------------------------------------- */

  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const inputElem = document.getElementById(targetId);
      const eyeOpen = button.querySelector('.eye-open');
      const eyeClosed = button.querySelector('.eye-closed');

      if (inputElem.type === 'password') {
        inputElem.type = 'text';
        eyeOpen.classList.add('hidden');
        eyeClosed.classList.remove('hidden');
      } else {
        inputElem.type = 'password';
        eyeOpen.classList.remove('hidden');
        eyeClosed.classList.add('hidden');
      }
    });
  });

  /* -------------------------------------------------------------------------- */
  /* Form Submission Handler                                                   */
  /* -------------------------------------------------------------------------- */

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Trigger all validations
    const isFullNameValid = validateFullName();
    const isRollNumberValid = validateRollNumber();
    const isEmailValid = validateEmail();
    const isMobileValid = validateMobile();
    const isDOBValid = validateDOB();
    const isDeptValid = validateDepartment();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isGenderValid = validateGender();

    const isFormValid = isFullNameValid &&
                        isRollNumberValid &&
                        isEmailValid &&
                        isMobileValid &&
                        isDOBValid &&
                        isDeptValid &&
                        isPasswordValid &&
                        isConfirmPasswordValid &&
                        isGenderValid;

    if (isFormValid) {
      // Get Values for Summary Card
      const selectedGender = Array.from(genderInputs).find(radio => radio.checked)?.value;
      const formattedDOB = new Date(dobInput.value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      summaryCard.innerHTML = `
        <div class="summary-row">
          <span class="summary-label">Full Name:</span>
          <span class="summary-value">${escapeHTML(fullNameInput.value.trim())}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Roll Number:</span>
          <span class="summary-value">${escapeHTML(rollNumberInput.value.trim())}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Email ID:</span>
          <span class="summary-value">${escapeHTML(emailInput.value.trim())}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Mobile Number:</span>
          <span class="summary-value">${escapeHTML(mobileInput.value.trim())}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Department:</span>
          <span class="summary-value">${escapeHTML(departmentSelect.value)}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Gender:</span>
          <span class="summary-value">${escapeHTML(selectedGender)}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Date of Birth:</span>
          <span class="summary-value">${formattedDOB}</span>
        </div>
      `;

      successModal.classList.remove('hidden');
    } else {
      // Focus on first invalid field
      const firstErrorGroup = document.querySelector('.form-group.has-error');
      if (firstErrorGroup) {
        const inputToFocus = firstErrorGroup.querySelector('input, select');
        if (inputToFocus) inputToFocus.focus();
      }
    }
  });

  /* -------------------------------------------------------------------------- */
  /* Helper to Prevent XSS in summary output                                    */
  /* -------------------------------------------------------------------------- */

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  /* -------------------------------------------------------------------------- */
  /* Close Modal & Reset Form                                                   */
  /* -------------------------------------------------------------------------- */

  closeModalBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
    form.reset();
    
    // Clear all validation states
    [
      'group-fullName', 'group-rollNumber', 'group-email', 'group-mobile',
      'group-dob', 'group-department', 'group-password', 'group-confirmPassword', 'group-gender'
    ].forEach(resetGroupState);

    updatePasswordStrength('');
  });

  /* -------------------------------------------------------------------------- */
  /* Demo Autofill Data Button                                                  */
  /* -------------------------------------------------------------------------- */

  demoFillBtn.addEventListener('click', () => {
    fullNameInput.value = 'Alex Morgan';
    rollNumberInput.value = '21CS045';
    emailInput.value = 'alex.morgan@university.edu';
    mobileInput.value = '9876543210';
    dobInput.value = '2002-05-15';
    departmentSelect.value = 'Computer Science';
    passwordInput.value = 'SecurePass123!';
    confirmPasswordInput.value = 'SecurePass123!';
    
    const maleRadio = document.querySelector('input[name="gender"][value="Male"]');
    if (maleRadio) maleRadio.checked = true;

    // Trigger validation styling
    validateFullName();
    validateRollNumber();
    validateEmail();
    validateMobile();
    validateDOB();
    validateDepartment();
    validatePassword();
    validateConfirmPassword();
    validateGender();
  });
});
