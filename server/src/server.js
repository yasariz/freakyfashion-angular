import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import express from 'express';
import Database from 'better-sqlite3';
import multer from 'multer';

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build correct path to products.db
const dbPath = path.join(__dirname, '..', '..', 'client', 'db', 'products.db');

// Ensure the directory exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

// Connect to SQLite database
const db = new Database(dbPath, { verbose: console.log });

const app = express();
const port = 8000;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the correct location
const uploadsDir = path.join(__dirname, '..', '..', 'client', 'public', 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Serve other static files
app.use(express.static(path.join(__dirname, '..', '..', 'client')));

// Create the uploads directory if it doesn't exist
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the folder exists
    fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir); // Use the correct upload path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + ext;
    console.log("Uploaded file name:", filename);  // Debug: log the filename
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to generate slug from title
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/[^\w\-]+/g, '')  // Remove all non-word characters
    .replace(/\-\-+/g, '-');   // Remove duplicate hyphens
}

// Route to handle new product creation
app.post('/api/admin/products/new', upload.single('image'), (req, res) => {
  try {
    const { title, description, sku, price, category } = req.body;
    const image = req.file;

    if (!title || !description || !sku || !price || !category || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const urlSlug = slugify(title) + '-' + slugify(sku);
    const categoryString = Array.isArray(category) ? category.join(',') : category;

    // ✅ Check if slug already exists
    const checkStmt = db.prepare('SELECT COUNT(*) as count FROM products WHERE urlSlug = ?');
    const { count } = checkStmt.get(urlSlug);

    if (count > 0) {
      return res.status(409).json({ message: 'Slug already exists' });
    }

    // ✅ Insert product
    const insertStmt = db.prepare(
      'INSERT INTO products (title, description, sku, price, category, image, urlSlug) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    insertStmt.run(title, description, sku, price, categoryString, image.filename, urlSlug);

    // ✅ Explicitly set Content-Type and return JSON
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json({ message: 'Product added successfully' });

  } catch (err) {
    console.error('❌ Error inserting product:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch products
app.get('/api/products', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products');
    const products = stmt.all(); // Fetch all products with random order and limit to 8

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products); // Send the products as JSON
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Homepage: Get 8 random products
app.get('/api/products/random', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products ORDER BY RANDOM() LIMIT 8');
    const products = stmt.all();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching random products:', error);
    res.status(500).json({ message: 'Error fetching random products' });
  }
});

app.get('/api/products/slug/:slug', (req, res) => {
  const slug = req.params.slug;
  const product = db.prepare('SELECT * FROM products WHERE urlSlug = ?').get(slug);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

app.get('/api/products/random/3', (req, res) => {
  try {
    // Get 3 random products from the database
    const stmt = db.prepare('SELECT * FROM products ORDER BY RANDOM() LIMIT 3');
    const products = stmt.all();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching random products:', error);
    res.status(500).json({ message: 'Error fetching random products' });
  }
});

// Search Query Endpoint 
app.get('/api/products/search', (req, res) => {
  const searchTerm = req.query.q || '';
  const searchPattern = `%${searchTerm}%`;
  
  // SQL query with LIKE
  const stmt = db.prepare(`
    SELECT * FROM products 
    WHERE title LIKE ? 
    OR description LIKE ? 
    OR category LIKE ?
  `);
  
  const products = stmt.all(searchPattern, searchPattern, searchPattern);
  res.json(products);
});


// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
