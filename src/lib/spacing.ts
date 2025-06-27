/**
 * Spacing and Visual Hierarchy utilities for Niley
 * Ensures consistent spacing, typography, and visual hierarchy across the application
 */

// Consistent spacing scale based on Tailwind's spacing system
export const spacing = {
  // Base spacing units (in px for reference, use Tailwind classes in practice)
  xs: 'space-y-1', // 4px
  sm: 'space-y-2', // 8px
  md: 'space-y-4', // 16px
  lg: 'space-y-6', // 24px
  xl: 'space-y-8', // 32px
  '2xl': 'space-y-12', // 48px
  '3xl': 'space-y-16', // 64px

  // Component-specific spacing
  components: {
    card: {
      padding: 'p-6',
      paddingCompact: 'p-4',
      paddingLarge: 'p-8',
      gap: 'space-y-4'
    },
    section: {
      padding: 'py-8 px-4 md:py-12 md:px-6',
      paddingCompact: 'py-6 px-4',
      paddingLarge: 'py-16 px-4 md:py-20 md:px-6',
      gap: 'space-y-8 md:space-y-12'
    },
    list: {
      gap: 'space-y-3',
      gapCompact: 'space-y-2',
      gapLarge: 'space-y-4'
    },
    grid: {
      gap: 'gap-4 md:gap-6',
      gapCompact: 'gap-3',
      gapLarge: 'gap-6 md:gap-8'
    },
    form: {
      fieldGap: 'space-y-4',
      labelGap: 'space-y-2',
      buttonGap: 'space-x-3'
    }
  },

  // Layout spacing
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    containerCompact: 'max-w-4xl mx-auto px-4 sm:px-6',
    containerWide: 'max-w-full mx-auto px-4 sm:px-6 lg:px-8',
    pageMargin: 'mt-8 mb-16',
    sectionMargin: 'my-12 md:my-16'
  },

  // Interactive element spacing
  interactive: {
    touchTarget: 'min-h-[44px] min-w-[44px]', // Minimum touch target size
    buttonPadding: 'px-4 py-2',
    buttonPaddingSmall: 'px-3 py-1.5',
    buttonPaddingLarge: 'px-6 py-3',
    inputPadding: 'px-3 py-2',
    inputPaddingLarge: 'px-4 py-3'
  }
}

// Typography hierarchy with consistent sizing and spacing
export const typography = {
  heading: {
    h1: 'text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight',
    h2: 'text-2xl md:text-3xl font-bold text-charcoal leading-tight',
    h3: 'text-xl md:text-2xl font-semibold text-charcoal leading-snug',
    h4: 'text-lg md:text-xl font-semibold text-gray-900 leading-snug',
    h5: 'text-base md:text-lg font-medium text-gray-900 leading-normal',
    h6: 'text-sm md:text-base font-medium text-gray-900 leading-normal'
  },
  
  body: {
    large: 'text-lg text-gray-700 leading-relaxed',
    regular: 'text-base text-gray-700 leading-relaxed',
    small: 'text-sm text-gray-600 leading-normal',
    xs: 'text-xs text-gray-500 leading-normal'
  },

  special: {
    lead: 'text-lg md:text-xl text-gray-600 leading-relaxed',
    caption: 'text-sm text-gray-500 leading-normal',
    label: 'text-sm font-medium text-gray-900',
    code: 'text-sm font-mono bg-gray-100 px-1 py-0.5 rounded',
    link: 'text-sage hover:text-sage-dark underline-offset-4 hover:underline transition-colors'
  },

  // Reading-specific typography
  reading: {
    bookTitle: 'text-lg md:text-xl font-semibold text-charcoal leading-snug',
    author: 'text-base text-gray-600',
    childName: 'text-base font-medium text-sage',
    sessionNote: 'text-sm text-gray-600 leading-relaxed italic'
  }
}

// Visual hierarchy utilities
export const hierarchy = {
  // Z-index scale
  zIndex: {
    base: 'z-0',
    raised: 'z-10',
    dropdown: 'z-20',
    sticky: 'z-30',
    overlay: 'z-40',
    modal: 'z-50',
    toast: 'z-60'
  },

  // Shadow scale for depth
  shadow: {
    subtle: 'shadow-sm',
    normal: 'shadow-md',
    raised: 'shadow-lg',
    floating: 'shadow-xl',
    dramatic: 'shadow-2xl'
  },

  // Border styles for separation
  border: {
    subtle: 'border border-gray-100',
    normal: 'border border-gray-200',
    accent: 'border border-sage/20',
    strong: 'border-2 border-gray-300'
  },

  // Background layers
  background: {
    page: 'bg-cream',
    section: 'bg-white',
    subtle: 'bg-gray-50',
    accent: 'bg-sage/5',
    raised: 'bg-white shadow-sm'
  }
}

// Component composition utilities
export const compose = {
  // Card variants with consistent spacing
  card: {
    base: `${hierarchy.background.section} ${hierarchy.border.subtle} ${hierarchy.shadow.subtle} rounded-lg ${spacing.components.card.padding}`,
    elevated: `${hierarchy.background.section} ${hierarchy.shadow.normal} rounded-lg ${spacing.components.card.padding}`,
    featured: `${hierarchy.background.accent} ${hierarchy.border.accent} ${hierarchy.shadow.normal} rounded-lg ${spacing.components.card.padding}`,
    compact: `${hierarchy.background.section} ${hierarchy.border.subtle} rounded-lg ${spacing.components.card.paddingCompact}`
  },

  // Section layouts
  section: {
    base: `${spacing.components.section.padding} ${spacing.components.section.gap}`,
    featured: `${hierarchy.background.accent} ${spacing.components.section.padding} ${spacing.components.section.gap}`,
    compact: `${spacing.components.section.paddingCompact} ${spacing.components.section.gap}`
  },

  // Button variants with proper spacing
  button: {
    primary: `${spacing.interactive.buttonPadding} ${spacing.interactive.touchTarget}`,
    small: `${spacing.interactive.buttonPaddingSmall} ${spacing.interactive.touchTarget}`,
    large: `${spacing.interactive.buttonPaddingLarge} ${spacing.interactive.touchTarget}`
  },

  // Form layouts
  form: {
    field: `${spacing.components.form.fieldGap}`,
    fieldGroup: `${spacing.components.form.labelGap}`,
    actions: `${spacing.components.form.buttonGap} flex flex-col sm:flex-row`
  }
}

// Responsive helpers
export const responsive = {
  // Container queries for different content areas
  container: {
    narrow: 'max-w-2xl',
    normal: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-7xl'
  },

  // Grid patterns
  grid: {
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    books: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    children: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  },

  // Flex patterns
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    column: 'flex flex-col',
    responsive: 'flex flex-col sm:flex-row',
    wrap: 'flex flex-wrap'
  }
}

// Animation and transition utilities
export const motion = {
  transition: {
    fast: 'transition-all duration-150 ease-out',
    normal: 'transition-all duration-200 ease-out',
    slow: 'transition-all duration-300 ease-out'
  },

  hover: {
    lift: 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200',
    glow: 'hover:shadow-sage/20 hover:shadow-lg transition-shadow duration-200',
    scale: 'hover:scale-105 transition-transform duration-200'
  },

  focus: {
    ring: 'focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2',
    simple: 'focus:outline-none focus:ring-2 focus:ring-sage'
  }
}

// Utility function to combine classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Helper to create consistent component styling
export function createComponentStyle(base: string, variants?: Record<string, string>) {
  return {
    base,
    variants: variants || {},
    compose: (variant?: string, additional?: string) => {
      const variantClass = variant && variants?.[variant] ? variants[variant] : ''
      return cn(base, variantClass, additional)
    }
  }
} 