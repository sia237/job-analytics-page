
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
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 555-123-4567",
        location: "New York, USA",
      },
      education: [
        {
          institution: "University of Technology",
          degree: "Master of Computer Science",
          startDate: "2018-09-01",
          endDate: "2022-06-30",
          description: "Specialized in Artificial Intelligence and Machine Learning",
        },
      ],
      experience: [
        {
          company: "Tech Solutions Inc.",
          position: "Software Developer",
          startDate: "2022-07-01",
          endDate: null, // null indicates present
          description: "Developing web applications using React and Node.js. Leading a team of 3 junior developers.",
        },
        {
          company: "Digital Innovations",
          position: "Junior Developer",
          startDate: "2020-05-01",
          endDate: "2022-06-30",
          description: "Worked on front-end development with JavaScript and React",
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "Git", "Docker", "AWS"],
      languages: [
        { language: "English", proficiency: "Native" },
        { language: "Spanish", proficiency: "Intermediate" }
      ],
      projects: [
        {
          title: "E-commerce Platform",
          technologies: "React, Node.js, MongoDB",
          description: "Developed a full-stack e-commerce platform with payment integration"
        },
        {
          title: "Portfolio Website",
          technologies: "HTML, CSS, JavaScript",
          description: "Created a responsive personal portfolio website"
        }
      ],
      summary: "Experienced full-stack developer with 3+ years of experience in web development. Passionate about creating efficient and user-friendly applications.",
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
