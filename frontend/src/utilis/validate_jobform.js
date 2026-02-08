export const validateJobForm = (jobData) => {

  const errors = {};

  const { pet_name, job_date, start_time, end_time } = jobData;

  // ---------- TODAY ----------
  const today = new Date();
  today.setHours(0,0,0,0); // normalize

  // ---------- JOB DATE ----------
  const selectedDate = new Date(job_date);

  // ---------- PET NAME ----------
  if (!pet_name || !pet_name.trim()) {
    errors.pet_name = "Pet name cannot be empty";
  }

  // ---------- PAST DATE ----------
  if (selectedDate < today) {
    errors.job_date = "Job date cannot be in the past";
  }

  // ---------- FUTURE LIMIT  ----------
  const futureLimit = new Date();
  futureLimit.setDate(futureLimit.getDate() + 30);

  if (selectedDate > futureLimit) {
    errors.job_date = "Job date must be within 30 days";
  }

  // ---------- TIME VALIDATION ----------
  if (start_time && end_time) {

    const start = new Date(`1970-01-01T${start_time}`);
    const end   = new Date(`1970-01-01T${end_time}`);

    if (end <= start) {
      errors.end_time = "End time must be after start time";
    }
  }

  return errors
}
