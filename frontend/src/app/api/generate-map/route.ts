import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   try {
      const { topic } = await request.json();

      const response = await fetch('http://localhost:8080/generate-mindmap', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(errorText || 'Backend error');
      }

      // Handle both possible response formats
      const responseData = await response.json()
         .catch(async () => {
            // If JSON parsing fails, try to parse as text first
            const text = await response.text();
            return JSON.parse(text);
         });

      return NextResponse.json(responseData);

   } catch (error) {
      console.error('Error generating mindmap:', error);
      return NextResponse.json(
         { error: error instanceof Error ? error.message : 'Failed to generate mindmap' },
         { status: 500 }
      );
   }
}
