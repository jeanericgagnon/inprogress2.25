interface ImageContext {
  type: 'logo' | 'icon';
  location: 'header' | 'content' | 'footer';
  purpose?: string;
  brand?: string;
}

export function generateAltText(context: ImageContext): string {
  const { type, location, purpose, brand } = context;
  
  // Base descriptive elements
  const elements = [
    brand || 'The Social Study',
    type === 'logo' ? 'logo' : 'icon',
    purpose ? `for ${purpose}` : '',
    location === 'header' ? 'in website header' : ''
  ];
  
  // Filter out empty strings and join
  return elements
    .filter(Boolean)
    .join(' ')
    .trim();
}