import { Link } from 'react-router-dom'
import Card from './Card'

const iconVariants = {
  primary: 'bg-primary-soft text-primary',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  neutral: 'bg-warm text-muted',
}

const badgeVariants = {
  success: 'bg-primary-soft text-primary',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  neutral: 'bg-warm text-muted',
}

/**
 * Generic KPI StatCard reusable across modules.
 * Supports navigation via `to` prop or custom `onClick`.
 */
function StatCard({
  title,
  value,
  icon: Icon,
  iconVariant = 'primary',
  badgeText,
  badgeIcon: BadgeIcon,
  badgeVariant = 'success',
  footerLeft,
  footerRight,
  footerText,
  footerTextColor = 'text-muted',
  to,
  onClick,
  className = '',
}) {
      const isClickable = Boolean(to || onClick)

      const content = (
      <Card
        className={`flex h-full flex-col justify-between transition-all duration-200 ${isClickable
            ? 'cursor-pointer hover:-translate-y-0.5 hover:border-muted/50 hover:shadow-md'
            : ''
          } ${className}`}
        onClick={onClick}
      >
        <div>
          {/* Top row: Label and Icon */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted">{title}</span>
            {Icon && (
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-control transition-transform duration-200 ${isClickable ? 'group-hover:scale-105' : ''
                  } ${iconVariants[iconVariant]}`}
              >
                <Icon size={20} />
              </div>
            )}
          </div>

          {/* Value and Trend/Status Badge */}
          <div className="mt-3 flex items-baseline justify-between gap-2">
            <span className="text-3xl font-bold tracking-tight text-ink">{value}</span>
            {badgeText && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeVariants[badgeVariant]}`}
              >
                {BadgeIcon && <BadgeIcon size={13} />}
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {/* Footer / Subtitle information */}
        {(footerLeft || footerRight || footerText) && (
          <div className="mt-5 border-t border-line/60 pt-3">
            {footerText ? (
              <p className={`text-xs font-medium ${footerTextColor}`}>{footerText}</p>
            ) : (
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{footerLeft}</span>
                {footerRight && <span>{footerRight}</span>}
              </div>
            )}
          </div>
        )}
      </Card>
      )

      if (to) {
    return (
      <Link to={to} className="group block h-full no-underline focus:outline-none">
        {content}
      </Link>
      )
  }

      return content
}

      export default StatCard
