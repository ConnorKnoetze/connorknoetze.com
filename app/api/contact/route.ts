import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Create the table if it doesn't exist. This is safe to run on every request.
    // In a larger application, you might run this once during a setup script.
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert the data into the table
    await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message});
    `;

    return NextResponse.json({ message: 'Contact message saved successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ error: 'Failed to save contact message.' }, { status: 500 });
  }
}
