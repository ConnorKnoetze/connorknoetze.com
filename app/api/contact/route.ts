import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Received POST request');

    const { name, email, message } = await request.json();
    console.log('Request data:', { name, email, message });

    // Basic validation
    if (!name || !email || !message) {
      console.warn('Validation failed:', { name, email, message });
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    console.log('Validation passed');

    // Create the table if it doesn't exist
    console.log('Ensuring contacts table exists');
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Table ensured');

    // Insert the data into the table
    console.log('Inserting data into contacts table');
    await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message});
    `;

    console.log('Data inserted successfully');
    return NextResponse.json({ message: 'Contact message saved successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ error: 'Failed to save contact message.' }, { status: 500 });
  }
}
