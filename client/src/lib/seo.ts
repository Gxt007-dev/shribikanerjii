export interface SEOMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string;
}

const BASE_URL = "https://shribikanerjii.com";

export function updateSEO(metadata: SEOMetadata) {
  // Update title
  document.title = metadata.title;
  
  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', metadata.description);

  // Update keywords if provided
  if (metadata.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', metadata.keywords);
  }

  // Update OG tags
  const ogTitle = metadata.ogTitle || metadata.title;
  const ogDescription = metadata.ogDescription || metadata.description;
  const ogImage = metadata.ogImage || `${BASE_URL}/og-image.jpg`;

  updateMetaTag('property', 'og:title', ogTitle);
  updateMetaTag('property', 'og:description', ogDescription);
  updateMetaTag('property', 'og:image', ogImage);
  updateMetaTag('property', 'og:url', metadata.canonical || BASE_URL);

  // Update Twitter Card tags
  updateMetaTag('name', 'twitter:title', ogTitle);
  updateMetaTag('name', 'twitter:description', ogDescription);
  updateMetaTag('name', 'twitter:image', ogImage);

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', metadata.canonical || BASE_URL);
}

function updateMetaTag(attribute: string, value: string, content: string) {
  const selector = `meta[${attribute}="${value}"]`;
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// SEO data for each page
export const pageSEO = {
  home: {
    title: "Shri Bikanerji - Authentic Indian Sweets & Mithai Online",
    description: "Order authentic Indian sweets from Shri Bikanerji. Premium gulab jamun, kaju katli, barfi, jalebi, and traditional mithai. Free delivery on orders over ₹500.",
    keywords: "Indian sweets, mithai, gulab jamun, kaju katli, barfi, jalebi, traditional sweets, online sweets",
    canonical: BASE_URL,
  },
  contact: {
    title: "Contact Shri Bikanerji - Get in Touch",
    description: "Have questions about our sweets? Contact Shri Bikanerji directly. We're here to help with your orders and inquiries.",
    keywords: "contact, support, inquiry, orders",
    canonical: `${BASE_URL}/contact`,
  },
  checkout: {
    title: "Checkout - Shri Bikanerji",
    description: "Complete your order at Shri Bikanerji. Secure payment options including UPI, NetBanking, and card payments.",
    keywords: "checkout, payment, order, secure",
    canonical: `${BASE_URL}/checkout`,
  },
  admin: {
    title: "Admin Dashboard - Shri Bikanerji",
    description: "Manage products, orders, and customer inquiries.",
    keywords: "admin, dashboard, management",
  },
};
