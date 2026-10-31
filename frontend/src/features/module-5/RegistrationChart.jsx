import { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { TrendingUp, ChevronDown, ArrowUpRight } from 'lucide-react'
import Card from '../../components/common/Card'

/**
 * Custom tooltip using Tailwind design tokens
 */
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-control border border-line bg-white p-3 shadow-card">
        <p className="mb-1 text-xs font-semibold text-ink">{label}</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-muted">Students:</span>
            <span className="font-semibold text-ink">{payload[0]?.value?.toLocaleString()}</span>
          </div>
          {payload[1] && (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-warning" />
              <span className="text-muted">Owners:</span>
              <span className="font-semibold text-ink">{payload[1]?.value?.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

/**
 * Reusable Registration and Growth Area Chart
 * Reads SVG colors from CSS variables to adhere to the design tokens
 */
function RegistrationChart({
  title = 'Monthly User Registrations',
  subtitle = 'New student and property owner sign-ups over the past 6 months',
  data = [],
  fastestSegment = 'Undergraduate Students (Moratuwa Campus)',
  onReportClick,
  className = '',
}) {
  const [selectedRange, setSelectedRange] = useState('Last 6 Months')

  return (
    <Card className={className}>
      {/* Chart Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-semibold text-ink">{title}</h3>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>

        {/* Legend & Period Filter */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="font-medium text-ink">Students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-warning" />
              <span className="font-medium text-ink">Property Owners</span>
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="appearance-none rounded-control border border-line bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-ink shadow-sm transition-colors focus:border-primary focus:outline-none"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last 12 Months">Last 12 Months</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>
      </div>

      {/* Chart Body */}
      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="ownerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-line)"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
              domain={[0, 'dataMax + 100']}
              ticks={[0, 300, 600, 900, 1200]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="students"
              name="Students"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#studentGradient)"
              dot={{ r: 3.5, fill: 'var(--color-primary)', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 5, fill: 'var(--color-primary)' }}
            />
            <Area
              type="monotone"
              dataKey="owners"
              name="Property Owners"
              stroke="var(--color-warning)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#ownerGradient)"
              dot={{ r: 3.5, fill: 'var(--color-warning)', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 5, fill: 'var(--color-warning)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Card Footer: Fastest growth segment */}
      <div className="mt-4 flex flex-col justify-between gap-2 border-t border-line/60 pt-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs text-ink">
          <TrendingUp size={16} className="text-primary shrink-0" />
          <span>
            Fastest growth segment:{' '}
            <strong className="font-semibold text-ink">{fastestSegment}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={onReportClick}
          className="inline-flex items-center gap-1 text-xs font-medium text-ink hover:text-primary transition-colors cursor-pointer self-start sm:self-auto"
        >
          Detailed breakdown report
          <ArrowUpRight size={14} className="text-muted" />
        </button>
      </div>
    </Card>
  )
}

export default RegistrationChart

