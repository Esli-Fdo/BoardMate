import { useState, useRef } from 'react'
import { UploadCloud, FileText, X } from 'lucide-react'

/**
 * Generic drag-and-drop file upload zone (UI only).
 *
 * @param {string} label - Optional header label
 * @param {string} hint - Subtitle / instructions text
 * @param {string} title - Main callout title inside dropzone
 * @param {string} subtext - File types and size limits note
 * @param {string} accept - Accepted file formats (e.g. '.pdf,.jpg,.jpeg,.png')
 * @param {boolean} required - Show required indicator
 * @param {boolean} showSelectorBar - Show inner document selector box
 * @param {(file: File | null) => void} onFileSelect - Callback when file is picked
 * @param {string} error - Optional validation error message
 * @param {string} className - Optional container styling
 */
function FileUpload({
  label,
  hint,
  title = 'Drop your NIC / Passport front & back here or browse',
  subtext = 'Supports PDF, JPG, PNG (Max 5MB)',
  accept = '.pdf,.jpg,.jpeg,.png',
  required = false,
  showSelectorBar = false,
  onFileSelect,
  error,
  className = '',
}) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState('')
  const inputRef = useRef(null)

  const handleFiles = (files) => {
    if (files && files[0]) {
      const file = files[0]
      setSelectedFileName(file.name)
      onFileSelect?.(file)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    setSelectedFileName('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    onFileSelect?.(null)
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-ink">{label}</label>
          {required && (
            <span className="text-xs font-medium text-muted">Required</span>
          )}
        </div>
      )}
      {hint && <p className="mb-3 text-xs text-muted">{hint}</p>}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-control border-2 border-dashed p-7 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-primary bg-primary-soft/30'
            : error
            ? 'border-danger/60 bg-danger-soft/10'
            : 'border-line bg-page/40 hover:border-muted hover:bg-page/70'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {/* Upload Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary mb-3">
          <UploadCloud size={24} />
        </div>

        {/* Status: Selected file or default placeholder */}
        {selectedFileName ? (
          <div className="flex items-center gap-2 rounded-control border border-primary/30 bg-white px-3 py-1.5 shadow-sm">
            <FileText size={16} className="text-primary" />
            <span className="text-xs font-semibold text-ink">{selectedFileName}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="ml-2 rounded p-0.5 text-muted hover:bg-warm hover:text-danger"
              title="Remove document"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-medium text-ink">
              {title.includes('browse') ? (
                <>
                  {title.replace('browse', '')}
                  <span className="font-semibold text-primary underline">browse</span>
                </>
              ) : (
                title
              )}
            </p>
            <p className="mt-1 text-[11px] text-muted">{subtext}</p>
          </>
        )}

        {/* Inner Selector Bar (as shown in Owner Verification) */}
        {showSelectorBar && !selectedFileName && (
          <div className="mt-4 flex w-full max-w-md items-center justify-between rounded-control border border-line bg-white px-3.5 py-2 text-xs text-muted shadow-sm">
            <div className="flex items-center gap-2">
              <FileText size={15} className="text-muted" />
              <span>No document selected — Choose file to upload</span>
            </div>
            {required && (
              <span className="rounded bg-warm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                Required
              </span>
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
}

export default FileUpload

