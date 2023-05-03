import { Link } from 'react-router-dom'

export default function TButton(
  { children },
  {
    color = 'indigo',
    to = '',
    circle = false,
    href = '',
    link = false,
    target = '_blank',
  }
) {
  let classes = [
    'flex',
    'whitespace-nowrap',
    'text-sm',
    'border',
    'border-2',
    'border-transparent',
  ]

  if (link) {
    classes = [...classes, 'transition-colors']

    switch (color) {
      case 'indigo':
        classes = [...classes, 'text-indigo-500', 'focus:border-indigo-500']
        break

      case 'red':
        classes = [...classes, 'text-red-500', 'focus:border-red-500']
        break

      default:
        break
    }
  } else {
    classes = [...classes, 'text-white', 'focus:ring-2', 'focus:ring-offset-2']

    switch (color) {
      case 'indigo':
        classes = [
          ...classes,
          'text-indigo-600',
          'hover:bg-indigo-700',
          'focus:ring-indigo-500',
        ]
        break

      case 'red':
        classes = [
          ...classes,
          'text-red-600',
          'hover:bg-red-700',
          'focus:ring-red-500',
        ]
        break

      case 'green':
        classes = [
          ...classes,
          'text-emrald-500',
          'hover:bg-emrald-700',
          'focus:ring-emrald-400',
        ]
        break

      default:
        break
    }
  }

  if (circle) {
    classes = [
      ...classes,
      'h-8',
      'w-8',
      'items-center',
      'justify-center',
      'rounded-full',
      'text-sm',
    ]
  } else {
    classes = [...classes, 'p-0', 'py-2', 'px-4', 'rounded-md']
  }

  return (
    <>
      {href && (
        <a href={href} className={classes.join(' ')} target={target}>
          {children}
        </a>
      )}

      {to && (
        <Link to={to} className={classes.join(' ')} target={target}>
          {children}
        </Link>
      )}

      {!to && !href && (
        <button className={classes.join(' ')}>{children}</button>
      )}
    </>
  )
}
