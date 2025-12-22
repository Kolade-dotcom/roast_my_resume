import { NextRequest, NextResponse } from 'next/server';

// Mock roast responses for testing
const mockRoasts = [
  `🔥 **OVERALL VERDICT**

Oh boy, where do I even start? Your resume reads like a LinkedIn profile had a baby with a corporate buzzword generator. It's giving "I watched one too many motivational TED Talks" energy. But hey, at least you tried! 💀

🚨 **TOP 3 CRIMES**

1. **"Synergy-driven professional"** - Bro, what does this even MEAN? Are you a person or a PowerPoint slide? This phrase has been dead since 2015. RIP.

2. **"Responsible for..."** appears 8 times - You're not writing a job description, you're selling yourself! Show impact, not just tasks. This isn't a to-do list.

3. **Zero metrics** - "Improved efficiency" Cool story. By how much? 5%? 500%? We're all just guessing here like it's a game show.

🎯 **BUZZWORD BINGO**

You hit the jackpot with these gems:
- "Team player" ✓
- "Self-starter" ✓
- "Detail-oriented" ✓
- "Results-driven" ✓
- "Leveraged" ✓

Congrats! You've unlocked the "Generic Resume" achievement! 🏆

✨ **THE GOOD STUFF**

Real talk though - your experience timeline is solid, and you've clearly worked on some legit projects. The bones are there! You just need to add some meat to these skeleton bullet points. Your education section is clean and your skills are relevant. You're not hopeless, just... buzzword-drunk.

**Bottom line:** You've got potential, but right now your resume is putting recruiters to sleep faster than a documentary about paint drying. Time for a glow-up! 💪`,

  `🔥 **OVERALL VERDICT**

Your resume is like a Netflix show that got cancelled after one season - it started with promise but lost the plot halfway through. You're clearly qualified, but you're hiding it behind a wall of corporate jargon that would make even a consultant cringe. Let's fix this mess! 🎬

🚨 **TOP 3 CRIMES**

1. **"Utilized cutting-edge technologies"** - Which ones?! This is vaguer than my plans for the weekend. Name them or lose them.

2. **Paragraph format** - My dude, recruiters spend 6 seconds on a resume. SIX. And you gave them a novel? Break it up!

3. **"References available upon request"** - It's 2024. We know. This is like saying "I have a phone number." Delete this immediately.

🎯 **BUZZWORD BINGO**

Your greatest hits:
- "Dynamic" ✓
- "Innovative" ✓
- "Passionate" ✓
- "Proactive" ✓
- "Strategic thinker" ✓

These words are so overused, they've filed for workers' comp. 😴

✨ **THE GOOD STUFF**

Okay, I'll give you credit - your job progression shows growth, and you've stuck around at companies long enough to actually accomplish things (unlike job-hoppers who bounce every 6 months). Your technical skills section is actually pretty solid. You've got the goods, you just need better packaging!

**Bottom line:** You're a diamond in the rough, but right now you're more rough than diamond. Polish this bad boy up and you'll be golden! 💎`,

  `🔥 **OVERALL VERDICT**

Imagine if a robot wrote a resume after reading every corporate mission statement ever. That's what we're working with here. You've managed to make yourself sound both overqualified AND boring at the same time - that's actually impressive in a sad way. But don't worry, we can save this! 🤖

🚨 **TOP 3 CRIMES**

1. **"Extensive experience in..."** - Extensive? How extensive? 2 years? 20 years? Be specific or be forgotten.

2. **No action verbs** - Everything is passive. "Was responsible for," "Worked on," "Helped with." You sound like you were just... there. Existing. Vibing.

3. **Skills section is a mess** - You listed "Microsoft Office" next to "Machine Learning." That's like putting "breathing" next to "speaks 5 languages." Prioritize!

🎯 **BUZZWORD BINGO**

The usual suspects:
- "Collaborative" ✓
- "Motivated" ✓
- "Excellent communication skills" ✓
- "Fast-paced environment" ✓
- "Wear many hats" ✓

If I had a dollar for every time I've seen these phrases, I could retire. 💸

✨ **THE GOOD STUFF**

Here's the tea - you've actually done some cool stuff! Your project experience shows you can handle complexity, and your education is solid. You're clearly smart and capable. You just need to let your personality shine through instead of hiding behind corporate speak.

**Bottom line:** Stop trying to sound like everyone else. Be YOU, but like, the professional version. You've got this! 🌟`
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const text = formData.get('text') as string | null;

    let resumeText: string;

    if (file) {
      // For mock mode, just use file name
      resumeText = `Resume from file: ${file.name}\n\nThis is mock data for testing purposes.`;
    } else if (text) {
      resumeText = text;
    } else {
      return NextResponse.json(
        { error: 'No file or text provided' },
        { status: 400 }
      );
    }

    if (resumeText.length < 10) {
      return NextResponse.json(
        { error: 'Resume text is too short' },
        { status: 400 }
      );
    }

    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return a random mock roast
    const roast = mockRoasts[Math.floor(Math.random() * mockRoasts.length)];

    return NextResponse.json({
      roast,
      resumeText,
    });
  } catch (error) {
    console.error('Roast API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate roast' },
      { status: 500 }
    );
  }
}
