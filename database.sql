    -- EasyCart Database Schema
-- This file creates all the necessary tables for the EasyCart e-commerce application

-- Create database
CREATE DATABASE IF NOT EXISTS easycart;
USE easycart;

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- CART TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- SAMPLE DATA - ADMIN USER
-- =====================================================
-- Password: admin123 (hashed with PHP's password_hash)
INSERT INTO users (name, email, password, phone, address, role) VALUES 
('Admin User', 'admin@easycart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '09123456789', '123 Admin Street, Manila, Philippines', 'admin');

-- =====================================================
-- SAMPLE DATA - CUSTOMER USER
-- =====================================================
-- Password: customer123 (hashed with PHP's password_hash)
INSERT INTO users (name, email, password, phone, address, role) VALUES 
('John Doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '09987654321', '456 Customer Ave, Quezon City, Philippines', 'customer');

-- =====================================================
-- SAMPLE DATA - CATEGORIES
-- =====================================================
INSERT INTO categories (name, description) VALUES
('Electrical Equipment', 'Professional electrical equipment and tools'),
('Power Tools', 'High-performance power tools for professionals'),
('Hand Tools', 'Quality hand tools for every job'),
('Safety Equipment', 'Safety gear and protective equipment'),
('Lighting', 'LED lights and lighting solutions'),
('Cables & Wires', 'Electrical cables and wiring supplies');

-- =====================================================
-- SAMPLE DATA - PRODUCTS (Electrical Equipment Store)
-- =====================================================
INSERT INTO products (name, description, price, category, stock, image) VALUES
('Universal Power Strip 6-Outlet', '6-outlet power strip with surge protector, 15A 125V', 350.00, 'Electrical Equipment', 50, ''),
('Heavy Duty Extension Cord 50ft', '50-foot outdoor extension cord, 12AWG, 15A', 450.00, 'Electrical Equipment', 30, ''),
('Circuit Breaker 20A', 'Single pole circuit breaker, 20 Amp', 180.00, 'Electrical Equipment', 100, ''),
('Electrical Junction Box 4x4', '4x4 inch metal junction box with cover', 85.00, 'Electrical Equipment', 200, ''),
('Voltage Tester Digital', 'Digital voltage tester with LCD display', 520.00, 'Electrical Equipment', 25, ''),

('Cordless Drill 20V MAX', '20V MAX lithium-ion cordless drill with 2 batteries', 2890.00, 'Power Tools', 15, ''),
('Circular Saw 7-1/4 inch', 'Professional 15 Amp circular saw', 2450.00, 'Power Tools', 10, ''),
('Angle Grinder 4-1/2 inch', '4-1/2 inch compact angle grinder 11A', 1680.00, 'Power Tools', 20, ''),
('Jigsaw Variable Speed', 'Variable speed jigsaw with orbital action', 1890.00, 'Power Tools', 12, ''),
('Impact Driver 18V', '18V Li-ion impact driver with brushless motor', 3200.00, 'Power Tools', 8, ''),

('Socket Set 40-Piece', '40-piece metric and SAE socket set', 1850.00, 'Hand Tools', 25, ''),
('Screwdriver Set 32-Piece', '32-piece precision screwdriver set', 650.00, 'Hand Tools', 40, ''),
('Adjustable Wrench 12 inch', '12-inch heavy duty adjustable wrench', 380.00, 'Hand Tools', 60, ''),
('Pliers Set 5-Piece', '5-piece professional pliers set', 890.00, 'Hand Tools', 35, ''),
('Tape Measure 25ft', '25-foot by 1-inch tape measure with magnetic tip', 180.00, 'Hand Tools', 80, ''),

('Safety Goggles Clear', 'ANSI Z87.1 certified safety goggles', 120.00, 'Safety Equipment', 150, ''),
('Work Gloves Leather', 'Premium leather work gloves, reinforced palm', 280.00, 'Safety Equipment', 100, ''),
('Hard Hat White', 'OSHA compliant hard hat, 4-point suspension', 450.00, 'Safety Equipment', 50, ''),
('Ear Protection Muffs', 'Noise reducing ear muffs, NRR 25dB', 380.00, 'Safety Equipment', 45, ''),
('Dust Mask N95', 'N95 particulate respirator mask, 10-pack', 250.00, 'Safety Equipment', 200, ''),

('LED Bulb 60W Equivalent', '60W equivalent LED bulb, daylight 5000K, 4-pack', 450.00, 'Lighting', 100, ''),
('Motion Sensor Light', 'LED motion sensor flood light 50W', 890.00, 'Lighting', 30, ''),
('Desk Lamp LED', 'Adjustable LED desk lamp with USB port', 680.00, 'Lighting', 25, ''),
('Emergency Light', 'LED emergency light with battery backup', 520.00, 'Lighting', 40, ''),
('Light Switch Cover', 'Decorative light switch cover, 10-pack', 180.00, 'Lighting', 120, ''),

('Romex Wire 14/2 250ft', '14/2 NM-B Romex wire, 250 foot roll', 1250.00, 'Cables & Wires', 20, ''),
('Extension Cord 16AWG 25ft', 'Indoor extension cord 16AWG, 25ft', 280.00, 'Cables & Wires', 60, ''),
('USB Cable Fast Charge', 'Fast charging USB cable 6ft, 3-pack', 350.00, 'Cables & Wires', 150, ''),
('Ethernet Cable Cat6 50ft', 'Cat6 ethernet cable 50ft, snagless', 450.00, 'Cables & Wires', 45, ''),
('Wire Connector Set', 'Wire connector set 120-piece', 220.00, 'Cables & Wires', 80, '');

-- =====================================================
-- SAMPLE DATA - SAMPLE ORDER
-- =====================================================
INSERT INTO orders (user_id, total_amount, shipping_address, payment_method, status, order_date) VALUES
(2, 4690.00, '456 Customer Ave, Quezon City, Philippines', 'Cash on Delivery', 'pending', NOW());

-- Insert order items for the sample order
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 6, 1, 2890.00),
(1, 11, 1, 1850.00);

-- Update product stock for the order items
UPDATE products SET stock = stock - 1 WHERE id IN (6, 11);

-- Clear sample cart items for the customer
DELETE FROM cart WHERE user_id = 2;
