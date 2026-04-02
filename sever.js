const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db');
const app = express();

app.use(express.json());

// --- SIGNUP (signup.php) ---
app.post('/api/signup', async (req, res) => {
    const { name, email, password, role, department } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    try {
        const [exists] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (exists.length > 0) return res.json({ success: false, message: 'Email exists' });

        const hashedPw = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role, department) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPw, role, department || '']
        );

        res.json({ success: true, user_id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- LOGIN (login.php) ---
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ? AND role = ?', [email, role]);
        if (users.length === 0) return res.json({ success: false, message: 'User not found' });

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        
        if (match) {
            res.json({ success: true, user: { id: user.id, name: user.name, role: user.role } });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- GET EVENTS (get_events.php) ---
app.get('/api/events', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT e.*, u.name as organizer_name 
            FROM events e 
            LEFT JOIN users u ON e.created_by = u.id 
            ORDER BY e.date ASC, e.time ASC
        `);
        res.json({ success: true, events: rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- CREATE EVENT (create_event.php) ---
app.post('/api/events/create', async (req, res) => {
    const { name, category, date, time, place, description, requiresRegistration, created_by } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO events (name, category, date, time, place, description, requires_registration, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, category, date, time, place, description || '', requiresRegistration || 1, created_by || null]
        );
        res.json({ success: true, event_id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- REGISTER FOR EVENT (register_event.php) ---
app.post('/api/events/register', async (req, res) => {
    const { event_id, user_id } = req.body;
    try {
        const [check] = await db.execute('SELECT id FROM event_registrations WHERE event_id = ? AND user_id = ?', [event_id, user_id]);
        if (check.length > 0) return res.json({ success: false, message: 'Already registered' });

        await db.execute('INSERT INTO event_registrations (event_id, user_id) VALUES (?, ?)', [event_id, user_id]);
        res.json({ success: true, message: 'Registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
