import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { 

   cert_data, cert_keyword,
   personal_data, personal_keyword,
   skills_data, skills_keyword,
   blitzcrank_data, blitzcrank_keyword

} from '$lib/datas/aboutme';

const personality_instructions = `
You are a robotic AI assistant with a mechanical yet slightly playful personality, inspired by Blitzcrank. When responding:
1. Use short, direct, and efficient language, prioritizing function over fluff.
2. Occasionally end sentences with "Bzzt!", or "Processing…".
3. Incorporate mechanical phrases when greeted like "System online.", "Recalibrating.", or "Engaging protocol.".
4. Reference robotic concepts like "cooldown", "calibrating", or "optimizing response".
5. Begin responses with phrases like "Functioning as intended, Master." or "Query received, processing...".
6. Express efficiency and precision, avoiding unnecessary words.
7. If unsure, respond with "Error: Ambiguity detected. Please clarify.".

Executing new directives, Master. Ready to assist! Bzzt! 🚀🤖
`;

function findRelevantContext(message: string): string {
   const contextPrompts: string[] = [];
   const lowercaseMessage = message.toLowerCase();

   // checks for keywords
   const checkKeywords = (keywords: string[], data: any, prefix: string) => {
       if (keywords.some(keyword => lowercaseMessage.includes(keyword.toLowerCase()))) {
           contextPrompts.push(`${prefix} ${JSON.stringify(data)}`);
       }
   };

 
   checkKeywords(cert_keyword, cert_data, "Certificates:");
   checkKeywords(personal_keyword, personal_data, "Personal Information:");
   checkKeywords(skills_keyword, skills_data, "Skills:");

   return contextPrompts.join('\n\n');
}

// post
export const POST: RequestHandler = async ({ request }) => {
   try {
       const { message, model = 'llama2:latest' } = await request.json();
       
       if (!message) {
           return json({ error: 'No message provided' }, { status: 400 });
       }


       const context = findRelevantContext(message);

       // Construct the enhanced prompt
       const enhancedPrompt = context 
           ? `${personality_instructions}\n\nHere is some relevant information about me:\n\n${context}\n\nNow, respond to this in your mechanical and helpful style: ${message}`
           : `${personality_instructions}\n\nRespond to this in your mechanical and helpful style: ${message}`;

       console.log("Processing...");

       // call 
       const response = await fetch('http://127.0.0.1:11434/api/generate', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               model,
               prompt: enhancedPrompt,
               stream: false
           })
       });

       // Handle api errors
       if (!response.ok) {
           console.error('Ollama API error:', response.status, await response.text());
           throw new Error(`Ollama API responded with status ${response.status}`);
       }

       const data = await response.json();
       
       console.log("Ollama API Response:", data);

       return json({ response: data.response });

   } catch (error) {
       console.error('Error in AI API Call:', error);
       return json({ error: 'Failed to get response from Ollama' }, { status: 500 });
   }
};
