import Modal from './Modal'
import Button from './Button'

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} disabled={loading}>
            {loading ? 'Please wait...' : confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-muted">{message}</p>
    </Modal>
  )
}

export default ConfirmDialog