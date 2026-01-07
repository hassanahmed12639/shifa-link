# SHIFA LINK Design System

## Overview
A comprehensive design system for Pakistan's first real-time emergency hospital bed availability platform. Built with accessibility, clarity, and emergency-first UX in mind.

## Colors

### Primary Colors
- **Emergency Blue** (`#0F4C81` / `hsl(208, 78%, 28%)`)
  - Primary brand color for trust and reliability
  - Used for primary buttons, links, and key UI elements
  - High contrast for accessibility

- **Emergency Red** (`#D32F2F` / `hsl(0, 66%, 50%)`)
  - Accent color for urgent actions
  - Used for emergency CTAs and critical alerts
  - High visibility for emergency situations

### Status Colors
- **Success Green** (`#2E7D32` / `hsl(123, 47%, 33%)`)
  - Available beds, positive states
  - High contrast for clear status indication

- **Warning Amber** (`#ED6C02` / `hsl(25, 98%, 47%)`)
  - Limited availability, caution states
  - Clear visual warning

- **Danger Red** (`#D32F2F` / `hsl(0, 66%, 50%)`)
  - Full capacity, critical states
  - Same as Emergency Red for consistency

### Neutral Colors
- **Background**: Light gray/white (`hsl(0, 0%, 98%)`)
- **Foreground**: Dark text (`hsl(222, 47%, 11%)`)
- **Muted**: Secondary text (`hsl(215, 16%, 47%)`)
- **Borders**: Light gray (`hsl(214, 32%, 91%)`)

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: System font stack

### Type Scale
- **Emergency Text**: `1.5rem` / `24px` - Bold, for critical information
- **Display**: `2.5rem` / `40px` - Hero headings
- **Heading 1**: `2rem` / `32px` - Page titles
- **Heading 2**: `1.5rem` / `24px` - Section titles
- **Heading 3**: `1.25rem` / `20px` - Subsection titles
- **Heading 4**: `1.125rem` / `18px` - Card titles
- **Body Large**: `1.125rem` / `18px` - Important body text
- **Body**: `1rem` / `16px` - Default body text
- **Body Small**: `0.875rem` / `14px` - Secondary text
- **Caption**: `0.75rem` / `12px` - Labels, metadata

### Usage Classes
```tsx
// Use Tailwind classes or utility classes
<h1 className="text-heading-1">Main Title</h1>
<p className="text-body">Regular text</p>
<span className="text-emergency">URGENT</span>
```

## Components

### Buttons

#### Primary (Emergency Blue)
```tsx
<Button variant="default">Primary Action</Button>
```
- Background: Emergency Blue
- Text: White
- Use for: Main CTAs, primary actions

#### Emergency (Red)
```tsx
<Button variant="emergency">Emergency Action</Button>
```
- Background: Emergency Red
- Text: White
- Use for: Critical actions, emergency CTAs

#### Secondary
```tsx
<Button variant="secondary">Secondary Action</Button>
```
- Background: Light gray
- Text: Dark
- Use for: Secondary actions

#### Outline
```tsx
<Button variant="outline">Outline Action</Button>
```
- Border: Emergency Blue
- Background: Transparent
- Use for: Tertiary actions

#### Ghost
```tsx
<Button variant="ghost">Ghost Action</Button>
```
- No background, hover state only
- Use for: Subtle actions

### Status Badges

#### Available
- Color: Success Green
- Icon: CheckCircle2
- Use for: Hospitals with available beds

#### Limited
- Color: Warning Amber
- Icon: AlertCircle
- Use for: Hospitals with limited availability

#### Full
- Color: Danger Red
- Icon: XCircle
- Use for: Hospitals at full capacity

### Cards

Hospital cards use:
- White background
- 2px border
- Rounded corners (`rounded-lg`)
- Shadow on hover
- High contrast text

### Icons

Using **Lucide React** icon library:
- Consistent stroke width (2px)
- Standard sizes: 16px, 20px, 24px
- Accessible with proper ARIA labels

### Skeleton Loaders

Skeleton components for loading states:
- `Skeleton` - Base skeleton component
- `HospitalCardSkeleton` - Hospital card loading state
- `SearchBarSkeleton` - Search bar loading state
- `StatsSkeleton` - Stats dashboard loading state

## Spacing

Using Tailwind's spacing scale:
- `gap-2` (0.5rem) - Tight spacing
- `gap-4` (1rem) - Default spacing
- `gap-6` (1.5rem) - Section spacing
- `gap-8` (2rem) - Large section spacing

## Border Radius

- `rounded-sm` - Small elements
- `rounded-md` - Default (0.5rem)
- `rounded-lg` - Cards, large elements
- `rounded-full` - Pills, badges

## Shadows

- `shadow-sm` - Subtle elevation
- `shadow-md` - Default elevation
- `shadow-lg` - Prominent elevation
- `shadow-xl` - High elevation (emergency buttons)

## Accessibility

### Contrast Ratios
- All text meets WCAG AA standards (4.5:1 minimum)
- Large text meets WCAG AAA (3:1 minimum)
- Interactive elements have clear focus states

### Touch Targets
- Minimum 44x44px for mobile
- Large buttons (h-12, h-14) for easy tapping

### Focus States
- Visible focus rings on all interactive elements
- Keyboard navigation support

## Usage Examples

### Emergency Button
```tsx
<Button variant="emergency" size="lg">
  <AlertTriangle className="h-6 w-6 mr-2" />
  EMERGENCY: Call 1122
</Button>
```

### Status Badge
```tsx
<StatusBadge status="available" />
```

### Hospital Card
```tsx
<Card className="border-2 hover:shadow-lg">
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

## Design Tokens

All design tokens are defined in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - CSS custom properties
- Components use these tokens consistently

## Best Practices

1. **Always use design system colors** - Don't use arbitrary colors
2. **Follow typography scale** - Use predefined sizes
3. **Maintain contrast** - Ensure text is readable
4. **Use semantic colors** - Success for good, danger for bad
5. **Keep it simple** - Emergency-first, minimal text
6. **Test on mobile** - Mobile-first design approach

