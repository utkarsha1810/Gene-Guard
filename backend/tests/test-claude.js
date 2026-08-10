import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.error('❌ ANTHROPIC_API_KEY not set in .env file');
  process.exit(1);
}

console.log('Testing Claude with API key from .env...\n');

const client = new Anthropic({ apiKey });

try {
  const response = await client.messages.create({
    model: 'claude-opus-4-1',
    max_tokens: 50,
    messages: [{ role: 'user', content: 'Say OK to confirm you are working' }],
  });
  
  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  console.log('✅ Claude API Authentication: SUCCESS');
  console.log('Response:', text);
  console.log('\nAll 6 agents will now use Claude!\n');
} catch (error) {
  console.error('❌ Claude API Error:', error.message);
  if (error.status) console.error('Status:', error.status);
}
