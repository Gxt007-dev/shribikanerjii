# Sweet E-commerce Website - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing from successful e-commerce platforms (Shopify, Etsy, Gumroad) with food-specific inspiration from specialty confectionery retailers. This creates an appetizing, trustworthy shopping experience that emphasizes product imagery and smooth purchasing flow.

## Core Design Principles
1. **Visual Appetite Appeal**: Large, beautiful product photography that makes sweets irresistible
2. **Effortless Shopping**: Minimal friction from browsing to checkout
3. **Trust & Delight**: Professional polish with playful sweet-themed touches

## Typography System

**Font Stack**:
- **Primary**: Poppins (Google Fonts) - Clean, friendly, modern for UI
- **Accent**: Playfair Display (Google Fonts) - Elegant for product names and headings

**Hierarchy**:
- Hero Headline: 4xl to 6xl, bold weight
- Section Headings: 3xl to 4xl, semibold
- Product Names: xl to 2xl, medium weight
- Body Text: base to lg, normal weight
- Prices: xl to 2xl, bold weight
- Form Labels: sm, medium weight
- Buttons: base to lg, semibold

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Maintain visual rhythm using these consistent values
- Component padding: 4-8
- Section padding: 16-24 (desktop), 8-12 (mobile)
- Grid gaps: 4-8

**Container Strategy**:
- Maximum content width: max-w-7xl
- Product grids: max-w-screen-2xl
- Text content: max-w-prose
- Checkout flow: max-w-2xl

## Page Structure & Components

### Homepage

**Hero Section** (80vh):
- Full-width background image showing colorful assorted sweets
- Centered content overlay with blurred background on CTA button
- Headline emphasizing brand value ("Premium Handcrafted Sweets")
- Primary CTA button ("Shop Now")
- Trust indicators below hero (e.g., "Free Shipping Over $50" | "100% Natural Ingredients")

**Featured Products Grid**:
- 4-column grid (lg), 2-column (md), 1-column (mobile)
- Product cards with hover elevation effect
- Square product images with subtle border radius
- Product name, price, quick "Add to Cart" button

**Category Showcase**:
- 3-column grid showcasing main categories (Chocolates, Gummies, Gift Boxes)
- Category cards with representative images, category name overlay

**Google AdSense Placement**:
- Horizontal banner after Featured Products section
- Sidebar placement (desktop only) on product listing pages

**Newsletter/Contact Section**:
- 2-column layout: Newsletter signup form (left) + Quick contact info (right)
- Input field with inline submit button

### Product Listing Page

**Filter Sidebar** (desktop: 1/4 width, mobile: collapsible):
- Category checkboxes
- Price range slider
- Sort dropdown

**Product Grid** (desktop: 3/4 width):
- 3-column grid (lg), 2-column (md), 1-column (mobile)
- Consistent card design with product image, name, price, rating stars
- "Add to Cart" button appears on hover (desktop) or always visible (mobile)

### Product Detail Page

**Image Gallery** (50% width desktop):
- Large primary image
- Thumbnail gallery below
- Zoom on hover functionality

**Product Information** (50% width desktop):
- Product name (2xl, Playfair Display)
- Star rating with review count
- Price (3xl, bold)
- Description paragraph
- Quantity selector (- button, number input, + button)
- Primary "Add to Cart" button (full-width on mobile)
- Secondary "Add to Wishlist" text link
- Ingredient list and nutrition facts in accordion

### Shopping Cart

**Cart Drawer** (slides in from right):
- Header: "Your Cart" with close button
- Scrollable items list: thumbnail, name, quantity controls, price, remove icon
- Subtotal section
- "Continue Shopping" secondary button
- "Proceed to Checkout" primary button (full-width)

### Checkout Page

**Multi-step Process** with progress indicator:
1. **Customer Information**: Name, email, phone
2. **Shipping Address**: Standard address form
3. **Payment**: Stripe embedded card element
4. **Order Review**: Summary with edit options

**Order Summary Sidebar** (desktop: sticky 1/3 width):
- Line items with thumbnails
- Subtotal, shipping, tax breakdown
- Total in large bold text

### Contact/Inquiry Form Page

**2-Column Layout**:
- Form (left 60%): Name, email, subject, message textarea, submit button
- Contact details (right 40%): Business hours, email address, phone number

### Order Confirmation Page

- Large success checkmark icon
- Order number prominently displayed
- Order details table
- Expected delivery information
- "Continue Shopping" CTA
- Email confirmation notice

## Component Library

**Buttons**:
- Primary: Rounded corners (rounded-lg), semibold text, generous padding (px-8 py-3)
- Secondary: Outlined variant with transparent background
- Icon buttons: Square with icon centered

**Cards**:
- Subtle shadow (shadow-md)
- Border radius (rounded-xl)
- Hover state: shadow-xl with smooth transition

**Form Inputs**:
- Border radius (rounded-lg)
- Clear focus states with ring
- Error states with red border and helper text
- Consistent height (h-12 for standard inputs)

**Navigation**:
- Sticky header with shop logo (left), category links (center), cart icon with badge + search icon (right)
- Mobile: Hamburger menu with slide-out drawer

**Icons**: Font Awesome (CDN) for e-commerce icons (cart, heart, search, user, etc.)

## Images

**Hero Section**: Full-width appetizing image of colorful assorted sweets (chocolates, gummies, candies) arranged artistically

**Product Images**: High-quality square photos (1:1 ratio) with clean white backgrounds showcasing individual sweet products

**Category Cards**: Lifestyle images showing each category's products in appealing arrangements

**About/Contact Section**: Optional authentic bakery/kitchen workspace imagery for trust-building

## Accessibility & Interactions

- Minimum tap target: 44x44px for all interactive elements
- Keyboard navigation support throughout
- Focus indicators on all interactive elements
- Form validation with clear error messaging
- Loading states for cart updates and checkout
- Smooth transitions (duration-300) for micro-interactions
- Skip navigation link for keyboard users