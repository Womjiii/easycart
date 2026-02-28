import { Product, Category, User, Order } from '../types';

// Mock Categories
export const categories: Category[] = [
  { id: 1, name: 'Electrical Equipment', description: 'Professional electrical equipment and tools', created_at: '' },
  { id: 2, name: 'Power Tools', description: 'High-performance power tools for professionals', created_at: '' },
  { id: 3, name: 'Hand Tools', description: 'Quality hand tools for every job', created_at: '' },
  { id: 4, name: 'Safety Equipment', description: 'Safety gear and protective equipment', created_at: '' },
  { id: 5, name: 'Lighting', description: 'LED lights and lighting solutions', created_at: '' },
  { id: 6, name: 'Cables & Wires', description: 'Electrical cables and wiring supplies', created_at: '' },
];

// Mock Products
export const products: Product[] = [
  // Electrical Equipment
  { id: 1, name: 'Universal Power Strip 6-Outlet', description: '6-outlet power strip with surge protector, 15A 125V', price: 350.00, category: 'Electrical Equipment', stock: 50, created_at: '' },
  { id: 2, name: 'Heavy Duty Extension Cord 50ft', description: '50-foot outdoor extension cord, 12AWG, 15A', price: 450.00, category: 'Electrical Equipment', stock: 30, created_at: '' },
  { id: 3, name: 'Circuit Breaker 20A', description: 'Single pole circuit breaker, 20 Amp', price: 180.00, category: 'Electrical Equipment', stock: 100, created_at: '' },
  { id: 4, name: 'Electrical Junction Box 4x4', description: '4x4 inch metal junction box with cover', price: 85.00, category: 'Electrical Equipment', stock: 200, created_at: '' },
  { id: 5, name: 'Voltage Tester Digital', description: 'Digital voltage tester with LCD display', price: 520.00, category: 'Electrical Equipment', stock: 25, created_at: '' },
  // Power Tools
  { id: 6, name: 'Cordless Drill 20V MAX', description: '20V MAX lithium-ion cordless drill with 2 batteries', price: 2890.00, category: 'Power Tools', stock: 15, created_at: '' },
  { id: 7, name: 'Circular Saw 7-1/4 inch', description: 'Professional 15 Amp circular saw', price: 2450.00, category: 'Power Tools', stock: 10, created_at: '' },
  { id: 8, name: 'Angle Grinder 4-1/2 inch', description: '4-1/2 inch compact angle grinder 11A', price: 1680.00, category: 'Power Tools', stock: 20, created_at: '' },
  { id: 9, name: 'Jigsaw Variable Speed', description: 'Variable speed jigsaw with orbital action', price: 1890.00, category: 'Power Tools', stock: 12, created_at: '' },
  { id: 10, name: 'Impact Driver 18V', description: '18V Li-ion impact driver with brushless motor', price: 3200.00, category: 'Power Tools', stock: 8, created_at: '' },
  // Hand Tools
  { id: 11, name: 'Socket Set 40-Piece', description: '40-piece metric and SAE socket set', price: 1850.00, category: 'Hand Tools', stock: 25, created_at: '' },
  { id: 12, name: 'Screwdriver Set 32-Piece', description: '32-piece precision screwdriver set', price: 650.00, category: 'Hand Tools', stock: 40, created_at: '' },
  { id: 13, name: 'Adjustable Wrench 12 inch', description: '12-inch heavy duty adjustable wrench', price: 380.00, category: 'Hand Tools', stock: 60, created_at: '' },
  { id: 14, name: 'Pliers Set 5-Piece', description: '5-piece professional pliers set', price: 890.00, category: 'Hand Tools', stock: 35, created_at: '' },
  { id: 15, name: 'Tape Measure 25ft', description: '25-foot by 1-inch tape measure with magnetic tip', price: 180.00, category: 'Hand Tools', stock: 80, created_at: '' },
  // Safety Equipment
  { id: 16, name: 'Safety Goggles Clear', description: 'ANSI Z87.1 certified safety goggles', price: 120.00, category: 'Safety Equipment', stock: 150, created_at: '' },
  { id: 17, name: 'Work Gloves Leather', description: 'Premium leather work gloves, reinforced palm', price: 280.00, category: 'Safety Equipment', stock: 100, created_at: '' },
  { id: 18, name: 'Hard Hat White', description: 'OSHA compliant hard hat, 4-point suspension', price: 450.00, category: 'Safety Equipment', stock: 50, created_at: '' },
  { id: 19, name: 'Ear Protection Muffs', description: 'Noise reducing ear muffs, NRR 25dB', price: 380.00, category: 'Safety Equipment', stock: 45, created_at: '' },
  { id: 20, name: 'Dust Mask N95', description: 'N95 particulate respirator mask, 10-pack', price: 250.00, category: 'Safety Equipment', stock: 200, created_at: '' },
  // Lighting
  { id: 21, name: 'LED Bulb 60W Equivalent', description: '60W equivalent LED bulb, daylight 5000K, 4-pack', price: 450.00, category: 'Lighting', stock: 100, created_at: '' },
  { id: 22, name: 'Motion Sensor Light', description: 'LED motion sensor flood light 50W', price: 890.00, category: 'Lighting', stock: 30, created_at: '' },
  { id: 23, name: 'Desk Lamp LED', description: 'Adjustable LED desk lamp with USB port', price: 680.00, category: 'Lighting', stock: 25, created_at: '' },
  { id: 24, name: 'Emergency Light', description: 'LED emergency light with battery backup', price: 520.00, category: 'Lighting', stock: 40, created_at: '' },
  { id: 25, name: 'Light Switch Cover', description: 'Decorative light switch cover, 10-pack', price: 180.00, category: 'Lighting', stock: 120, created_at: '' },
  // Cables & Wires
  { id: 26, name: 'Romex Wire 14/2 250ft', description: '14/2 NM-B Romex wire, 250 foot roll', price: 1250.00, category: 'Cables & Wires', stock: 20, created_at: '' },
  { id: 27, name: 'Extension Cord 16AWG 25ft', description: 'Indoor extension cord 16AWG, 25ft', price: 280.00, category: 'Cables & Wires', stock: 60, created_at: '' },
  { id: 28, name: 'USB Cable Fast Charge', description: 'Fast charging USB cable 6ft, 3-pack', price: 350.00, category: 'Cables & Wires', stock: 150, created_at: '' },
  { id: 29, name: 'Ethernet Cable Cat6 50ft', description: 'Cat6 ethernet cable 50ft, snagless', price: 450.00, category: 'Cables & Wires', stock: 45, created_at: '' },
  { id: 30, name: 'Wire Connector Set', description: 'Wire connector set 120-piece', price: 220.00, category: 'Cables & Wires', stock: 80, created_at: '' },
];

// Mock Users
export const users: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@easycart.com', password: 'admin123', phone: '09123456789', address: '123 Admin Street, Manila, Philippines', role: 'admin', created_at: '' },
  { id: 2, name: 'John Doe', email: 'john@example.com', password: 'customer123', phone: '09987654321', address: '456 Customer Ave, Quezon City, Philippines', role: 'customer', created_at: '' },
];

// Mock Orders
export const orders: Order[] = [
  {
    id: 1,
    user_id: 2,
    total_amount: 4690.00,
    status: 'pending',
    order_date: new Date().toISOString(),
    shipping_address: '456 Customer Ave, Quezon City, Philippines',
    payment_method: 'Cash on Delivery',
    user: users[1]
  },
];

// Helper functions
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Electrical Equipment': '⚡',
    'Power Tools': '🔨',
    'Hand Tools': '🔧',
    'Safety Equipment': '🦺',
    'Lighting': '💡',
    'Cables & Wires': '🔌',
  };
  return icons[category] || '📦';
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category && p.stock > 0);
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.stock > 0 && (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery)
    )
  );
}

export function getFeaturedProducts(count: number = 4): Product[] {
  return products.filter(p => p.stock > 0).slice(0, count);
}
