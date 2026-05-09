import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"
import type { ThemeColor } from "@/types/variant-types"

// ─── Shared types ──────────────────────────────────────────────────────────────

type ChartSize = "sm" | "md" | "lg"

// ─── BarList ───────────────────────────────────────────────────────────────────

export type BarListItem = {
  name: string
  value: number
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  color?: string
}

interface BarListProps extends React.ComponentProps<"div"> {
  data: BarListItem[]
  valueFormatter?: (value: number) => string
  color?: ThemeColor
  sortOrder?: "ascending" | "descending" | "none"
}

function BarList({
  data,
  valueFormatter = (v) => String(v),
  color,
  sortOrder = "descending",
  className,
  ...props
}: BarListProps) {
  const sorted = React.useMemo(() => {
    if (sortOrder === "none") return data
    return [...data].sort((a, b) =>
      sortOrder === "descending" ? b.value - a.value : a.value - b.value
    )
  }, [data, sortOrder])

  const max = Math.max(...sorted.map((d) => d.value), 1)

  return (
    <div
      data-slot="bar-list"
      data-accent-color={color}
      className={cn("ui-BarList", className)}
      {...props}
    >
      {sorted.map((item, i) => {
        const pct = (item.value / max) * 100
        const Label = item.href ? "a" : "div"
        return (
          <div key={i} className="ui-BarListRow">
            <div className="ui-BarListBarWrapper">
              <div
                className="ui-BarListBar"
                style={{
                  width: `${pct}%`,
                  ...(item.color ? { backgroundColor: item.color } : {}),
                }}
              />
              <Label
                className="ui-BarListName"
                {...(item.href ? { href: item.href } : {})}
              >
                {item.icon && <item.icon className="ui-BarListIcon" />}
                {item.name}
              </Label>
            </div>
            <span className="ui-BarListValue">{valueFormatter(item.value)}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── ProgressBar (DataBar) ─────────────────────────────────────────────────────

interface ProgressBarProps extends React.ComponentProps<"div"> {
  value: number
  max?: number
  label?: React.ReactNode
  valueLabel?: React.ReactNode
  color?: ThemeColor
  showAnimation?: boolean
}

function ProgressBar({
  value,
  max = 100,
  label,
  valueLabel,
  color,
  showAnimation = false,
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div
      data-slot="progress-bar"
      data-accent-color={color}
      className={cn("ui-ProgressBar", className)}
      {...props}
    >
      {(label != null || valueLabel != null) && (
        <div className="ui-ProgressBarHeader">
          {label != null && <span className="ui-ProgressBarLabel">{label}</span>}
          {valueLabel != null && (
            <span className="ui-ProgressBarValue">{valueLabel}</span>
          )}
        </div>
      )}
      <div className="ui-ProgressBarTrack">
        <div
          className={cn("ui-ProgressBarFill", showAnimation && "ui-ProgressBarFill--animate")}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

// ─── ProgressCircle ────────────────────────────────────────────────────────────

type ProgressCircleSize = "xs" | "sm" | "md" | "lg" | "xl"

const CIRCLE_SIZE: Record<ProgressCircleSize, number> = {
  xs: 32,
  sm: 48,
  md: 64,
  lg: 96,
  xl: 128,
}
const STROKE_WIDTH: Record<ProgressCircleSize, number> = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 6,
  xl: 8,
}

interface ProgressCircleProps extends React.ComponentProps<"div"> {
  value: number
  max?: number
  size?: ProgressCircleSize
  color?: ThemeColor
  strokeColor?: string
  trackColor?: string
  children?: React.ReactNode
}

function ProgressCircle({
  value,
  max = 100,
  size = "md",
  color,
  strokeColor,
  trackColor,
  children,
  className,
  ...props
}: ProgressCircleProps) {
  const dim = CIRCLE_SIZE[size]
  const sw = STROKE_WIDTH[size]
  const r = (dim - sw) / 2
  const circumference = 2 * Math.PI * r
  const pct = Math.min(1, Math.max(0, value / max))
  const dashOffset = circumference * (1 - pct)

  return (
    <div
      data-slot="progress-circle"
      data-accent-color={color}
      className={cn("ui-ProgressCircle", className)}
      style={{ width: dim, height: dim }}
      {...props}
    >
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        className="ui-ProgressCircleSvg"
        aria-hidden="true"
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          strokeWidth={sw}
          className="ui-ProgressCircleTrack"
          {...(trackColor ? { stroke: trackColor } : {})}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          strokeWidth={sw}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="ui-ProgressCircleFill"
          {...(strokeColor ? { stroke: strokeColor } : {})}
        />
      </svg>
      {children != null && (
        <div className="ui-ProgressCircleLabel">{children}</div>
      )}
    </div>
  )
}

// ─── Tracker ───────────────────────────────────────────────────────────────────

export type TrackerBlockStatus = "ok" | "warning" | "error" | "empty" | "info"

export type TrackerBlock = {
  key?: string
  status?: TrackerBlockStatus
  color?: string
  tooltip?: string
}

interface TrackerProps extends React.ComponentProps<"div"> {
  data: TrackerBlock[]
}

function Tracker({ data, className, ...props }: TrackerProps) {
  return (
    <div
      data-slot="tracker"
      className={cn("ui-Tracker", className)}
      {...props}
    >
      {data.map((block, i) => (
        <div
          key={block.key ?? i}
          data-slot="tracker-block"
          data-status={block.status ?? "empty"}
          className="ui-TrackerBlock"
          title={block.tooltip}
          style={block.color ? { backgroundColor: block.color } : undefined}
        />
      ))}
    </div>
  )
}

// ─── SparkAreaChart ────────────────────────────────────────────────────────────

interface SparkChartProps extends React.ComponentProps<"div"> {
  data: Record<string, unknown>[]
  dataKey: string
  height?: number
  color?: string
  showTooltip?: boolean
  curved?: boolean
}

function SparkAreaChart({
  data,
  dataKey,
  height = 40,
  color,
  showTooltip = false,
  curved = true,
  className,
  ...props
}: SparkChartProps) {
  const stroke = color ?? "var(--accent-9)"

  return (
    <div
      data-slot="spark-chart"
      data-type="area"
      className={cn("ui-SparkChart", className)}
      style={{ height }}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
        <RechartsPrimitive.AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={stroke} stopOpacity={0.3} />
              <stop offset="95%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showTooltip && <RechartsPrimitive.Tooltip />}
          <RechartsPrimitive.Area
            type={curved ? "monotone" : "linear"}
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={1.5}
            fill="url(#sparkFill)"
            dot={false}
            isAnimationActive={false}
          />
        </RechartsPrimitive.AreaChart>
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
}

function SparkLineChart({
  data,
  dataKey,
  height = 40,
  color,
  showTooltip = false,
  curved = true,
  className,
  ...props
}: SparkChartProps) {
  const stroke = color ?? "var(--accent-9)"

  return (
    <div
      data-slot="spark-chart"
      data-type="line"
      className={cn("ui-SparkChart", className)}
      style={{ height }}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
        <RechartsPrimitive.LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          {showTooltip && <RechartsPrimitive.Tooltip />}
          <RechartsPrimitive.Line
            type={curved ? "monotone" : "linear"}
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </RechartsPrimitive.LineChart>
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
}

function SparkBarChart({
  data,
  dataKey,
  height = 40,
  color,
  showTooltip = false,
  className,
  ...props
}: SparkChartProps) {
  const fill = color ?? "var(--accent-9)"

  return (
    <div
      data-slot="spark-chart"
      data-type="bar"
      className={cn("ui-SparkChart", className)}
      style={{ height }}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
        <RechartsPrimitive.BarChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }} barSize={6}>
          {showTooltip && <RechartsPrimitive.Tooltip />}
          <RechartsPrimitive.Bar
            dataKey={dataKey}
            fill={fill}
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
        </RechartsPrimitive.BarChart>
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
}

// ─── DonutChart ────────────────────────────────────────────────────────────────

export type DonutSlice = {
  name: string
  value: number
  color?: string
}

interface DonutChartProps extends React.ComponentProps<"div"> {
  data: DonutSlice[]
  size?: number
  innerRadius?: number
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showTooltip?: boolean
  color?: ThemeColor
}

const DONUT_COLORS = [
  "var(--accent-9)",
  "var(--accent-7)",
  "var(--accent-5)",
  "var(--accent-11)",
  "var(--accent-3)",
]

function DonutChart({
  data,
  size = 200,
  innerRadius,
  valueFormatter = (v) => String(v),
  showLegend = false,
  showTooltip = true,
  color,
  className,
  ...props
}: DonutChartProps) {
  const ir = innerRadius ?? Math.round(size * 0.55)
  const or = Math.round(size * 0.5)

  return (
    <div
      data-slot="donut-chart"
      data-accent-color={color}
      className={cn("ui-DonutChart", className)}
      {...props}
    >
      <RechartsPrimitive.PieChart
        width={size}
        height={size}
        style={{ flexShrink: 0 }}
      >
        {showTooltip && (
          <RechartsPrimitive.Tooltip
            wrapperStyle={{ transition: "none", zIndex: 10 }}
            formatter={(value, name) => [
              valueFormatter(value as number),
              name as string,
            ]}
          />
        )}
        <RechartsPrimitive.Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={ir}
          outerRadius={or}
          dataKey="value"
          strokeWidth={2}
          stroke="var(--color-background, #fff)"
          isAnimationActive={false}
        >
          {data.map((entry, i) => (
            <RechartsPrimitive.Cell
              key={`cell-${i}`}
              fill={entry.color ?? DONUT_COLORS[i % DONUT_COLORS.length]}
            />
          ))}
        </RechartsPrimitive.Pie>
      </RechartsPrimitive.PieChart>

      {showLegend && (
        <div className="ui-DonutLegend">
          {data.map((entry, i) => (
            <div key={i} className="ui-DonutLegendItem">
              <span
                className="ui-DonutLegendDot"
                style={{
                  backgroundColor:
                    entry.color ?? DONUT_COLORS[i % DONUT_COLORS.length],
                }}
              />
              <span className="ui-DonutLegendName">{entry.name}</span>
              <span className="ui-DonutLegendValue">
                {valueFormatter(entry.value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── UnitChart ─────────────────────────────────────────────────────────────────

type UnitChartShape = "square" | "circle"
type UnitChartSize = "xs" | "sm" | "md" | "lg"

const UNIT_SIZE_PX: Record<UnitChartSize, number> = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
}

interface UnitChartProps extends React.ComponentProps<"div"> {
  value: number
  max?: number
  shape?: UnitChartShape
  cols?: number
  size?: UnitChartSize
  color?: ThemeColor
  filledColor?: string
  emptyColor?: string
}

function UnitChart({
  value,
  max = 100,
  shape = "square",
  cols = 10,
  size = "sm",
  color,
  filledColor,
  emptyColor,
  className,
  style,
  ...props
}: UnitChartProps) {
  const filled = Math.min(max, Math.max(0, Math.round(value)))
  const px = UNIT_SIZE_PX[size]

  return (
    <div
      data-slot="unit-chart"
      data-shape={shape}
      data-accent-color={color}
      className={cn("ui-UnitChart", className)}
      style={{
        "--unit-cols": cols,
        "--unit-size": `${px}px`,
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="ui-UnitBlock"
          data-filled={i < filled ? "true" : undefined}
          style={{
            ...(i < filled && filledColor ? { backgroundColor: filledColor } : {}),
            ...(!( i < filled) && emptyColor ? { backgroundColor: emptyColor } : {}),
          }}
        />
      ))}
    </div>
  )
}

export {
  BarList,
  ProgressBar,
  ProgressCircle,
  Tracker,
  SparkAreaChart,
  SparkLineChart,
  SparkBarChart,
  DonutChart,
  UnitChart,
}

export type {
  BarListProps,
  ProgressBarProps,
  ProgressCircleProps,
  ProgressCircleSize,
  TrackerProps,
  SparkChartProps,
  DonutChartProps,
  UnitChartProps,
  UnitChartShape,
  UnitChartSize,
  ChartSize,
}
