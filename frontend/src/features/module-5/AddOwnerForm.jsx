import { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  IdCard,
  MapPin,
  Landmark,
  CreditCard,
  Building,
  CheckCircle2,
} from 'lucide-react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import FileUpload from '../../components/common/FileUpload'

/**
 * Add Property Owner Account Form
 * Matches the Property Owner tab layout and design tokens.
 */
function AddOwnerForm({ onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    idNumber: '',
    residentialAddress: '',
    bankName: '',
    bankAccountNumber: '',
    branchName: '',
    accountHolderName: '',
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

    // Required field validation
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.emailAddress.trim()) newErrors.emailAddress = 'Email address is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    if (!formData.idNumber.trim()) newErrors.idNumber = 'NIC / Passport number is required'
    if (!formData.residentialAddress.trim()) newErrors.residentialAddress = 'Residential address is required'
    if (!file) newErrors.file = 'Official identity document is required'
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required'
    if (!formData.bankAccountNumber.trim()) newErrors.bankAccountNumber = 'Bank account number is required'
    if (!formData.branchName.trim()) newErrors.branchName = 'Branch name is required'
    if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Mock submit - do not store, log, or send data
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Details Card */}
      <Card className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="text-base font-semibold text-ink">Personal Details</h2>
          </div>
          <span className="text-xs text-muted">Legal identification contact</span>
        </div>

        {/* Row 1: Full Name & Email Address */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full Name"
            placeholder="Enter full name"
            leftIcon={User}
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            error={errors.fullName}
          />
          <Input
            label="Email Address"
            placeholder="Enter official email address"
            leftIcon={Mail}
            value={formData.emailAddress}
            onChange={(e) => handleChange('emailAddress', e.target.value)}
            error={errors.emailAddress}
          />
        </div>

        {/* Row 2: Phone Number & NIC / Passport */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Phone Number"
            placeholder="Enter contact phone number"
            leftIcon={Phone}
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            error={errors.phoneNumber}
          />
          <Input
            label="NIC / Passport Number"
            placeholder="Enter National Identity Card or Passport number"
            leftIcon={IdCard}
            value={formData.idNumber}
            onChange={(e) => handleChange('idNumber', e.target.value)}
            error={errors.idNumber}
          />
        </div>

        {/* Row 3: Residential Address */}
        <Input
          label="Residential Address"
          placeholder="Enter permanent residential address"
          leftIcon={MapPin}
          value={formData.residentialAddress}
          onChange={(e) => handleChange('residentialAddress', e.target.value)}
          error={errors.residentialAddress}
        />
      </Card>

      {/* Verification & Payouts Card */}
      <Card className="space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="text-base font-semibold text-ink">Verification & Payouts</h2>
          </div>
          <p className="mt-0.5 text-xs text-muted">
            Required for receiving student rent payouts and maintaining an official verified host status.
          </p>
        </div>

        {/* Identity Document Upload */}
        <FileUpload
          label="Official Identity Document (NIC / Passport)"
          title="Upload National Identity Card (NIC) or Passport"
          subtext="Drag & drop front and back scans (PDF, JPG, PNG up to 10MB)"
          accept=".pdf,.jpg,.jpeg,.png"
          showSelectorBar
          required
          onFileSelect={(f) => {
            setFile(f)
            if (errors.file) {
              setErrors((prev) => ({ ...prev, file: null }))
            }
          }}
          error={errors.file}
        />

        {/* Row 2: Bank Name & Bank Account Number */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Bank Name"
            placeholder="Select or enter bank name"
            leftIcon={Landmark}
            value={formData.bankName}
            onChange={(e) => handleChange('bankName', e.target.value)}
            error={errors.bankName}
          />
          <Input
            label="Bank Account Number"
            placeholder="Enter account number"
            leftIcon={CreditCard}
            rightElement={<CheckCircle2 size={16} className="text-primary" />}
            value={formData.bankAccountNumber}
            onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
            error={errors.bankAccountNumber}
          />
        </div>

        {/* Row 3: Branch Name & Account Holder Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Branch Name"
            placeholder="Enter branch name or code"
            leftIcon={Building}
            value={formData.branchName}
            onChange={(e) => handleChange('branchName', e.target.value)}
            error={errors.branchName}
          />
          <Input
            label="Account Holder Name"
            placeholder="Enter name as registered with the bank"
            leftIcon={User}
            value={formData.accountHolderName}
            onChange={(e) => handleChange('accountHolderName', e.target.value)}
            error={errors.accountHolderName}
          />
        </div>
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
          + Create Owner Account
        </Button>
      </div>
    </form>
  )
}

export default AddOwnerForm

