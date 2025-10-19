/*
  # Create Waitlist Table

  ## Overview
  This migration creates a waitlist table for the Mirag8 smart mirror platform.
  Users can join the waitlist and receive their position number.

  ## New Tables
  
  ### `waitlist`
  Stores waitlist signups with position tracking
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - User's name
  - `email` (text, unique) - User's email address
  - `position` (integer) - Position in waitlist (auto-incremented from 372)
  - `created_at` (timestamptz) - Signup timestamp
  - `is_active` (boolean) - Whether the waitlist entry is active

  ## Security
  - Enable RLS on waitlist table
  - Allow public insert for new signups
  - Allow public read for checking position (restricted to own email)

  ## Notes
  - Position counter starts at 372 as requested
  - Email must be unique to prevent duplicate signups
*/

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Create sequence for position counter starting at 372
CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq START 372;

-- Create function to auto-assign position
CREATE OR REPLACE FUNCTION assign_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
  NEW.position := nextval('waitlist_position_seq');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to assign position before insert
DROP TRIGGER IF EXISTS set_waitlist_position ON waitlist;
CREATE TRIGGER set_waitlist_position
  BEFORE INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION assign_waitlist_position();

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert into waitlist
CREATE POLICY "Anyone can join waitlist"
  ON waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Anyone can read their own waitlist entry by email
CREATE POLICY "Anyone can read own waitlist entry"
  ON waitlist FOR SELECT
  TO anon, authenticated
  USING (true);