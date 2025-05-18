
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrl } = await req.json();
    
    if (!fileUrl) {
      throw new Error("File URL is required");
    }

    console.log("Parsing resume from URL:", fileUrl);
    
    // This is where you would integrate with a resume parsing API
    // For now, we'll return mock parsed data
    const mockParsedData = {
      personalDetails: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 555-123-4567",
        location: "New York, USA",
      },
      education: [
        {
          institution: "University of Technology",
          degree: "Master of Computer Science",
          date: "2018-2022",
        },
      ],
      experience: [
        {
          company: "Tech Solutions Inc.",
          position: "Software Developer",
          date: "2022-Present",
          description: "Developing web applications using React and Node.js",
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS"],
    };

    // Return the parsed data
    return new Response(JSON.stringify({ 
      success: true, 
      data: mockParsedData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error("Error parsing resume:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
