import { useState } from 'react'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import FileUpload from '../../components/common/FileUpload'

/**
 * Add Student Account Form
 * Matches the Student tab layout and design tokens.
 */
function AddStudentForm({ onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    institutionalEmail: '',
    phoneNumber: '',
    university: '',
  })
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic required-field validation
    const newErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.institutionalEmail.trim()) {
      newErrors.institutionalEmail = 'Institutional email is required'
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }
    if (!formData.university.trim()) {
      newErrors.university = 'University or campus name is required'
    }
    if (!file) {
      newErrors.file = 'Please upload an NIC or Passport document'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Mock submit - do not store or log entered data
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Student Personal Information Card */}
      <Card className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-ink">Student Personal Information</h2>
          <p className="text-xs text-muted">Please confirm the primary academic and contact details.</p>
        </div>

        {/* Full Name */}
        <Input
          label="Full Name"
          placeholder="Enter student full name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
        />

        {/* Institutional Email */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-ink">Institutional Email</label>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              <ShieldCheck size={13} />
              Verified Identity
            </span>
          </div>
          <Input
            placeholder="Enter institutional or student email address"
            value={formData.institutionalEmail}
            onChange={(e) => handleChange('institutionalEmail', e.target.value)}
            error={errors.institutionalEmail}
            rightElement={<CheckCircle2 size={16} className="text-primary" />}
          />
        </div>

        {/* Phone & University */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Phone Number"
            placeholder="Enter contact phone number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            error={errors.phoneNumber}
          />
          <Input
            label="University / Campus"
            placeholder="Enter university or campus name"
            value={formData.university}
            onChange={(e) => handleChange('university', e.target.value)}
            error={errors.university}
          />
        </div>
      </Card>

      {/* ID Verification Card */}
      <Card className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-ink">ID Verification</h2>
          <p className="text-xs text-muted">
            Upload your National Identity Card (NIC) or Passport for verified student status.
          </p>
        </div>

        <FileUpload
          title="Drop your NIC / Passport front & back here or browse"
          subtext="Supports PDF, JPG, PNG (Max 5MB)"
          accept=".pdf,.jpg,.jpeg,.png"
          onFileSelect={(f) => {
            setFile(f)
            if (errors.file) {
              setErrors((prev) => ({ ...prev, file: null }))
            }
          }}
          error={errors.file}
        />
      </Card>

      {/* Form Action Controls */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="dark"
          size="md"
        >
          + Create Student Account
        </Button>
      </div>
    </form>
  )
}

export default AddStudentForm

