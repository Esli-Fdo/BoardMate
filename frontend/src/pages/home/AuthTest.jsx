import { Eye } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

function AuthTest() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted">
        Login to your account and continue your journey.
      </p>

      <div className="mt-6 space-y-4">
        <Input label="Email address" type="email" placeholder="you@example.com" />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          rightElement={<Eye size={18} />}
        />
        <Button fullWidth size="lg">Sign In</Button>
      </div>
    </div>
  )
}

export default AuthTest