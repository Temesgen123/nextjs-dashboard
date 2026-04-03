import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount >= 666;
  `;

  return data;
}

// Export as GET handler for Next.js route
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const amount = searchParams.get('amount') || '666';

  try {
    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount >= ${amount};
    `;
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 },
    );
  }
}
